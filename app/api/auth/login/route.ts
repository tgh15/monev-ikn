import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        await connectDB();

        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return NextResponse.json({ message: "Invalid password" }, { status: 401 });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        const res = NextResponse.json({ message: "Login successful" });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // 🔥 wajib none kalau lintas domain
            domain: ".thg15.my.id", // 🔥 pakai titik di depan agar berlaku untuk semua subdomain
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return res;
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

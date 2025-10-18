import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { email, username, password } = await req.json();
        await connectDB();

        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json({ message: "Email already registered" }, { status: 400 });
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ email, username, password: hashed });

        return NextResponse.json({ message: "Registration successful" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

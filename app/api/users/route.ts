import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
    try {
        await connectDB();
        const cookieHeader = req.headers.get("cookie");
        const token = cookieHeader?.split("token=")[1]?.split(";")[0];

        if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(decoded.id).select("-password");

        return NextResponse.json({ user });
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}

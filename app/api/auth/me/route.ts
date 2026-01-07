import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyTokenFromCookie } from "@/lib/auth";

export async function GET() {
    try {
        // 1️⃣ Verifikasi token dari cookie
        const token = await verifyTokenFromCookie();

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // 2️⃣ Koneksi database
        await connectDB();

        // 3️⃣ Cari user berdasarkan token.userId
        const user = await User.findById(token.id).select("-__v");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // 4️⃣ Return data user
        return NextResponse.json(
            {
                message: "success",
                user: {
                    id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("GET /api/me error:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}

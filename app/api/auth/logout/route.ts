import { NextResponse } from "next/server";

export async function POST() {
    try {
        const res = NextResponse.json({ message: 'Logout successful' });
        // expire the token cookie
        res.cookies.set("token", '', {
            httpOnly: true,
            secure: true,
            sameSite: "none", // 🔥 wajib none kalau lintas domain
            domain: process.env.BASE_URL, // 🔥 pakai titik di depan agar berlaku untuk semua subdomain
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });
        return res;
    } catch (err) {
        console.log("[auth/login] error:", err);
        return NextResponse.json({ message: String(err) }, { status: 500 });
    }
}
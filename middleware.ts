export const runtime = "nodejs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // Debugging logs
    try {
        console.log("[middleware] incoming path:", pathname);
        console.log("[middleware] token present:", !!token);
        console.log("[middleware] JWT secret present:", !!process.env.JWT_SECRET);
    } catch (e) { }

    const secret = process.env.JWT_SECRET;

    // ✅ Jika ke halaman login dan token valid → redirect ke /admin
    if (pathname === "/login" && token && secret) {
        try {
            jwt.verify(token, secret);
            console.log("[middleware] user already logged in, redirecting to /admin");
            return NextResponse.redirect(new URL("/admin", req.url));
        } catch (err: any) {
            console.log("[middleware] token invalid on /login:", err?.message);
            // token invalid → lanjut ke halaman login, jangan redirect
        }
    }

    // ✅ Izinkan route public tanpa login
    if (
        pathname.startsWith("/api/auth") ||
        pathname === "/login" ||
        pathname === "/register"
    ) {
        return NextResponse.next();
    }

    // ✅ Proteksi semua route API (kecuali /api/auth)
    if (pathname.startsWith("/api")) {
        // For API routes we return 401 JSON instead of redirecting
        if (pathname.startsWith("/api/auth")) {
            // already allowed above, but double-check
            return NextResponse.next();
        }

        if (!token) {
            return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
                headers: { "content-type": "application/json" },
            });
        }

        console.log("[middleware] verifying API token");

        if (!secret) {
            console.log("[middleware] JWT_SECRET missing; rejecting API request");
            return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
                headers: { "content-type": "application/json" },
            });
        }

        try {
            jwt.verify(token, secret);
            return NextResponse.next();
        } catch (err: any) {
            console.log("[middleware] API token verification failed:", err?.message);
            return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
                headers: { "content-type": "application/json" },
            });
        }
    }

    // ✅ Proteksi semua route di bawah /admin
    if (pathname.startsWith("/admin")) {
        if (!token) {
            console.log("[middleware] no token, redirecting to /login");
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (!secret) {
            console.log("[middleware] JWT_SECRET missing, redirecting to /login");
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            jwt.verify(token, secret);
            return NextResponse.next();
        } catch (err: any) {
            console.log(
                "[middleware] token verification failed for path:",
                pathname,
                "->",
                err?.message
            );
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // Default
    return NextResponse.next();
}

// Konfigurasi matcher → semua route /admin & /api/protected akan dicegat
export const config = {
    matcher: ["/admin/:path*", "/api/protected/:path*", "/login"],
};

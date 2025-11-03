import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

interface JWTPayload {
    username: string;
    role?: string;
    iat: number;
    exp: number;
}

/**
 * Verify JWT token from cookies.
 * Throws an error if invalid or missing.
 */
export function verifyAuth(): JWTPayload {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Unauthorized: Missing token");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JWTPayload;
        return decoded;
    } catch (err) {
        throw new Error("Unauthorized: Invalid or expired token");
    }
}

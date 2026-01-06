import { NextResponse } from "next/server";
import { sales } from "./sales";

export async function GET(req: Request) {
    return NextResponse.json({ data: sales });
}

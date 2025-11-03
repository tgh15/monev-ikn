import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";

/**
 * @method GET
 * @description Fetches all budgets.
 */
export async function GET() {
    try {
        await connectDB();
        const budgets = await Budget.find({});
        return NextResponse.json(budgets);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching budgets", error }, { status: 500 });
    }
}

/**
 * @method POST
 * @description Creates a new budget.
 */
export async function POST(req: Request) {
    try {
        const { fiscalYear, name, totalAmount, description } = await req.json();

        if (!fiscalYear || !name || !totalAmount) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDB();
        const newBudget = await Budget.create({
            fiscalYear,
            name,
            totalAmount,
            description,
        });

        return NextResponse.json(newBudget, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating budget", error }, { status: 500 });
    }
}
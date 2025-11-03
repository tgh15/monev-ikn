import { connectDB } from "@/lib/mongodb";
import Expenditure from "@/models/Expenditure";
import { NextResponse } from "next/server";

/**
 * @method PUT
 * @description Updates a Expenditure by its ID.
*/
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const body = await req.json();
        const { id } = await context.params

        await connectDB();
        const updatedExpenditure = await Expenditure.findByIdAndUpdate(id, body, { new: true });

        if (!updatedExpenditure) {
            return NextResponse.json({ message: "Expenditure not found" }, { status: 404 });
        }
        return NextResponse.json(updatedExpenditure);
    } catch (error) {
        return NextResponse.json({ message: "Error updating Expenditure", error }, { status: 500 });
    }
}

/**
 * @method DELETE
 * @description Deletes a Expenditure by its ID.
*/
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params
        await connectDB();
        const deleteExpenditure = await Expenditure.findByIdAndDelete(id);
        if (!deleteExpenditure) {
            return NextResponse.json({ message: "Expenditure not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Expenditure deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting Expenditure", error }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Expenditure from "@/models/Expenditure";

interface Params {
    id: string;
}

/**
 * @method GET
 * @description Fetches a single category by its ID.
 */
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        await connectDB();

        // Ambil data kategori
        const category = await Category.findById(id).lean();
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        // Ambil semua expenditure berdasarkan categoryId
        const expenditures = await Expenditure.find({ categoryId: id }).lean();

        // Hitung total amount berdasarkan status
        const summary = {
            totalAmount_selesai: 0,
            totalAmount_proses_pertanggungjawaban: 0,
            totalAmount_belum_selesai: 0,
            usedAmount: 0, // nanti dihitung di bawah
        };

        for (const exp of expenditures) {
            const amount = exp.amount || 0;
            switch (exp.status) {
                case "selesai":
                    summary.totalAmount_selesai += amount;
                    break;
                case "proses_pertanggungjawaban":
                    summary.totalAmount_proses_pertanggungjawaban += amount;
                    break;
                case "belum_selesai":
                    summary.totalAmount_belum_selesai += amount;
                    break;
            }
        }

        // totalAmount = selesai + proses_pertanggungjawaban
        summary.usedAmount =
            summary.totalAmount_selesai + summary.totalAmount_proses_pertanggungjawaban;

        // Gabungkan ke objek kategori tanpa expenditures list
        const response = {
            ...category,
            summary,
        };

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("Error fetching category:", error);
        return NextResponse.json(
            { message: "Error fetching category", error: error.message },
            { status: 500 }
        );
    }
}

/**
 * @method PUT
 * @description Updates a category by its ID.
*/
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const body = await req.json();
        const { id } = await context.params

        await connectDB();
        const updatedCategory = await Category.findByIdAndUpdate(id, body, { new: true });

        if (!updatedCategory) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json({ message: "Error updating category", error }, { status: 500 });
    }
}

/**
 * @method DELETE
 * @description Deletes a category by its ID.
*/
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params
        await connectDB();
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting category", error }, { status: 500 });
    }
}
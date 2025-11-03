import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Expenditure from "@/models/Expenditure";
import Category from "@/models/Category"; // Diperlukan untuk validasi

/**
 * @method GET
 * @description Mengambil semua pengeluaran, bisa difilter berdasarkan categoryId.
 * @example /api/monev/expenditure?categoryId=...
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId');

        const filter = categoryId ? { categoryId } : {};

        await connectDB();
        const expenditures = await Expenditure.find(filter).populate('categoryId', 'name');

        return NextResponse.json(expenditures);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching expenditures", error }, { status: 500 });
    }
}

/**
 * @method POST
 * @description Membuat pengeluaran baru.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { categoryId, title, amount, expenditureDate } = body;

        if (!categoryId || !title || !amount || !expenditureDate) {
            return NextResponse.json({ message: "Field categoryId, title, amount, dan expenditureDate wajib diisi." }, { status: 400 });
        }

        await connectDB();

        // Validasi apakah kategori yang dituju ada
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return NextResponse.json({ message: "Kategori tidak ditemukan dengan categoryId yang diberikan" }, { status: 404 });
        }

        const newExpenditure = await Expenditure.create(body);

        return NextResponse.json(newExpenditure, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error creating expenditure", error }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Budget from "@/models/Budget"; // Import Budget model for validation
import mongoose from "mongoose";

/**
 * @method GET
 * @description Fetches all categories, optionally filtered by budgetId.
 * @example /api/monev/category?budgetId=...
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const budgetId = searchParams.get('budgetId');
        if (!budgetId) {
            return NextResponse.json({ message: "budgetId is required" }, { status: 400 });
        }

        await connectDB();
        const categories = await Category.aggregate([
            {
                $match: {
                    budgetId: new mongoose.Types.ObjectId(budgetId),
                },
            },
            {
                $lookup: {
                    from: "expenditures",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "expenditures",
                },
            },
            {
                $addFields: {
                    summary: {
                        usedAmount: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$expenditures",
                                            as: "exp",
                                            cond: {
                                                $in: [
                                                    "$$exp.status",
                                                    ["selesai", "proses_pertanggungjawaban"],
                                                ],
                                            },
                                        },
                                    },
                                    as: "exp",
                                    in: "$$exp.amount",
                                },
                            },
                        },
                        totalAmount_selesai: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$expenditures",
                                            as: "exp",
                                            cond: { $eq: ["$$exp.status", "selesai"] },
                                        },
                                    },
                                    as: "exp",
                                    in: "$$exp.amount",
                                },
                            },
                        },
                        totalAmount_proses_pertanggungjawaban: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$expenditures",
                                            as: "exp",
                                            cond: { $eq: ["$$exp.status", "proses_pertanggungjawaban"] },
                                        },
                                    },
                                    as: "exp",
                                    in: "$$exp.amount",
                                },
                            },
                        },
                        totalAmount_belum_selesai: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$expenditures",
                                            as: "exp",
                                            cond: { $eq: ["$$exp.status", "belum_selesai"] },
                                        },
                                    },
                                    as: "exp",
                                    in: "$$exp.amount",
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    expenditures: 0, // optional: sembunyikan data expenditures jika tidak perlu
                },
            },
        ]);

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching categories", error }, { status: 500 });
    }
}

/**
 * @method POST
 * @description Creates a new category.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { budgetId, name, plannedAmount, description } = body;

        // 🔍 Validasi input
        if (!budgetId || !name || !plannedAmount) {
            return NextResponse.json(
                { message: "Missing required fields: budgetId, name, and plannedAmount are required." },
                { status: 400 }
            );
        }

        // 🔗 Koneksi database
        await connectDB();

        // ✅ Cek apakah budgetId valid (hindari error cast)
        const budgetExists = await Budget.findById(budgetId);
        if (!budgetExists) {
            return NextResponse.json(
                { message: "Budget not found with the provided budgetId." },
                { status: 404 }
            );
        }

        // 💾 Buat kategori baru
        const newCategory = await Category.create({
            budgetId,
            name,
            plannedAmount,
            description: description || "",
        });

        return NextResponse.json(
            { message: "Category created successfully", data: newCategory },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating category:", error);

        // 🧠 Tangani error validasi dari Mongoose (misalnya required fields)
        if (error.name === "ValidationError") {
            return NextResponse.json(
                { message: "Validation error", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}

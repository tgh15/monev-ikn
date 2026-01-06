import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


/**
 * @method GET
 * @description Fetches a single budget, its categories, and calculates the used amount and count for each status.
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const budgetId = searchParams.get('budgetId');

        if (!budgetId) {
            return NextResponse.json({ message: "budgetId is required" }, { status: 400 });
        }

        await connectDB();

        const budgetData = await Budget.aggregate([
            {
                // 1️⃣ Ambil budget berdasarkan ID
                $match: { _id: new mongoose.Types.ObjectId(budgetId) },
            },
            {
                // 2️⃣ Join ke categories
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "budgetId",
                    as: "categories",
                },
            },
            {
                // 3️⃣ Ambil semua expenditures dari kategori terkait
                $lookup: {
                    from: "expenditures",
                    let: { categoryIds: "$categories._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$categoryId", "$$categoryIds"] },
                            },
                        },
                    ],
                    as: "expenditures",
                },
            },
            {
                // 4️⃣ Hitung summary: total dan count per status
                $addFields: {
                    summary: {
                        // 💰 Total used (selesai + proses_pertanggungjawaban)
                        usedAmount: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$expenditures",
                                            as: "exp",
                                            cond: {
                                                $in: ["$$exp.status", ["selesai", "proses_pertanggungjawaban"]],
                                            },
                                        },
                                    },
                                    as: "filteredExp",
                                    in: "$$filteredExp.amount",
                                },
                            },
                        },

                        // 🔢 Jumlah dokumen selesai + proses_pertanggungjawaban
                        usedCount: {
                            $size: {
                                $filter: {
                                    input: "$expenditures",
                                    as: "exp",
                                    cond: {
                                        $in: ["$$exp.status", ["selesai", "proses_pertanggungjawaban"]],
                                    },
                                },
                            },
                        },

                        // 💰 + 🔢 Status: selesai
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
                                    as: "filteredExp",
                                    in: "$$filteredExp.amount",
                                },
                            },
                        },
                        count_selesai: {
                            $size: {
                                $filter: {
                                    input: "$expenditures",
                                    as: "exp",
                                    cond: { $eq: ["$$exp.status", "selesai"] },
                                },
                            },
                        },

                        // 💰 + 🔢 Status: proses_pertanggungjawaban
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
                                    as: "filteredExp",
                                    in: "$$filteredExp.amount",
                                },
                            },
                        },
                        count_proses_pertanggungjawaban: {
                            $size: {
                                $filter: {
                                    input: "$expenditures",
                                    as: "exp",
                                    cond: { $eq: ["$$exp.status", "proses_pertanggungjawaban"] },
                                },
                            },
                        },

                        // 💰 + 🔢 Status: belum_selesai
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
                                    as: "filteredExp",
                                    in: "$$filteredExp.amount",
                                },
                            },
                        },
                        count_belum_selesai: {
                            $size: {
                                $filter: {
                                    input: "$expenditures",
                                    as: "exp",
                                    cond: { $eq: ["$$exp.status", "belum_selesai"] },
                                },
                            },
                        },
                    },
                },
            },
            {
                // 5️⃣ Hapus array expenditures & categories (opsional)
                $project: {
                    expenditures: 0,
                    categories: 0,
                },
            },
        ]);

        if (!budgetData || budgetData.length === 0) {
            return NextResponse.json({ message: "Budget not found" }, { status: 404 });
        }

        const budget = budgetData[0];
        return NextResponse.json(budget);
    } catch (error) {
        console.error("Error fetching budget with aggregation:", error);
        return NextResponse.json({ message: "Error fetching budget", error }, { status: 500 });
    }
}

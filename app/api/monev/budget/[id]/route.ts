import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";
import Category from "@/models/Category";
import mongoose from "mongoose";

interface Params {
    id: string;
}

/**
 * @method GET
 * @description Fetches a single budget, its categories, and calculates the used amount for each category from expenditures.
 */
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid budget ID" }, { status: 400 });
        }

        // const budgetData = await Budget.aggregate([
        //     {
        //         // 1️⃣ Ambil budget berdasarkan ID
        //         $match: { _id: new mongoose.Types.ObjectId(id) }
        //     },
        //     {
        //         // 2️⃣ Join ke 'categories'
        //         $lookup: {
        //             from: 'categories',
        //             let: { budget_id: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: { $eq: ['$budgetId', '$$budget_id'] }
        //                     }
        //                 },
        //                 // 3️⃣ Join ke 'expenditures' untuk tiap kategori
        //                 {
        //                     $lookup: {
        //                         from: 'expenditures',
        //                         let: { category_id: '$_id' },
        //                         pipeline: [
        //                             {
        //                                 $match: {
        //                                     $expr: { $eq: ['$categoryId', '$$category_id'] }
        //                                 }
        //                             }
        //                         ],
        //                         as: 'expenditures'
        //                     }
        //                 },
        //                 // 4️⃣ Tambahkan summary field
        //                 {
        //                     $addFields: {
        //                         summary: {
        //                             usedAmount: {
        //                                 $sum: {
        //                                     $map: {
        //                                         input: {
        //                                             $filter: {
        //                                                 input: "$expenditures",
        //                                                 as: "exp",
        //                                                 cond: {
        //                                                     $in: ["$$exp.status", ["selesai", "proses_pertanggungjawaban"]]
        //                                                 }
        //                                             }
        //                                         },
        //                                         as: "filteredExp",
        //                                         in: "$$filteredExp.amount"
        //                                     }
        //                                 }
        //                             },
        //                             totalAmount_selesai: {
        //                                 $sum: {
        //                                     $map: {
        //                                         input: {
        //                                             $filter: {
        //                                                 input: "$expenditures",
        //                                                 as: "exp",
        //                                                 cond: { $eq: ["$$exp.status", "selesai"] }
        //                                             }
        //                                         },
        //                                         as: "filteredExp",
        //                                         in: "$$filteredExp.amount"
        //                                     }
        //                                 }
        //                             },
        //                             totalAmount_proses_pertanggungjawaban: {
        //                                 $sum: {
        //                                     $map: {
        //                                         input: {
        //                                             $filter: {
        //                                                 input: "$expenditures",
        //                                                 as: "exp",
        //                                                 cond: { $eq: ["$$exp.status", "proses_pertanggungjawaban"] }
        //                                             }
        //                                         },
        //                                         as: "filteredExp",
        //                                         in: "$$filteredExp.amount"
        //                                     }
        //                                 }
        //                             },
        //                             totalAmount_belum_selesai: {
        //                                 $sum: {
        //                                     $map: {
        //                                         input: {
        //                                             $filter: {
        //                                                 input: "$expenditures",
        //                                                 as: "exp",
        //                                                 cond: { $eq: ["$$exp.status", "belum_selesai"] }
        //                                             }
        //                                         },
        //                                         as: "filteredExp",
        //                                         in: "$$filteredExp.amount"
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 },
        //                 // 5️⃣ Tambahkan juga field usedAmount langsung di kategori
        //                 {
        //                     $addFields: {
        //                         usedAmount: "$summary.usedAmount"
        //                     }
        //                 }
        //                 // 6️⃣ Optional: sembunyikan expenditures kalau tidak diperlukan
        //                 // {
        //                 //   $project: {
        //                 //     expenditures: 0
        //                 //   }
        //                 // }
        //             ],
        //             as: 'categories'
        //         }
        //     }
        // ]);

        const budgetData = await Budget.aggregate([
            {
                // 1️⃣ Ambil budget berdasarkan ID
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                // 2️⃣ Join ke categories
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "budgetId",
                    as: "categories"
                }
            },
            {
                // 3️⃣ Ambil semua expenditures dari semua kategori
                $lookup: {
                    from: "expenditures",
                    let: { categoryIds: "$categories._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$categoryId", "$$categoryIds"] }
                            }
                        }
                    ],
                    as: "expenditures"
                }
            },
            {
                // 4️⃣ Hitung summary berdasarkan status
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
                                                $in: ["$$exp.status", ["selesai", "proses_pertanggungjawaban"]]
                                            }
                                        }
                                    },
                                    as: "filteredExp",
                                    in: "$$filteredExp.amount"
                                }
                            }
                        },
                        totalAmount_selesai: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$expenditures",
                                            as: "exp",
                                            cond: { $eq: ["$$exp.status", "selesai"] }
                                        }
                                    },
                                    as: "filteredExp",
                                    in: "$$filteredExp.amount"
                                }
                            }
                        },
                        totalAmount_proses_pertanggungjawaban: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$expenditures",
                                            as: "exp",
                                            cond: { $eq: ["$$exp.status", "proses_pertanggungjawaban"] }
                                        }
                                    },
                                    as: "filteredExp",
                                    in: "$$filteredExp.amount"
                                }
                            }
                        },
                        totalAmount_belum_selesai: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$expenditures",
                                            as: "exp",
                                            cond: { $eq: ["$$exp.status", "belum_selesai"] }
                                        }
                                    },
                                    as: "filteredExp",
                                    in: "$$filteredExp.amount"
                                }
                            }
                        }
                    }
                }
            },
            {
                // 5️⃣ Hapus array expenditures (opsional, biar hasil ringkas)
                $project: {
                    expenditures: 0,
                    categories: 0
                }
            }
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

/**
 * @method PUT
 * @description Updates a budget by its ID.
 */
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const body = await req.json();
        body.updatedAt = new Date(); // Manually update the timestamp
        const { id } = await context.params

        await connectDB();
        const updatedBudget = await Budget.findByIdAndUpdate(id, body, { new: true });

        if (!updatedBudget) {
            return NextResponse.json({ message: "Budget not found" }, { status: 404 });
        }
        return NextResponse.json(updatedBudget);
    } catch (error) {
        return NextResponse.json({ message: "Error updating budget", error }, { status: 500 });
    }
}

/**
 * @method DELETE
 * @description Deletes a budget by its ID.
 */
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params
        await connectDB();
        const deletedBudget = await Budget.findByIdAndDelete(id);
        if (!deletedBudget) {
            return NextResponse.json({ message: "Budget not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Budget deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting budget", error }, { status: 500 });
    }
}
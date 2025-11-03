import { Schema, model, models } from "mongoose";

const expenditureSchema = new Schema({
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["selesai", "proses_pertanggungjawaban", "belum_selesai"], default: "pending" },
    expenditureDate: { type: Date, required: true },
    attachments: [
        {
            url: { type: String, required: true },
            fileType: { type: String },
            uploadedAt: { type: Date, default: Date.now },
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Expenditure = models.Expenditure || model("Expenditure", expenditureSchema);
export default Expenditure;

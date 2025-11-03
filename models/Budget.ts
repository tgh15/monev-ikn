import { Schema, model, models } from "mongoose";

const budgetSchema = new Schema({
    fiscalYear: { type: String, required: true },
    name: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

});

const Budget = models.Budget || model("Budget", budgetSchema);
export default Budget;

import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    budgetId: { type: Schema.Types.ObjectId, ref: "Budget", required: true },
    name: { type: String, required: true },
    plannedAmount: { type: Number, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

});

const Category = models.Category || model("Category", categorySchema);
export default Category;

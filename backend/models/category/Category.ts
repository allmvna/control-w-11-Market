import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
    },
    name: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;
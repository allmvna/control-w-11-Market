import mongoose from "mongoose";
import {ProductFields} from "../../types";

const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema<ProductFields>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    image: {
        type: String,
        default: null,
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
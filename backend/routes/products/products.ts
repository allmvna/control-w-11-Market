import express from "express";
import {ProductFields} from "../../types";
import Product from "../../models/product/Product";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../../middleware/auth";
import {imagesUpload} from "../../multer";

const productsRouter = express.Router();

productsRouter.post("/", auth, imagesUpload.single('image'),  async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    try{
        const user = expressReq.user;
        if (!user) {
            res.status(401).send({ error: "User not authenticated" });
            return;
        }

        const { title, description, price, category }: ProductFields = req.body;

        if (!title || !description || !price || !category || !req.file) {
            res.status(400).json({ message: "All fields are required, including image" });
            return;
        }

        const newProduct = new Product({
            user: user._id,
            title,
            description,
            price,
            category: category,
            image: req.file ? '/images' + req.file.filename : null,
        });

        await newProduct.save();
        res.status(201).send(newProduct);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});


productsRouter.get("/", async (req, res, next) => {
    try {
        const { categoryId } = req.query;

        const filter = categoryId ? { category: categoryId } : {};

        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .populate("category", "name")
            .populate("user", "displayName phoneNumber")
            .exec();

        if (products.length === 0) {
            res.status(404).json({ message: "No products found." });
            return;
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});


productsRouter.delete("/:id", auth, async (req, res, next) => {
    const { productId } = req.params;
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        if (product.user.toString() !== user._id.toString()) {
            res.status(403).json({ message: "You are not authorized to delete this product" });
            return;
        }

        await product.deleteOne();

        res.status(200).json({ message: "Product deleted successfully" });
        return;

    } catch (error) {
        next(error);
    }
});

export default productsRouter;

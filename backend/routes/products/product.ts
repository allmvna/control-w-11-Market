import Product from "../../models/product/Product";
import express from "express";

const productRouter = express.Router();

productRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate("category", "name")
            .populate("user", "displayName phoneNumber")
            .exec();

        if (!product) {
            res.status(404).json({ message: "Product not found." });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

export default productRouter;

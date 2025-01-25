import express from "express";
import Category from "../../models/category/Category";

const categoriesRoutes = express.Router();

categoriesRoutes.get("/", async (req, res) => {
    try {
        const categories = await Category.find();

        if (categories.length === 0) {
            res.json({ message: "No categories found" });
            return;
        }

        res.json(categories);
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error" });
    }
});

export default categoriesRoutes;

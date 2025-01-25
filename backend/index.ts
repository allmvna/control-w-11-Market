import express from "express";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import cors from "cors";
import usersRouter from "./routes/users/users";
import productsRouter from "./routes/products/products";
import categoriesRoutes from "./routes/categries/categories";
import path from "path";
import productRouter from "./routes/products/product";

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/fixtures', express.static(path.join(__dirname, 'fixtures')));


app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/product', productRouter);
app.use('/categories', categoriesRoutes);


const run = async () => {
    await  mongoose.connect('mongodb://localhost:27017/market');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));
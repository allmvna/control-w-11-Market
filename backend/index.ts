import express from "express";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import cors from "cors";
import usersRouter from "./routes/users";

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/users', usersRouter);

const run = async () => {
    await  mongoose.connect('mongodb://localhost:27017/app');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));
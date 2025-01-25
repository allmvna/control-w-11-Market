import mongoose from "mongoose";
import config from "./config";
import User from "./models/user/User";
import Category from "./models/category/Category";
import Product from "./models/product/Product";
import {randomUUID} from "crypto";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("products");
        await db.dropCollection("categories");
    } catch (error) {
        console.error(error);
    }

    const user = await User.create(
        {
            username: "Alex",
            password: "123",
            token: randomUUID(),
            displayName: "Alex Johnson",
            phoneNumber: "+1234567890"
        },
        {
            username: "Nika",
            password: "456",
            token: randomUUID(),
            displayName: "Nika Smith",
            phoneNumber: "+0987654321"
        }
    );

    const categories = await Category.create(
        { name: "Computers and Laptops" },
        { name: "Laptops" },
        { name: "Desktops (PCs)" },
        { name: "PC Components" },
        { name: "Monitors" },
        { name: "Computer Accessories" }
    );

    const products = await Product.create(
        {
            user: user[0]._id,
            title: "Gaming Laptop",
            description: "Powerful gaming laptop with high performance",
            price: 1500,
            category: categories[1]._id,
            image: "fixtures/gaming-laptop.webp"
        },
        {
            user: user[1]._id,
            title: "Ultrabook Laptop",
            description: "Lightweight and portable ultrabook for professionals",
            price: 1000,
            category: categories[1]._id,
            image: "fixtures/ultrabook.webp"
        },
        {
            user: user[1]._id,
            title: "Gaming PC",
            description: "High-performance PC for gaming and graphics work",
            price: 1800,
            category: categories[2]._id,
            image: "fixtures/gaming-pc.jpg"
        },
        {
            user: user[1]._id,
            title: "Workstation PC",
            description: "Professional workstation PC for content creation and design",
            price: 2000,
            category: categories[2]._id,
            image: "fixtures/work-pc.jpg"
        },
        {
            user: user[0]._id,
            title: "Intel Core i9 Processor",
            description: "Processor for high performance in gaming and professional tasks",
            price: 500,
            category: categories[3]._id,
            image: "fixtures/core-9.jpg"
        },
        {
            user: user[1]._id,
            title: "NVIDIA RTX 3080 GPU",
            description: "High-performance GPU for gaming and 3D rendering",
            price: 700,
            category: categories[3]._id,
            image: "fixtures/nvidia-4090.jpg"
        },
        {
            user: user[1]._id,
            title: "27' 4K Monitor",
            description: "High-quality monitor for professionals and gamers",
            price: 600,
            category: categories[4]._id,
            image: "fixtures/monitor-27k.jpg"
        },
        {
            user: user[1]._id,
            title: "Curved Ultrawide Monitor",
            description: "34-inch ultrawide curved monitor for immersive experiences",
            price: 700,
            category: categories[4]._id,
            image: "fixtures/ultrawide.jpg"
        },
        {
            user: user[0]._id,
            title: "Mechanical Keyboard",
            description: "Mechanical keyboard with backlighting for gaming and work",
            price: 100,
            category: categories[5]._id,
            image: "fixtures/mechanical-keyboard.jpeg"
        },
        {
            user: user[1]._id,
            title: "Wireless Mouse",
            description: "Ergonomic wireless mouse for long work sessions",
            price: 50,
            category: categories[5]._id,
            image: "fixtures/wireles-mouse.jpg"
        }
    );

    await db.close();
};

run().catch((err) => {
    console.log(err)
})
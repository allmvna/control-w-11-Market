import { createAsyncThunk } from "@reduxjs/toolkit";
import {IProduct} from "./productSlice.ts";
import axiosAPI from "../../axiosAPI.ts";


export const fetchProducts = createAsyncThunk<IProduct[], void>(
    "posts/fetchPosts",
    async () => {
        const response = await axiosAPI.get("/products");
        return response.data;
    },
);

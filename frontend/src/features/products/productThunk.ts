import { createAsyncThunk } from "@reduxjs/toolkit";
import {IProduct} from "./productSlice.ts";
import axiosAPI from "../../axiosAPI.ts";


export const fetchProducts = createAsyncThunk<IProduct[], void>(
    "products/fetchProducts",
    async () => {
        const response = await axiosAPI.get("/products");
        return response.data;
    },
);

export const fetchProductsByCategory = createAsyncThunk<IProduct[], string>(
    "products/fetchByCategory",
    async (categoryId) => {
        const response = await axiosAPI.get(`/products?categoryId=${categoryId}`);
        return response.data;
    }
);
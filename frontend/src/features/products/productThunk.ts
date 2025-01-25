import { createAsyncThunk } from "@reduxjs/toolkit";
import {IProduct} from "./productSlice.ts";
import axiosAPI from "../../axiosAPI.ts";
import {RootState} from "../../app/store.ts";
import {ProductMutation} from "../../types";


export const fetchProducts = createAsyncThunk<IProduct[], void>(
    "products/fetchProducts",
    async () => {
        const response = await axiosAPI.get("/products");
        return response.data;
    },
);

export const getProductDetails = createAsyncThunk<IProduct, string>(
    "products/getProductDetails",
    async (id) => {
        const { data } = await axiosAPI.get<IProduct>(`/product/${id}`);
        return data;
    },
);


export const fetchProductsByCategory = createAsyncThunk<IProduct[], string>(
    "products/fetchByCategory",
    async (categoryId) => {
        const response = await axiosAPI.get(`/products?categoryId=${categoryId}`);
        return response.data;
    }
);

export const addNewProduct = createAsyncThunk<
    void,
    ProductMutation,
    { state: RootState }
>("products/addNewProduct", async (postMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
        console.error("Token not found");
        throw new Error("Token not found");
    }

    const formData = new FormData();
    const keys = Object.keys(postMutation) as (keyof ProductMutation)[];

    keys.forEach((key) => {
        const value = postMutation[key];

        if (value !== null) {
            if (key === 'image' && value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value.toString());
            }
        }
    });

    try {
        await axiosAPI.post("/products", formData, {
            headers: {
                Authorization: token,
            },
        });
    } catch (error) {
        console.error("Error when adding a product:", error);
        throw error;
    }
});

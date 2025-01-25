import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {ICategory} from "./categorySlice.ts";

export const fetchCategories = createAsyncThunk<ICategory[], void>(
    "categories/fetchCategories",
    async () => {
        const response = await axiosAPI.get("/categories");
        return response.data;
    },
);


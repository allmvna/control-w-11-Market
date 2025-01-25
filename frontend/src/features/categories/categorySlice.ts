import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchCategories} from "./categoryThunk.ts";


export interface ICategory {
    _id: string;
    name: string;
}

interface CategoryState {
    categories: ICategory[];
    isLoading: boolean;
    error: boolean;
}

const initialState: CategoryState = {
    categories: [],
    isLoading: false,
    error: false,
};

export const selectCategory = (state: RootState) => state.categories.categories;
export const selectLoadingCategory = (state: RootState) => state.categories.isLoading;
export const selectErrorCategory = (state: RootState) => state.categories.error;

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const categoriesReducer = categorySlice.reducer;

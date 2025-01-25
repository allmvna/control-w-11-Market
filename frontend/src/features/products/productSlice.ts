import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {addNewProduct, fetchProducts, fetchProductsByCategory} from "./productThunk.ts";


export interface IProduct {
    _id: string;
    category: string;
    user: { username: string };
    title: string;
    image: string | null;
    description: string;
    price: number;
}

interface ProductState {
    products: IProduct[];
    isLoading: boolean;
    error: boolean;
}

const initialState: ProductState = {
    products: [],
    isLoading: false,
    error: false,
};

export const selectProduct = (state: RootState) => state.products.products;
export const selectLoading = (state: RootState) => state.products.isLoading;
export const selectError = (state: RootState) => state.products.error;


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addNewProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNewProduct.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const productsReducer = productSlice.reducer;

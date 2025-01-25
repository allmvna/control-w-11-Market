import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import {Product} from "../../../types";
import {addNewProduct} from "../productThunk.ts";
import {fetchCategories} from "../../categories/categoryThunk.ts";
import {selectCategory, selectLoadingCategory} from "../../categories/categorySlice.ts";
import {useNavigate} from "react-router-dom";

const initialState = {
    title: "",
    description: "",
    price: 0,
    image: null as File | null,
    category: "",
};

const ProductForm = () => {
    const [form, setForm] = useState<Product>(initialState);
    const loading = useAppSelector(selectLoadingCategory);
    const categories = useAppSelector(selectCategory);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.price || !form.description  || !form.image || !form.category) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await dispatch(addNewProduct(form));
            setForm(initialState);

            navigate('/');
        } catch (error) {
            console.error('Error when adding a product:', error);
        }
    };


    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] || null,
            }));
        }
    };

    const categoryChangeHandler = (e: SelectChangeEvent<string>) => {
        setForm((prevState) => ({
            ...prevState,
            category: e.target.value,
        }));
    };


    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    mt: 4,
                    textAlign: "center",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    color: "#041f4e",
                }}
            >
                Add New Product
            </Typography>
            <form onSubmit={submitFormHandler}>
                <Grid
                    container
                    direction="column"
                    spacing={3}
                    sx={{
                        maxWidth: 500,
                        margin: "0 auto",
                        mt: 4,
                        padding: "20px",
                        borderRadius: "20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.9)",
                    }}
                >
                    <Grid>
                        <TextField
                            id="title"
                            name="title"
                            label="Product Title"
                            value={form.title}
                            onChange={inputChangeHandler}
                            fullWidth
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            value={form.description}
                            onChange={inputChangeHandler}
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            id="price"
                            name="price"
                            label="Price"
                            value={form.price}
                            onChange={inputChangeHandler}
                            fullWidth
                            type="number"
                        />
                    </Grid>

                    <Grid>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                name="category"
                                value={form.category}
                                label="Category"
                                onChange={categoryChangeHandler}
                                fullWidth
                            >
                                {loading ? (
                                    <MenuItem value="">Loading...</MenuItem>
                                ) : (
                                    categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>
                                            {category.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid>
                        <FileInput
                            name="image"
                            label="Image"
                            onGetFile={fileEventChangeHandler}
                        />
                    </Grid>

                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
                                borderRadius: "20px",
                                textTransform: "uppercase",
                                padding: "12px",
                                "&:hover": {
                                    background: "linear-gradient(90deg, #2563EB, #1E3A8A)",
                                    transform: "scale(1.05)",
                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                                },
                            }}
                            disabled={loading}
                        >
                            Create Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ProductForm;

import {Alert, Card, CardContent, CardMedia, CircularProgress, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import axiosAPI from "../../axiosAPI.ts";
import {fetchProducts, fetchProductsByCategory} from "./productThunk.ts";
import {selectError, selectLoading, selectProduct} from "./productSlice.ts";
import {Link, useParams} from "react-router-dom";


const ProductsPage = React.memo(() => {
    const { categoryId } = useParams<{ categoryId?: string }>();
    const products = useAppSelector(selectProduct);
    const isLoading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByCategory(categoryId));
        } else {
            dispatch(fetchProducts());
        }
    }, [dispatch, categoryId]);

    if (isLoading) {
        return (
            <div
                style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
            >
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 4 }}>
                Error loading products. Please try again later!
            </Alert>
        );
    }

    return (
        <>
            <Typography
                variant="h4"
                sx={{
                    mt: 4,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#041f4e",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
            >
                Products
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {products.map((product) => (
                    <Grid size={4} key={product._id}>
                        <Link
                            to={`/products/${product._id}`}
                            style={{ textDecoration: "none" }}
                        >
                        <Card
                            sx={{
                                width: "100%",
                                height: "300px",
                                borderRadius: "20px",
                                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)",
                                transition: "transform 0.3s, box-shadow 0.3s",
                                "&:hover": {
                                    transform: "scale(1.02)",
                                    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)",
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    p: 2,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    src={`${axiosAPI.defaults.baseURL}/${product.image}`}
                                    title={product.title}
                                    sx={{
                                        borderRadius: "10px",
                                        width: "200px",
                                        height: "200px",
                                        objectFit: "cover",
                                        mb: 2,
                                    }}
                                />
                                <Typography variant="h6" sx={{ textAlign: "center" }}>
                                    {product.title}
                                </Typography>
                                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                                    {product.price}$
                                </Typography>
                            </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
});

export default ProductsPage;

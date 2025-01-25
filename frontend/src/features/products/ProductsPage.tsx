import {Alert, Card, CardContent, CardMedia, CircularProgress, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useEffect} from "react";
import {selectError, selectLoading, selectProduct} from "./productSlice.ts";
import {fetchProducts} from "./productThunk.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import axiosAPI from "../../axiosAPI.ts";


const ProductsPage = () => {
    const products = useAppSelector(selectProduct);
    const isLoading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
            <Grid container spacing={2}  sx={{ mt: 4 }}>
                {products.map((product) => {
                    return (
                        <Grid size={4} key={product._id}>
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
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default ProductsPage;

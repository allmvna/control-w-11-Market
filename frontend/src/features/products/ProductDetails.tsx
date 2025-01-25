import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {selectError, selectLoading, selectProductDetails} from "./productSlice.ts";
import { useEffect } from "react";
import {getProductDetails} from "./productThunk.ts";
import {Alert, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import axiosAPI from "../../axiosAPI.ts";


const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const productDetails = useAppSelector(selectProductDetails);
    const isLoading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));
        }
    }, [id, dispatch]);

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Error when uploading product data
            </Alert>
        );
    }

    if (!productDetails) {
        return (
            <Alert severity="warning">
                No product details have been found
            </Alert>
        );
    }


    return (
        <>
            <Card
                sx={{
                    minWidth: 275,
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
                    marginTop: 5,
                    p: 2,
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 2,
                            fontWeight: "bold",
                            color: "#041f4e",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {productDetails.title}
                    </Typography>
                    <hr />
                    <CardMedia
                        component="img"
                        src={`${axiosAPI.defaults.baseURL}/${productDetails.image}`}
                        title={productDetails.title}
                        sx={{
                            borderRadius: "8px",
                            width: "100px",
                            height: "100px",
                            mt: 2,
                        }}
                    />
                    <Typography variant="body1" mt={2}>
                        {productDetails.description}
                    </Typography>
                    <Typography variant="body1" mt={2}>
                        {productDetails.price}
                    </Typography>
                    <Typography variant="body1" mt={2}>
                        {productDetails.category}
                    </Typography>
                    <Typography variant="body2">
                        {productDetails.user.displayName} ({productDetails.user.phoneNumber})
                    </Typography>
                </CardContent>
            </Card>

        </>
    );
};

export default ProductDetails;
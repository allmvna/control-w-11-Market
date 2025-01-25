import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {selectCategory, selectErrorCategory, selectLoadingCategory} from "./categorySlice.ts";
import {fetchCategories} from "./categoryThunk.ts";
import {NavLink} from "react-router-dom";


const Categories = () => {
    const categories = useAppSelector(selectCategory);
    const isLoading = useAppSelector(selectLoadingCategory);
    const error = useAppSelector(selectErrorCategory);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
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
                Error loading categories. Please try again later!
            </Alert>
        );
    }


    return (
        <>
            <Grid container spacing={2}  sx={{ mt: 4 }}>
                <Card
                    component={NavLink}
                    to="/"
                    sx={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "20px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        justifyContent: "center",
                        "&:hover": {
                            transform: "scale(1.02)",
                        },
                    }}
                >
                    All Categories
                </Card>
                {categories.map((category) => {
                    return (
                        <Grid size={12} key={category._id}>
                            <Grid>
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        p: 2,
                                    }}
                                >
                                    <Card
                                        component={NavLink}
                                        to={`/products/${category._id}`}
                                        sx={{
                                            width: "100%",
                                            height: "50px",
                                            borderRadius: "20px",
                                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                            textDecoration: "none",
                                            "&:hover": {
                                                transform: "scale(1.02)",
                                            },
                                        }}
                                    >
                                        {category.name}
                                    </Card>
                                </CardContent>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default Categories;
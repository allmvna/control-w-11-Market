import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import {Alert, Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductsPage from "./features/products/ProductsPage.tsx";
import Categories from "./features/categories/Categories.tsx";
import ProductForm from "./features/products/components/ProductForm.tsx";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <main>
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid size={3}>
                            <Categories />
                        </Grid>
                        <Grid size={9}>
                            <Routes>
                                <Route path="/" element={<ProductsPage />} />
                                <Route path="products/:categoryId" element={<ProductsPage />} />
                                <Route path="/add_product" element={<ProductForm />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="*" element={<Alert severity="error">Page Not Found</Alert>} />
                            </Routes>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    );
};

export default App;

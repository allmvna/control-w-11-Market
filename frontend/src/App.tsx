import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import Container from "@mui/material/Container";
import {Alert} from "@mui/material";
import ProductsPage from "./features/products/ProductsPage.tsx";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<ProductsPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="*" element={<Alert severity='error'>Not found pages!</Alert>} />
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App;

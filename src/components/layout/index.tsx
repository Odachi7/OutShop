import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { ProductProvider } from "../../context/ProductContext";
import CartProvider from "../../context/CartContext";
import { Toaster } from 'react-hot-toast';
import { SearchProvider } from "../../context/SearchContext";

export function Layout() {
    return(
        <ProductProvider>
            <CartProvider>
                <SearchProvider>
                    <Toaster/>
                    <Header />
                    <Outlet />
                </SearchProvider>
            </CartProvider>
        </ProductProvider>
    )
}
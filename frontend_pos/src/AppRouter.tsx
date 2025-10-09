import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeView from "./views/HomeView";
import StoreView from "./views/StoreView";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminProductosView from "./views/admin/products/AdminProductosView";
import AdminSalesView from "./views/admin/sales/AdminSalesView";
import CreateProductView from "./views/admin/products/CreateProductView";

const AppRouter = () => {
    if (window.location.pathname === "/") {
        window.location.replace("/1")
    }
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route path="/" index={true} element={<HomeView/>}></Route>
                        <Route path="/:idCategory" element={<StoreView/>}></Route>
                    </Route>

                    <Route element={<AdminLayout/>}>
                        <Route path="/admin/products" element={<AdminProductosView/>}></Route>
                        <Route path="/admin/products/create" element={<CreateProductView/>}></Route>
                        <Route path="/admin/sales" element={<AdminSalesView/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;
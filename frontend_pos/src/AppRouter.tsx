import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeView from "./views/HomeView";
import StoreView from "./views/StoreView";
import AppLayout from "./layouts/AppLayout";

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
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;
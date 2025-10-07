import {Outlet} from "react-router-dom";
import AdminNav from "../components/AdminNav";

const AdminLayout = () => {
    return (
        <>
            <AdminNav/>
            <div className="lg:min-h-screen container mx-auto mt-10 px-10 lg:px-0">
                <div className="bg-white shadow w-full  mx-auto p-10 my-10 lg:w-3/5" >
                    <Outlet/>
                </div>
            </div>
        </>
    );
}
export default AdminLayout;
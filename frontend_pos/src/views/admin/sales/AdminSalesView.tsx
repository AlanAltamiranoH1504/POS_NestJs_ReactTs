import SalesFilter from "../../../components/admin/sales/SalesFilter";

const AdminSalesView = () => {
    return (
        <>
            <h2 className="text-2xl my-10">Ventas</h2>
            <p className="text-lg">En esta seccion podras ver las ventas, utiliza el calendario para filtrar por fecha</p>
            <SalesFilter/>
        </>
    );
}
export default AdminSalesView;
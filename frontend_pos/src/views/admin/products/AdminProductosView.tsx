import {useQuery} from "@tanstack/react-query";
import {findAllCategoriasGET} from "../../../services/CategoriaService";

const AdminProductosView = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ["findAllProducts"],
        queryFn: () => findAllCategoriasGET(),
        retry: false,
        refetchOnWindowFocus: false
    });

    return (
        <>
            <h2 className="text-2xl my-10">Productos</h2>
            <p className="text-lg">En esta seccion podras ver los productos y administrarlos</p>
        </>
    );
}
export default AdminProductosView;
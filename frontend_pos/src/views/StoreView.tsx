import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {findCategoriaByIdPOST} from "../services/CategoriaService";
import ProductCard from "../components/products/ProductCard";
import type {ProductoDB} from "../types";

const StoreView = () => {
    const params = useParams();
    const id = params.idCategory!;
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findCategoriaById"],
        queryFn: () => findCategoriaByIdPOST(+id),
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (data) return (
        <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {data.productos.map((producto: ProductoDB) => (
                    <ProductCard key={producto.id} producto={producto}></ProductCard>
                ))}
            </div>
        </>
    );
}
export default StoreView;
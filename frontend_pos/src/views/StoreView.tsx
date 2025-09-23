import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {findCategoriaByIdPOST} from "../services/CategoriaService";

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
            Store View
        </>
    );
}
export default StoreView;
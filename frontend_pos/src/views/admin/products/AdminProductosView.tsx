import {useQuery} from "@tanstack/react-query";
import {findAllProductsGET} from "../../../services/ProductosService";
import ProductosTable from "../../../components/admin/products/ProductosTable";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {ProductosFindAll} from "../../../types";
import Paginacion from "../../../components/admin/products/Paginacion";

const AdminProductosView = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    //Validacion de serachParams
    const validationSearchParam = (value) => {
        const number = Number(value);
        return Number.isInteger(number) && number > 0;
    }

    //Lectura o asignacion default
    const categoria_id = Number(searchParams.get("categoria_id")) || 1;
    const page = Number(searchParams.get("page")) || 1;
    const take = Number(searchParams.get("take")) || 10;

    //Establecimiento de parametro si no existen
    useEffect(() => {
        const defaults = {};
        if (!validationSearchParam(searchParams.get("categoria_id"))) {
            defaults.categoria_id = 1;
        }
        if (!validationSearchParam(searchParams.get("page"))) {
            defaults.page = 1;
        }
        if (!validationSearchParam(searchParams.get("take"))) {
            defaults.take = 10;
        }

        // Si el objeto tiene key seteanmos el nuevo hook
        if (Object.keys(defaults).length > 0) {
            setSearchParams({...Object.fromEntries(searchParams), ...defaults});
        }
    }, [searchParams, setSearchParams]);

    const dataPagination: ProductosFindAll = {
        categoria_id,
        page,
        take
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findAllProducts", categoria_id, page, take],
        queryFn: () => findAllProductsGET(dataPagination),
        retry: false,
        refetchOnWindowFocus: false
    });

    const total_pages = data ? Math.ceil(data.total / take) : 0;
    useEffect(() => {
        if (!data) return;

        const totalPages = Math.ceil(data.total / take);
        const searchPage = Number(searchParams.get("page")) || 1;

        if (searchPage > totalPages) {
            setSearchParams({ ...Object.fromEntries(searchParams), page: totalPages });
        }
    }, [data, searchParams, setSearchParams, take]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Ocurrio un error en el servidor. {error}</div>;
    }

    if (data) return (
        <>
            <h2 className="text-2xl my-10">Productos</h2>
            <p className="text-lg pb-5">En esta seccion podras ver los productos y administrarlos</p>

            <div className="flex justify-around">
                <Link
                    className="rounded bg-green-600 font-bold py-2 px-5 text-white hover:bg-green-700 transition-colors duration-500 my-5"
                    to="/admin/products/create">Crear Producto</Link>

                <Link
                    className="rounded bg-indigo-600 font-bold py-2 px-5 text-white hover:bg-indigo-700 transition-colors duration-500 my-5"
                    to="/admin/categories/create">Crear Categoria</Link>
            </div>
            <ProductosTable
                productos={data}
            />
            <Paginacion
                actualPage={page}
                total={data.total}
                take={take}
                categoria_id={categoria_id}
            />
        </>
    );
}
export default AdminProductosView;
import Logo from "./Logo";
import {useQuery} from "@tanstack/react-query";
import {findAllCategoriasGET} from "../services/CategoriaService";
import {Link} from "react-router-dom";

const MainNav = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findAllCategorias"],
        queryFn: () => findAllCategoriasGET(),
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error! {error.message}</div>;
    }

    if (data) return (
        <>
            <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
                <div className="flex justify-center">
                    <Logo/>
                </div>

                <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
                    {data.map((category) => (
                        <Link key={category.id}
                              to={`/${category.id}`}
                              className={"text-white hover:text-green-600 font-bold p-2"}
                        >{category.nombre}</Link>
                    ))}
                </nav>
            </header>
        </>
    );
}
export default MainNav;
import {Link} from "react-router-dom";

type PaginacionProps = {
    actualPage: number;
    total: number;
    take: number;
    categoria_id: number;
}
const Paginacion = ({actualPage, total, take, categoria_id}: PaginacionProps) => {
    const total_pages = Math.ceil(total / take);
    const pages = Array.from({length: total_pages}, (_, i) => i + 1);
    return (
        <>
            <nav className="flex justify-center my-10">

                <Link
                    to={`/admin/products?categoria_id=${categoria_id}&page=${actualPage - 1}&take=${take}`}
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
                    &laquo;
                </Link>
                {pages.map((page) => {
                    return (
                        <Link
                            key={page}
                            className={`${actualPage === page && "font-black"}  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                            to={`/admin/products?categoria_id=${categoria_id}&page=${page}&take=${take}`}
                        >{page}</Link>
                    )
                })}

                <Link
                    to={`/admin/products?categoria_id=${categoria_id}&page=${actualPage + 1}&take=${take}`}
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
                    &raquo;
                </Link>
            </nav>
        </>
    );
}
export default Paginacion;
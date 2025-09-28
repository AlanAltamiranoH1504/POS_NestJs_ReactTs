import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppRouter from "./AppRouter";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryCliente = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryCliente}>
            <AppRouter/>
            <ReactQueryDevtools/>
            <ToastContainer/>
        </QueryClientProvider>
    </StrictMode>,
)

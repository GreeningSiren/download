import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/js/bootstrap.js"
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SupportedServices from "./components/Supported.tsx";
import ErrorElement from "./components/ErrorElement.tsx";

const router = createBrowserRouter([
    {
        path: '/download/',
        element: <App />,
        errorElement: <ErrorElement />,
    },
    {
        path: '/download/supported/',
        element: <SupportedServices/>
    }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)


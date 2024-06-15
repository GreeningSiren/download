import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/js/bootstrap.js"
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SupportedServices from "./components/Supported.tsx";
import ErrorElement from "./components/ErrorElement.tsx";
import APIStatus from "./components/APIStatus.tsx";

const router = createBrowserRouter([
    {
        path:'/',
        element: <ErrorElement/>,
        errorElement: <ErrorElement/>
    },
    {
        path: '/download/',
        element: <App />,
    },
    {
        path: '/download/supported/',
        element: <SupportedServices/>
    },
    {
        path: '/download/serverStatus/',
        element: <APIStatus />
    }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)


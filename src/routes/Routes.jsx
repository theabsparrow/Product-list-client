import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

import AddProduct from "../pages/AddProduct";
import Home from "../pages/Home";
import MyProducts from "../pages/MyProducts";
import MyProfile from "../pages/MyProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/my-products',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/profile',
                element: <MyProfile></MyProfile>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
])
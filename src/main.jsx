import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './componets/Shop/Shop';
import Home from './componets/Layout/Home';
import Order from './componets/Orders/Order';
import Inventory from './componets/Inventory/Inventory';
import Login from './componets/Login/Login';
import cartProductsLoader from './loader/cartProductsLoader';
import OrderReview from './componets/OrderReview/OrderReview';
import Checkout from './componets/CheckOut/Checkout';
import SignUp from './componets/SignUp/SignUp';
import AuthProvider from './componets/Provider/AuthProvider';
import PrivateRoute from './componets/Routes/PrivateRoute';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {path: '/',
      element: <Shop></Shop>
        },
        {
          path: '/orders',
          element: <Order></Order>,
          loader: cartProductsLoader
        },
        {
          path: "/inventory",
          element: <Inventory></Inventory>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/checkOut',
          element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
        },

        {
          path: '/orderReview',
          element: <OrderReview></OrderReview>
        },
        {path: '/signUp',
        element: <SignUp></SignUp>

        }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>
)

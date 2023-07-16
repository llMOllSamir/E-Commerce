import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import Setting from "./components/Setting/Setting.jsx";
import Products from "./components/Products/Products.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Categories from "./components/Categories/Categories.jsx";
import ProtectedProvider from "./components/ProtectedProvider/ProtectedProvider.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Favorites from "./components/Favorites/Favorites.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import ResetData from "./components/ResetData/ResetData.jsx";
import jwtDecode from "jwt-decode";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import CodeConfirm from "./components/CodeConfirm/CodeConfirm.jsx";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails.jsx";
import NewPassword from "./components/NewPassword/NewPassword.jsx";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts.jsx";
import BrandProducts from "./components/BrandProducts/BrandProducts.jsx";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./Context/CartContext.js";
import Allorders from "./components/Allorders/Allorders.jsx";
import Payment from "./components/Payment/Payment.jsx";
import { Offline } from "react-detect-offline";
import WishContextProvider from "./Context/WishContext.js";
import "./App.css";

export default function App() {
  let [userData, setUserData] = useState(null);
  let [success, setSuccess] = useState(null);

  let saveUser = () => {
    let encodedToken = localStorage.getItem("userToken");
    let decoded = jwtDecode(encodedToken);
    setUserData(decoded);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUser();
    }
  }, []);

  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedProvider>
              <Home />
            </ProtectedProvider>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedProvider>
              {" "}
              <Home />{" "}
            </ProtectedProvider>
          ),
        },
        {
          path: "productsDetails/:id",
          element: (
            <ProtectedProvider>
              {" "}
              <ProductsDetails />{" "}
            </ProtectedProvider>
          ),
        },
        { path: "register", element: <SignUp /> },

        {
          path: "login",
          element: <LogIn saveUser={saveUser} />,
          children: [
            {
              path: "forgotPassword",
              element: <ForgotPassword setSuccess={setSuccess} />,
            },
            {
              path: "codeConfirm",
              element: (
                <CodeConfirm success={success} setSuccess={setSuccess} />
              ),
            },
            { path: "newPassword", element: <NewPassword /> },
          ],
        },
        {
          path: "allorders",
          element: (
            <ProtectedProvider>
              <Allorders userData={userData}></Allorders>
            </ProtectedProvider>
          ),
        },
        {
          path: "payment/:cartid",
          element: (
            <ProtectedProvider>
              <Payment userData={userData}></Payment>
            </ProtectedProvider>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedProvider>
              <Products />
            </ProtectedProvider>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedProvider>
              <Brands />
            </ProtectedProvider>
          ),
          children: [{ path: "brandProducts/:id", element: <BrandProducts /> }],
        },
        {
          path: "categories",
          element: (
            <ProtectedProvider>
              <Categories />
            </ProtectedProvider>
          ),
          children: [
            { path: "categoryProducts/:id", element: <CategoryProducts /> },
          ],
        },
        {
          path: "cart",
          element: (
            <ProtectedProvider>
              <Cart />
            </ProtectedProvider>
          ),
        },
        {
          path: "favourite",
          element: (
            <ProtectedProvider>
              <Favorites />
            </ProtectedProvider>
          ),
        },
        {
          path: "setting",
          element: (
            <ProtectedProvider>
              <Setting />
            </ProtectedProvider>
          ),
          children: [
            {
              path: "resetpassword",
              element: <ResetPassword setUserData={setUserData} />,
            },
            {
              path: "resetdata",
              element: <ResetData setUserData={setUserData} />,
            },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <CartContextProvider>
      <WishContextProvider>
        <Offline>
          <div className="alert alert-danger position-fixed bottom-0">
            <i className="fa-solid fa-circle-notch fa-spin text-danger"></i>{" "}
            Lost Connection
          </div>
        </Offline>
        <Toaster></Toaster>
        <RouterProvider router={routes}></RouterProvider>
      </WishContextProvider>
    </CartContextProvider>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout.jsx";
import ResLogin from "./components/RestaurentLoginRegisterCompo/ResLogin.jsx";
import DeliveryPartnerLoginRegister from "./pages/home/DeliverypartnerLoginRegister.jsx";
import RestaurantLoginRegister from "./pages/home/RestaurantLoginRegister.jsx";
import ResForgotPasswordDialog from "./components/RestaurentLoginRegisterCompo/ResForgotPasswordDialog.jsx";
import ResResetPassword from "./components/RestaurentLoginRegisterCompo/ResResetPassword.jsx";

import ResMenu from "./pages/restaurant/ResMenu.jsx";
import ResDashBoard from "./pages/restaurant/ResDashboard.jsx";
import RestaurantLayout from "./pages/restaurant/RestaurantLayout.jsx";
import ResDetails from "./pages/restaurant/ResDetails.jsx";


import UsersRestaurant from "./pages/Users/usershome/UsersRestaurant.jsx"
import Usersliked from "./pages/Users/liked/Usersliked.jsx";
import UsersOrders from "./pages/Users/orders/Usersorders.jsx";
import UsersDishes from "./pages/Users/Dishes/UsersDishes.jsx";
import ResOrders from "./pages/restaurant/ResOrders.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<App />} />
      <Route path="ResLogin" element={<ResLogin />} />
      <Route path="DeliveryPartnerLoginRegister" element={<DeliveryPartnerLoginRegister />} />
      <Route path="RestaurantLoginRegister" element={<RestaurantLoginRegister />} />
      <Route path="ResForgotPasswordDialog" element={<ResForgotPasswordDialog />} />
      <Route path="/ResResetPassword/:token" element={<ResResetPassword />} />

      <Route path="/UsersRestaurant" element={<UsersRestaurant />} />
      <Route path="/Usersliked" element={<Usersliked />} />
      <Route path="/UsersOrders" element={<UsersOrders />} />
      <Route path="/UsersDishes" element={<UsersDishes />} />

      <Route path="RestaurantLayout" element={<RestaurantLayout />}>
        <Route path="ResDashBoard" element={< ResDashBoard />} />
        <Route path="ResOrders" element={<ResOrders/>} />
        <Route path="ResDetails" element={<ResDetails />} />
        <Route path="ResMenu" element={< ResMenu />} />
      </Route>
      {/* <Route path="ResLogin" element */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="bottom-right"/>
  </React.StrictMode>
);

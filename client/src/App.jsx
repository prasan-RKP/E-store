import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import HomePageShop from "./pages/HomePageShop";
import ModernMensClothing from "./cloth/mens/ModernMensClothing";
import WomenClothing from "./cloth/women/WomenClothing";
import MenAccessories from "./cloth/mens/MenAccessories";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FootWear from "./cloth/unisex/FootWear";
import AddToCart from "./pages/AddToCart";
import ProfilePage from "./pages/ProfilePage";
import LuxeLoader from "./pages/LuxeLoader";
import { userAuthStore } from "./store/authStore";
import ProductDisplay from "./pages/ProductDisplay";
import CardComponent from "./pages/CardComponent";
import Farmer from "./pages/Farmer";
import AddToWishList from "./pages/AddToWishList";
import FantaCanShowcase from "./pages/FantaCanShowcase";
import ModernEcommerceLanding from "./landing/ModernEcommerceLanding";
import AboutPage from "./pages/AboutPage";
import SimplifiedCheckout from "./landing/SimplifiedCheckout";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProductDisplaySkeleton from "./skeletons/ProductDisplaySkeleton";
import OrderListLoader from "./skeletons/OrderListSkeleton";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RenderWakeLoader from "./landing/RenderWakeLoader";

const App = () => {
  const { verifiedUser, isCheckingVerified, checkAuthVerify } = userAuthStore();

  // 🧠 Backend readiness state
  const [isBackendReady, setIsBackendReady] = useState(false);

  // 🔄 Check if Render backend is ready
  useEffect(() => {
    const checkBackend = async () => {
      try {
        // ⚙️ Change this to your deployed backend base URL
        const res = await fetch("https://your-backend-url.onrender.com/ping");
        if (res.ok) {
          setIsBackendReady(true);
        } else {
          throw new Error("Backend not ready");
        }
      } catch (err) {
        console.log("Render service still waking up...");
        setTimeout(checkBackend, 3000); // retry every 3 seconds
      }
    };

    checkBackend();
  }, []);

  // ✅ Once backend is ready, verify authentication
  useEffect(() => {
    if (isBackendReady) {
      checkAuthVerify();
    }
  }, [isBackendReady, checkAuthVerify]);

  // 🌀 Loader when Render backend is waking up
  if (!isBackendReady) {
    return <RenderWakeLoader />;
  }

  // 🔐 Loader during authentication check
  if (!verifiedUser && isCheckingVerified) {
    return <LuxeLoader />;
  }

  // ✅ Main App after backend & auth are ready
  return (
    <div>
      <Routes>
        <Route path="/my" element={<OrderListLoader />} />
        <Route path="/" element={<HomePageShop />} />
        <Route path="/alert" element={<CardComponent />} />
        <Route path="/ske" element={<LuxeLoader />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/fanta" element={<FantaCanShowcase />} />
        <Route path="/land" element={<ModernEcommerceLanding />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ord" element={<ProductDisplaySkeleton />} />

        {/* Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Order history */}
        <Route
          path="/showorder"
          element={
            verifiedUser ? <OrderHistoryPage /> : <Navigate to={"/login"} replace />
          }
        />

        {/* Wishlist */}
        <Route
          path="/addToWishlist"
          element={
            verifiedUser ? <AddToWishList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/wishlist"
          element={
            verifiedUser ? <AddToWishList /> : <Navigate to={"/login"} replace />
          }
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            verifiedUser ? <SimplifiedCheckout /> : <Navigate to={"/login"} replace />
          }
        />

        {/* Auth */}
        <Route
          path="/login"
          element={
            !verifiedUser ? <Login /> : <Navigate to={"/profile"} replace />
          }
        />
        <Route
          path="/signup"
          element={
            !verifiedUser ? <SignUp /> : <Navigate to={"/profile"} replace />
          }
        />

        {/* Product */}
        <Route
          path="/productshow/:id"
          element={
            verifiedUser ? <ProductDisplay /> : <Navigate to={"/login"} replace />
          }
        />

        {/* Cart */}
        <Route
          path="/addtocart"
          element={
            verifiedUser ? <AddToCart /> : <Navigate to={"/login"} replace />
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            verifiedUser ? <ProfilePage /> : <Navigate to={"/login"} replace />
          }
        />

        {/* Men's section */}
        <Route
          path="/men-clothes"
          element={
            verifiedUser ? <ModernMensClothing /> : <Navigate to={"/login"} replace />
          }
        />
        <Route
          path="/accessories"
          element={
            verifiedUser ? <MenAccessories /> : <Navigate to={"/login"} replace />
          }
        />

        {/* Women's section */}
        <Route
          path="/women-clothes"
          element={
            verifiedUser ? <WomenClothing /> : <Navigate to={"/login"} />
          }
        />

        {/* Unisex */}
        <Route
          path="/footwears"
          element={verifiedUser ? <FootWear /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;

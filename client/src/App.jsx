import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import HomePageShop from "./pages/HomePageShop";
import MensJeansPage from "./cloth/mens/MensJeansPage";
import ModernMensClothing from "./cloth/mens/ModernMensClothing";
import WomenClothing from "./cloth/women/WomenClothing";
import MenAccessories from "./cloth/mens/MenAccessories";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FootWear from "./cloth/unisex/FootWear";
import ProductShow from "./pages/ProductShow";
import ProductTrail from "./pages/ProductTrail";
import Dup from "./cloth/unisex/Dup";
import AddToCart from "./pages/AddToCart";
import Solo from "./pages/solo";
import MyProfile from "./pages/MyProfile";
import ProfilePage from "./pages/ProfilePage";
import MyLoader from "./pages/MyLoader";
import LuxeLoader from "./pages/LuxeLoader";
import { userAuthStore } from "./store/authStore";
import ProductDisplay from "./pages/ProductDisplay";
import AlertWindow from "./pages/AlertWindow";
import TypingAnimation from "./pages/TypingAnimation";
import CardComponent from "./pages/CardComponent";
import CardHoverEffects from "./pages/CardHoverEffects";
import SkeletonProductCard from "./skeletons/SkeletonProductCard";
import AccSkeleton from "./skeletons/AccSkeleton";
import Farmer from "./pages/Farmer";
import AddToCartSkeleton from "./skeletons/AddToCartSkeleton";
import OrderConfirmation from "./pages/OrderConfirmation";
import AddToWishList from "./pages/AddToWishList";
import WishSkeleton from "./skeletons/WishSkeleton";
import FantaCanShowcase from "./pages/FantaCanShowcase";
import AnimatedLandingPage from "./pages/AnimatedLandingPage";
import ModernCheckout from "./pages/ModernCheckout";
import ModernEcommerceLanding from "./landing/ModernEcommerceLanding";
import ClaudeLand from "./landing/ClaudeLand";
import TestAdd from "./customs/TestAdd";
import CheckOut from "./pages/CheckOut";
import Modern from "./pages/Modern";
import MyCheckOut from "./pages/MyCheckOut";
import CheckOutSkeleton from "./skeletons/CheckOutSkeleton";
import AboutPage from "./pages/AboutPage";
import NewCheckOut from "./pages/NewCheckout";
import SimplifiedCheckout from "./landing/SimplifiedCheckout";
import OrderPlace from "./landing/segement/OrderPlace";
import SuccessModal from "./landing/segement/SuccessModal";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderHistorySkeleton from "./skeletons/OrderHistorySkeleton";
import ProdDisplaySke from "./skeletons/ProductDisplaySkeleton";
import ProductDisplaySkeleton from "./skeletons/ProductDisplaySkeleton";
import OrderListLoader from "./skeletons/OrderListSkeleton";
//import CheckoutWizard from "./pages/checkout/CheckoutWizard";

const App = () => {
  const { verifiedUser, isCheckingVerified, checkAuthVerify } = userAuthStore();

  useEffect(() => {
    checkAuthVerify();
  }, [checkAuthVerify]);

  // loader setUp for authentication
  if (!verifiedUser && isCheckingVerified) {
    return <LuxeLoader />;
  }

  //console.log("verify",verifiedUser);

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

        // "/order-show" use it for show orders
        <Route path="/showorder" element={verifiedUser ? (<OrderHistoryPage />) : (<Navigate to={"/login"} replace />)} />


        <Route
          path="/addToWishlist"
          element={
            verifiedUser ? <AddToWishList /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/checkout"
          element={
            verifiedUser ? (
              <SimplifiedCheckout />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />

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

        <Route
          path="/wishlist"
          element={
            verifiedUser ? (
              <AddToWishList />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
        <Route
          path="/productshow/:id"
          element={
            verifiedUser ? (
              <ProductDisplay />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
        <Route
          path="/addtocart"
          element={
            verifiedUser ? <AddToCart /> : <Navigate to={"/login"} replace />
          }
        />
        <Route
          path="/profile"
          element={
            verifiedUser ? <ProfilePage /> : <Navigate to={"/login"} replace />
          }
        />


        {/* Men's section  */}
        <Route
          path="/men-clothes"
          element={
            verifiedUser ? (
              <ModernMensClothing />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
        <Route
          path="/accessories"
          element={
            verifiedUser ? (
              <MenAccessories />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />

        {/* combo -unisex */}
        <Route
          path="/footwears"
          element={verifiedUser ? <FootWear /> : <Navigate to={"/login"} />}
        />
        {/* Women section */}
        <Route
          path="/women-clothes"
          element={
            verifiedUser ? <WomenClothing /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
      <Toaster position="top-left" />
      {/*  */}
    </div>
  );
};

export default App;

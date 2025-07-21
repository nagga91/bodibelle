import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import "./i18n";

// Composants publics
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/header/Header";
import APropos from "./components/aPropos/APropos";
import Achteurs from "./components/achteurs/Achteurs";
import Vendeurs from "./components/vendeurs/Vendeurs";
import CategoryShowcase from "./components/category/CategoryShowcase";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Loader from "./components/loader/Loader";
import Transition from "./components/transition/Transition";
import ProductPage from "./components//ProductPage/ProductPage";

// Pages
import LoginPage from "./pages/LoginPage";
import Order from "./components/order/Order";
import DashboardLayout from "./layouts/DashboardLayout";
import OrdersPage from "./pages/dashboard/OrdersPage";
import ProductsPage from "./pages/dashboard/ProductsPage"; 
import CategoriesPage from "./pages/dashboard/CategoriesPage";

const appTrans = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

function App() {
  const location = useLocation();
  const [openNavbar, setOpenNavbar] = useState(false);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [nav, setNav] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    setTimeout(() => setLoading2(false), 4000);
  }, []);

  useEffect(() => {
    setNav(false);
  }, [location]);

  return (
    <div className="App">
      {/* Toast messages */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="light"
        toastStyle={{ backgroundColor: "white", color: "black" }}
        progressStyle={{ backgroundColor: "black" }}
      />

      {/* Scroll behavior */}
      <Helmet>
        <style>{`* { scroll-behavior: ${nav ? "auto" : "smooth"}; }`}</style>
      </Helmet>

      {/* Animation principale */}
      <AnimatePresence mode="popLayout">
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            key="app-trans"
            style={{ width: "100%", position: loading2 ? "fixed" : "static", top: 0 }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={appTrans}
          >
            <Navbar open={openNavbar} setOpen={setOpenNavbar} setNav={setNav} />
            <AnimatePresence mode="popLayout" initial={false}>
              <Routes location={location} key={location.pathname}>
                {/* Page publique */}
                <Route
                  path="/"
                  element={
                    <Transition>
                      <Header setOpenNavbar={setOpenNavbar} />
                      <div className="App-container" onClick={() => setOpenNavbar(false)}>
                        <APropos />
                        <CategoryShowcase />
                        
                        <Vendeurs />
                        <Achteurs />
                        <Contact />
                        <Footer />
                      </div>
                    </Transition>
                  }
                />

                <Route path="/products/category/:categoryId" element={<ProductPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/order" element={<Order />} />

                {/* Routes protégées du dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
                  }
                >
                  <Route index element={<OrdersPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

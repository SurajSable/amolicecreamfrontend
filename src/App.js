import React, { useEffect, useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/nav/Header";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { useDispatch } from "react-redux";
import loggedInUser from "./redux/actions/loggedInUser";
import firebase from "./firebase"
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import RedirectHome from "./pages/RedirectHome";
import { useSelector } from "react-redux";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { currentAdmin } from "./functions/auth";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CaterogyUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProduct";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shops";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";
import RazorPayment from "./pages/RazorPayment";
import Footer from "./components/footer/FooterHome";

const App = () => {
  const [admin, setAdmin] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch(loggedInUser({
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              id: res.data._id,
              token: idTokenResult.token,
            }));
          }
          )
          .catch(err => console.log("currentuser", err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user && user.token && user.role === "admin") {
      currentAdmin(user.token)
        .then((res) => {
          //console.log("CURRENT ADMIN RES", res);
          setAdmin(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setAdmin(false);
        })
    }
  }, [user])

  return (
    <div>
      <Router>
        <Header />
        <SideDrawer />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/register/complete" element={<RegisterComplete />} />
          <Route exact path="/forgot/password" element={<ForgotPassword />} />
          {user && user?.token ? <Route exact path="/user/history" element={<History />} /> :
            <Route exact path="/user/history" element={<RedirectHome />} />}
          {user && user?.token ? <Route exact path="/user/password" element={<Password />} /> :
            <Route exact path="/user/password" element={<RedirectHome />} />}
          {user && user?.token ? <Route exact path="/user/wishlist" element={<Wishlist />} /> :
            <Route exact path="/user/wishlist" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/dashboard" element={<AdminDashboard />} /> :
            <Route exact path="/admin/dashboard" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/category" element={<CategoryCreate />} /> :
            <Route exact path="/admin/category" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/category/:slug" element={<CategoryUpdate />} /> :
            <Route exact path="/admin/category/:slug" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/sub/" element={<SubCreate />} /> :
            <Route exact path="/admin/sub/" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/sub/:slug" element={<SubUpdate />} /> :
            <Route exact path="/admin/sub/:slug" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/product" element={<ProductCreate />} /> :
            <Route exact path="/admin/product" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/products" element={<AllProducts />} /> :
            <Route exact path="/admin/products" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/product/:slug" element={<ProductUpdate />} /> :
            <Route exact path="/admin/product/:slug" element={<RedirectHome />} />}
          <Route exact path="/product/:slug" element={<Product />} />
          <Route exact path="/category/:slug" element={<CategoryHome />} />
          <Route exact path="/sub/:slug" element={<SubHome />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/cart" element={<Cart />} />
          {user && user?.token ? <Route exact path="/checkout" element={<Checkout />} /> :
            <Route exact path="/checkout" element={<RedirectHome />} />}
          {admin ? <Route exact path="/admin/coupon" element={<CreateCouponPage />} /> :
            <Route exact path="/admin/coupon" element={<RedirectHome />} />}
          {user && user?.token ? <Route exact path="/payment" element={<Payment />} /> :
            <Route exact path="/payment" element={<RedirectHome />} />}
          {user && user?.token ? <Route exact path="/razorpayment" element={<RazorPayment />} /> :
            <Route exact path="/razorpayment" element={<RedirectHome />} />}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;

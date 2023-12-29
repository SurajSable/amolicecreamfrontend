import React, { useEffect, useState,lazy,Suspense } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { currentUser } from "./functions/auth";
import firebase from "./firebase"
import { currentAdmin } from "./functions/auth";



// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Home from "./pages/Home";
// import Header from "./components/nav/Header";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import loggedInUser from "./redux/actions/loggedInUser";
// import firebase from "./firebase"
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import RedirectHome from "./pages/RedirectHome";
// import Password from "./pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/category/CaterogyUpdate";
// import SubCreate from "./pages/admin/sub/SubCreate";
// import SubUpdate from "./pages/admin/sub/SubUpdate";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import AllProducts from "./pages/admin/product/AllProduct";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/Shops";
// import Cart from "./pages/Cart";
// import SideDrawer from "./components/drawer/SideDrawer";
// import Checkout from "./pages/Checkout";
// import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
// import Payment from "./pages/Payment";
// import RazorPayment from "./pages/RazorPayment";
// import Footer from "./components/footer/FooterHome";


// using lazy

const Login = lazy(()=>import("./pages/auth/Login")) ;
const Register = lazy(()=>import("./pages/auth/Register")) ;
const Home = lazy(()=>import("./pages/Home")) ; 
const Header = lazy(()=>import("./components/nav/Header")) ; 
const RegisterComplete  = lazy(()=>import( "./pages/auth/RegisterComplete")) ;
const loggedInUser = lazy(()=>import("./redux/actions/loggedInUser")) ; 
// const firebase = lazy(()=>import( "./firebase")) ;
const ForgotPassword  = lazy(()=>import("./pages/auth/ForgotPassword")) ;
const History = lazy(()=>import("./pages/user/History")) ; 
const RedirectHome = lazy(()=>import("./pages/RedirectHome")) ; 
const Password = lazy(()=>import("./pages/user/Password")) ;
const  Wishlist = lazy(()=>import("./pages/user/Wishlist")) ; 
const AdminDashboard = lazy(()=>import("./pages/admin/AdminDashboard")) ; 
const CategoryCreate = lazy(()=>import( "./pages/admin/category/CategoryCreate")) ; 
const CategoryUpdate = lazy(()=>import("./pages/admin/category/CaterogyUpdate")) ; 
const SubCreate = lazy(()=>import("./pages/admin/sub/SubCreate")) ;
const SubUpdate = lazy(()=>import("./pages/admin/sub/SubUpdate")) ; 
const ProductCreate = lazy(()=>import( "./pages/admin/product/ProductCreate")) ; 
const AllProducts = lazy(()=>import("./pages/admin/product/AllProduct")) ; 
const ProductUpdate = lazy(()=>import("./pages/admin/product/ProductUpdate")) ; 
const Product = lazy(()=>import( "./pages/Product")) ; 
const CategoryHome = lazy(()=>import( "./pages/category/CategoryHome")) ; 
const SubHome= lazy(()=>import("./pages/sub/SubHome")) ; 
const Shop = lazy(()=>import("./pages/Shops")) ; 
const Cart = lazy(()=>import("./pages/Cart")) ; 
const SideDrawer= lazy(()=>import( "./components/drawer/SideDrawer")) ; 
const  Checkout = lazy(()=>import("./pages/Checkout")) ; 
const CreateCouponPage = lazy(()=>import("./pages/admin/coupon/CreateCouponPage")) ; 
const Payment = lazy(()=>import( "./pages/Payment")) ;
const RazorPayment = lazy(()=>import("./pages/RazorPayment")) ; 
const Footer = lazy(()=>import("./components/footer/FooterHome")) ; 


const App = () => {
  const [admin, setAdmin] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        
        const idTokenResult = await user.getIdTokenResult();
        console.log("user2",idTokenResult)
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
    <Suspense fallback={
      <div className="col text-center p-5" >product < RestartAltIcon/>
      </div>
    }
    >
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
    </Suspense>
  );
}
export default App;

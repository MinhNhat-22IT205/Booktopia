import Navbar from "./layout/Navbar";
import Searchbar from "./layout/SearchBar";
import Authen from "./component/Authentication/Authen";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";

import React from "react";
import Spinner from "./component/UI/Spinner";
import Notification from "./component/UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import { getUser, sendCart, sendUser, userAction } from "./shared/store/user";
import { getBookData, sendBookData } from "./shared/store/books";
import Page404 from "./pages/Page404";
import UserProfile from "./pages/UserProfile";
import { notificationAction } from "./shared/store/notification";
import Dashboard from "./pages/Dashboard";

const Home = React.lazy(() => import("./pages/Home"));
const Footer = React.lazy(() => import("./layout/Footer"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Contact = React.lazy(() => import("./pages/Contact"));
const BooksPage = React.lazy(() => import("./pages/BooksPage"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Orders = React.lazy(() => import("./pages/Orders"));
const CreateProduct = React.lazy(() => import("./pages/CreateProduct"));
const YourProduct = React.lazy(() => import("./pages/YourProduct"));
const UpdateProduct = React.lazy(() => import("./pages/UpdateProduct"));

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isInitial, setInitial] = useState(true);
  const isAuth = useSelector((state) => !!state.user.token);
  const counter = useRef(null);
  // const [initial, setInitial] = useState(true);
  const location = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (isInitial) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData !== null && userData.token !== null) {
        dispatch(
          getUser(userData.uid, userData.token, userData.tokenExpireDate, nav)
        );
      }
      setInitial(false);
    } else {
      dispatch(sendCart(user.uid, user.cart, user.token));
    }
  }, [dispatch, user.cart]);
  useEffect(() => {
    if (user.token && user.tokenExpireDate) {
      const remainTime =
        new Date(user.tokenExpireDate).getTime() - new Date().getTime(); //miliseconds
      counter.current = setTimeout(() => {
        dispatch(userAction.logout());
        dispatch(
          notificationAction.notify({
            message: "Section expired!",
            status: "error",
          })
        );
      }, remainTime);
    } else {
      clearTimeout(counter.current); //clear counting when direct logout
    }
  }, [user, dispatch]);
  // useEffect(() => {
  //   if (initial) {
  //     dispatch(getBookData());
  //   } else {
  //     dispatch(sendBookData(books));
  //   }
  // }, [books, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Notification />
      <Navbar>
        {!user.isAdmin && (
          <Searchbar>
            <NavLink to="/" className="nav-item">
              Home
            </NavLink>
            <NavLink to="/books?p=1" className="nav-item">
              Books
            </NavLink>
            <NavLink to="/about" className="nav-item">
              About Us
            </NavLink>
            <NavLink to="/contact" className="nav-item">
              Contact
            </NavLink>
          </Searchbar>
        )}

        <Authen />
      </Navbar>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {!user.isAdmin && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/books/:bookId" element={<ProductDetail />} />
            </>
          )}

          {isAuth && (
            <>
              {user.isAdmin ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : (
                <>
                  <Route path="/profile/:uid" element={<UserProfile />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/create-product" element={<CreateProduct />} />
                  <Route
                    path="books/:id/update-product"
                    element={<UpdateProduct />}
                  />
                </>
              )}
            </>
          )}
          <Route path="*" element={<Page404 />} />
        </Routes>
        {!user.isAdmin && <Footer />}
      </Suspense>
    </>
  );
}

export default App;

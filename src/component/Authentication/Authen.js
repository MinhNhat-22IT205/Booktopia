import { useEffect, useRef, useState } from "react";
import Login from "./LoginForm";
import Signup from "./SignUpForm";
import Backdrop from "../UI/Backdrop";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import AuthenProfile from "./AuthenProfile";
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../shared/store/user";

const show = {
  height: "auto",
  opacity: 1,
  display: "block",
};

const hide = {
  height: 0,
  opacity: 0,
  display: "none",
};
export default function Authen() {
  const [openLogin, setLogin] = useState(false);
  const [openSignup, setSignup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const isAuth = useSelector((state) => !!state.user.token);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const ref = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenProfile(false);
      }
    });
  }, []);

  function close() {
    setLogin(false);
    setSignup(false);
  }
  function logout() {
    dispatch(userAction.logout());
    nav("/");
  }

  return (
    <>
      <div className="row-start-1 col-start-10 col-span-2 flex justify-end items-center min-w-[15rem]">
        {!isAuth ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLogin(true)}
              className="py-[0.5rem] px-[2rem] mr-2 bg-[#f1eeff] text-[#6c5dd4] font-bold border-none rounded-lg cursor-pointer"
            >
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSignup(true)}
              className="py-[0.5rem] px-[1.4rem] bg-[#6c5dd4] text-[#fefe] shadow-lg shadow-[#d4d0fe] font-bold border-none rounded-lg cursor-pointer"
            >
              <i className="fa-regular fa-user"></i>Sign Up
            </motion.button>
          </>
        ) : (
          <>
            {!isAdmin && (
              <Link
                to={"/cart"}
                className="hover:bg-slate-100 rounded-lg px-2 py-2 cursor-pointer"
              >
                <div className="relative ">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    className="fill-[#6c5dd4] scale-105"
                  >
                    <path d="M21 4H2v2h2.3l3.521 9.683A2.004 2.004 0 0 0 9.7 17H18v-2H9.7l-.728-2H18c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 4z"></path>
                    <circle cx="10.5" cy="19.5" r="1.5"></circle>
                    <circle cx="16.5" cy="19.5" r="1.5"></circle>
                  </svg>
                  <span className="absolute -top-2 left-full -translate-x-1/2 text-sm rounded-full bg-red-500 text-white w-5 h-5 flex items-center justify-center font-semibold">
                    {userData.cart.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </span>
                </div>
              </Link>
            )}

            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="mx-3 ml-4 p-0.5 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <img
                alt=""
                className="w-10 object-cover aspect-square rounded-full "
                src={"http://localhost:5000/" + userData.avatar}
              />
            </button>
            <AnimatePresence initial={false}>
              <motion.div
                ref={ref}
                onClick={() => setOpenProfile(false)}
                className="relative"
                animate={openProfile ? show : hide}
              >
                <AuthenProfile onLogout={logout} />
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
      {!isAuth && (
        <>
          {openLogin &&
            createPortal(
              <Login onClose={close} />,
              document.getElementById("authen")
            )}
          {openLogin &&
            createPortal(
              <Backdrop onClose={close} />,
              document.getElementById("backdrop")
            )}
          {openSignup &&
            createPortal(
              <Signup onClose={close} />,
              document.getElementById("authen")
            )}
          {openSignup &&
            createPortal(
              <Backdrop onClose={close} />,
              document.getElementById("backdrop")
            )}
        </>
      )}
    </>
  );
}

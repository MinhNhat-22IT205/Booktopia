import { useState } from "react";
import Login from "../layout/Login";
import Signup from "../layout/SignUp";
import Backdrop from "../component/Backdrop";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
export default function Authen() {
  const [openLogin, setLogin] = useState(false);
  const [openSignup, setSignup] = useState(false);

  function close() {
    setLogin(false);
    setSignup(false);
  }

  console.log(openLogin);

  return (
    <>
      <div className="row-start-1 col-start-10 col-span-2 grid grid-cols-2 gap-2 min-w-[15rem]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLogin(true)}
          className="py-[0.5rem] px-[1.2rem] bg-[#f1eeff] text-[#6c5dd4] font-bold border-none rounded-lg cursor-pointer"
        >
          Log In
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSignup(true)}
          className="py-[0.5rem] px-[1.2rem] bg-[#6c5dd4] text-[#fefe] shadow-lg shadow-[#d4d0fe] font-bold border-none rounded-lg cursor-pointer"
        >
          <i className="fa-regular fa-user"></i>Sign Up
        </motion.button>
      </div>
      {openLogin && createPortal(<Login />, document.getElementById("authen"))}
      {openLogin &&
        createPortal(
          <Backdrop onClose={close} />,
          document.getElementById("backdrop")
        )}
      {openSignup &&
        createPortal(<Signup />, document.getElementById("authen"))}
      {openSignup &&
        createPortal(
          <Backdrop onClose={close} />,
          document.getElementById("backdrop")
        )}
    </>
  );
}

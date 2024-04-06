import React from "react";
import Backdrop from "./Backdrop";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function CardOverLay(props) {
  return (
    <>
      <motion.div
        // initial={{ y: 20, opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        // exit={{ opacity: 0, y: 20 }}
        // className="fixed p-5 bg-white z-20 min-w-[1000px] w-fit h-fit max-h-[700px] overflow-y-auto overflow-x-hidden top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 rounded-xl "
        className="fixed p-5 bg-white z-20 min-w-[100px] w-fit h-fit max-h-[700px] overflow-y-auto no-scrollbar overflow-x-hidden top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 rounded-lg"
      >
        <div className="relative">
          <div
            onClick={props.onClose}
            className="absolute left-full bottom-full -translate-x-1/2 translate-y-1/2 font-bold  text-[#000] transition-all hover:bg-gray-200/40 hover:opacity-80 border-[#6353d1] cursor-pointer rounded-full text-center px-3 py-3 z-30"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {props.children}
        </div>
      </motion.div>
    </>
  );
}

export default function Modal(props) {
  return (
    <>
      {createPortal(
        <CardOverLay onClose={props.onClose}>{props.children}</CardOverLay>,
        document.getElementById("backdrop")
      )}
      {createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop")
      )}
    </>
  );
}

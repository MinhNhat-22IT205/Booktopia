import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Searchbar(props) {
  const [open, setOpen] = useState(false);
  const show = {
    height: "auto",
    opacity: 1,
  };

  const hide = {
    height: 0,
    transitionEnd: {
      opacity: 0,
      display: "none",
    },
  };
  console.log(open);
  return (
    <>
      <div className="col-start-2 col-span-10 lg:col-start-4 lg:col-span-6 border-2 flex items-center rounded-xl z-1">
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className=" bg-white text-[#6c5dd4] font-bold py-[0.55rem] px-[1rem] rounded-l-xl flex items-center justify-around cursor-pointer border-r-2 border-[#e4e4e4] w-[7rem] hover:opacity-90 hover:border-2"
            onClick={() => setOpen(!open)}
          >
            Menus
            <i
              className={
                open
                  ? "fa-solid fa-angle-down active"
                  : "fa-solid fa-angle-down"
              }
            ></i>
          </motion.button>
          <AnimatePresence initial={false}>
            <motion.div
              onClick={() => setOpen(!open)}
              className="!flex flex-col absolute border-2 border-[#e4e4e4] list-none bg-white rounded-xl overflow-hidden"
              animate={open ? show : hide}
            >
              {props.children}
            </motion.div>
          </AnimatePresence>
        </div>
        <input
          className="h-full w-full focus:outline-0 pl-5 py-[.5rem] text-sm caret-[#6c5dd4] font-poppins"
          type="text"
          placeholder="Search over 30 million book titles"
        ></input>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </>
  );
}

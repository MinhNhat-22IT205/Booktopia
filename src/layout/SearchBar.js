import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Searchbar(props) {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const nav = useNavigate();

  const ref = useRef();
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
  useEffect(() => {
    const detectOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);
    return () => {
      document.removeEventListener("click", detectOutsideClick);
    };
  });

  return (
    <>
      <div className="col-start-2 col-span-10 lg:col-start-4 lg:col-span-6 border-2  rounded-xl z-1">
        <form
          onSubmit={() => {
            nav(`/books?search=${searchInput}&p=1`);
          }}
          action=""
          className="flex items-center"
        >
          <div ref={ref}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
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
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
          ></input>
          <Link to={`/books?search=${searchInput}&p=1`}>
            <button type="submit">
              <i type="submit" className="fa-solid fa-magnifying-glass"></i>
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

import Icon from "@mdi/react";
import { mdiViewGridOutline, mdiFormatListBulleted } from "@mdi/js";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
export default function Filter2({ status, onChange }) {
  const uref = useRef(null);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (uref.current && !uref.current.contains(e.target)) {
        setSortOpen(false);
      }
    });
  }, []);

  return (
    <div className="shadow-md shadow-[#000]/5 border rounded-xl flex justify-between items-center w-full ">
      <div className="w-full flex justify-between items-center border-r px-6 py-4">
        <div className="flex items-center justify-between ">
          <h3
            className={`opacity-50 hover:opacity-90 cursor-pointer ${
              status.date === "today" && "font-bold !opacity-100"
            }`}
            onClick={() => onChange("date", "today")}
          >
            Today
          </h3>
          <h3
            className={`mx-5 opacity-50 hover:opacity-90 cursor-pointer ${
              status.date === "week" && "font-bold !opacity-100"
            }`}
            onClick={() => onChange("date", "week")}
          >
            This Week
          </h3>
          <h3
            className={`mr-5 opacity-50 hover:opacity-90 cursor-pointer ${
              status.date === "month" && "font-bold !opacity-100"
            }`}
            onClick={() => onChange("date", "month")}
          >
            This Month
          </h3>
          <h3
            className={`opacity-50 hover:opacity-90 cursor-pointer ${
              status.date === "" && "font-bold !opacity-100"
            }`}
            onClick={() => onChange("date", "")}
          >
            All
          </h3>
        </div>
        <div className="flex">
          <Icon
            path={mdiFormatListBulleted}
            size={1}
            className={`text-[#aaaaaa] hover:text-[#6c5dd4] cursor-pointer mx-2 ${
              status.displayType === "list" && "!text-[#6c5dd4]"
            }`}
            onClick={() => {
              onChange("displayType", "list");
            }}
          />
          <Icon
            path={mdiViewGridOutline}
            size={1}
            className={`text-[#aaaaaa] hover:text-[#6c5dd4] cursor-pointer ${
              status.displayType === "grid" && "!text-[#6c5dd4]"
            }`}
            onClick={() => {
              onChange("displayType", "grid");
            }}
          />
        </div>
      </div>
      <div className="relative flex flex-col items-center" ref={uref}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          className="flex px-6 py-4 items-center justify-between  cursor-pointer "
          onClick={() => setSortOpen(!sortOpen)}
        >
          <i className="fas fa-sort-amount-down opacity-50"></i>
          {}
          <h3 className="font-bold mx-2">
            {status.order === "desc" ? "Newest" : "Oldest"}
          </h3>
          <i
            className={
              sortOpen
                ? "fa-solid fa-angle-down -rotate-180 text-[#6c5dd4]"
                : "fa-solid fa-angle-down rotate-0"
            }
          ></i>
        </motion.button>
        <AnimatePresence initial={false}>
          <motion.div
            animate={sortOpen ? show : hide}
            className="absolute top-14 border rounded-lg mt-2 overflow-hidden z-20 bg-white"
          >
            <h1
              className={`px-10 py-3 cursor-pointer ${
                status.order === "desc" && "bg-[#f1eeff] text-[#6c5dd4]"
              }`}
              onClick={() => {
                onChange("order", "desc");
                setSortOpen(false);
              }}
            >
              Newest
            </h1>
            <h1
              className={`px-10 py-3 cursor-pointer ${
                status.order === "asc" && "bg-[#f1eeff] text-[#6c5dd4]"
              }`}
              onClick={() => {
                onChange("order", "asc");
                setSortOpen(false);
              }}
            >
              Oldest
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

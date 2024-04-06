import React from "react";
import { motion } from "framer-motion";

const CardInfor = (props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={props.setTab}
      className=" rounded-lg  shadow-md  w-fit px-8 py-5 cursor-pointer"
    >
      <div className="flex gap-3 w-fit h-fit items-center ">
        <div className="bg-[#d4d0fe] text-white h-fit px-3 py-3 rounded-lg ">
          {props.svg}
        </div>
        <div>
          <h5 className="text-[#6b7280] font-semibold">{props.name}</h5>
          <h2 className="text-2xl font-bold ">{props.quantity}</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default CardInfor;

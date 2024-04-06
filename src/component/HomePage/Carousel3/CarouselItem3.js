import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function carouselItem3(props) {
  return (
    <div className="block  lg:flex bg-white w-fit rounded-xl mx-10 my-10 opacity-50 scale-90 shadow-lg shadow-[#000]/20">
      <img
        className="shadow-lg shadow-[#000]/40 mr-10 rounded-xl w-[21rem]"
        alt=""
        src={props.link}
      ></img>
      <div className="ml-10  w-[280px] lg:w-[500px] pt-10 pr-5 pb-10">
        <h3 className="tracking-[5px] font-bold text-[#6c5dd4]">BEST SELLER</h3>
        <h1 className="text-5xl font-bold my-3">{props.title}</h1>
        <div className="flex text-[#6c5dd4] font-semibold">
          <h3>{props.author}</h3>
          <h3 className="ml-5">{props.genre}</h3>
        </div>
        <p className="opacity-60 border-l-2 border-black pl-5 my-8">
          {props.des}
        </p>
        <div className="flex items-center">
          <div className="flex items-baseline">
            <h1 className="mr-3 font-bold text-4xl">{"$" + props.price}</h1>
            <h3 className=" font-semibold text-2xl line-through opacity-50">
              {"$" + props.oldPrice}
            </h3>
          </div>
          <h3 className="ml-5 px-3 py-1.5 bg-[#f1eeff] text-[#6c5dd4] font-bold rounded-xl text-sm">
            {props.discount}% OFF
          </h3>
        </div>
        <div className="mt-5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="text-xl font-semibold text-[#fff] bg-[#6c5dd4] px-5 py-3 rounded-lg"
          >
            <i className="fa-solid fa-cart-shopping mr-2"></i>Buy Now
          </motion.button>
          <Link to={`/books/${props.id}`}>
            <motion.button
              whileHover={{ backgroundColor: "#aeaeb1" }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 border border-[#000]/60  text-lg font-semibold px-5 py-3 rounded-lg "
            >
              See Details
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

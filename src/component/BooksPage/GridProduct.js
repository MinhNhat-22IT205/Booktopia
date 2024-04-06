import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function GridProduct(props) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  var star = props.star;
  var stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < star) {
      stars.push(<i className="fa-solid fa-star text-[#ff764c] mx-0.5"></i>);
    } else {
      stars.push(<i className="fa-solid fa-star text-[#e1e1e1] mx-0.5"></i>);
    }
  }
  const handleAddToCart = (event) => {
    event.preventDefault();
  };
  return (
    <Link
      key={props.id}
      to={`/books/${props.id}`}
      className="relative h-[380px] w-fit bg-white "
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-[210px] rounded-xl  border py-3 px-4 flex flex-col items-center transition-all duration-200 bg-white ${
          hovered
            ? `absolute shadow-xl shadow-[#d4d0fe] z-10 scale-110`
            : "shadow-md shadow-[#000]/5"
        }`}
      >
        <div className="h-[245px] w-[175px]  bg-no-repeat bg-cover rounded-xl flex justify-end items-start overflow-hidden">
          <img
            alt=""
            src={props.image}
            className="object-cover h-full w-full"
          />
          <div
            className={`w-9 h-9 absolute m-2 flex items-center justify-around rounded-lg text-[#6c5dd4] bg-white cursor-pointer ${
              active ? "!bg-[#6c5dd4] text-[#fff]" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActive(!active);
            }}
          >
            <i className="fa-regular fa-heart"></i>
          </div>
        </div>
        <h1 className="font-bold mt-3">{props.title}</h1>
        {hovered ? (
          <>
            <div className="flex items-baseline my-2">
              <h1 className="text-2xl text-[#6c5dd4] font-bold mr-3">
                ${" "}
                {(props.price - props.price * (props.discount / 100)).toFixed(
                  2
                )}
              </h1>
              <h2 className="line-through text-lg font-semibold text-[#aaaaaa]">
                ${props.price}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{
                scale: 1,
                backgroundColor: "#d4d0fe",
                color: "#6c5dd4",
              }}
              onClick={handleAddToCart}
              className="w-full py-3 font-bold text-sm bg-[#6c5dd4] text-white rounded-lg my-1 mb-3"
            >
              <i className="fa-solid fa-cart-shopping mr-2"></i>
              Add to cart
            </motion.button>
          </>
        ) : (
          <>
            <h2 className="text-xs uppercase text-center text-[#6c5dd4] my-1">
              {props.genre.join(", ")}
            </h2>
            <div className="flex items-center justify-between my-3">
              {stars.map((star) => star)}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

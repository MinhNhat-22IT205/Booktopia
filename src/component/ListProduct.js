import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function ListProduct(props) {
  const [liked, setLiked] = useState(false);
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
    console.log("here");
  };
  return (
    <Link
      to={`/books/${props.id}`}
      className="p-3 border rounded-xl flex justify-between my-3 hover:shadow-xl hover:shadow-[#d4d0fe]"
    >
      <img className="h-[245px] w-[175px] rounded-xl" src={props.link} alt="" />
      <div className="relative flex flex-col justify-center w-full ml-8 mr-5">
        <div className="absolute right-0 top-0">
          <div className="flex items-center justify-between my-3">
            {stars.map((star) => star)}
          </div>
          <div className="flex items-baseline justify-end -mt-2">
            <h1 className="font-bold text-lg">{props.star}.0</h1>
            <h3 className="text-xs ml-2 text-[#aaaaaa]">235 Reviews</h3>
          </div>
        </div>
        <h1 className="font-bold text-2xl">{props.title}</h1>
        <h2 className="uppercase text-[#6c5dd4] my-2 text-xs">{props.genre}</h2>
        <p className="font-poppins text-xs text-[#6d6d6d]">{props.des}</p>
        <div className="flex items-baseline my-4">
          <h1 className="font-bold text-2xl">$ {props.price}</h1>
          <h2 className="font-semibold line-through text-[#aaaaaa] ml-3">
            ${props.oldPrice}
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#aaaaaa] text-sm">Writen by</h3>
              <h1 className="text-lg font-semibold">{props.author}</h1>
            </div>
            <div className="mx-10">
              <h3 className="text-[#aaaaaa] text-sm">Publisher</h3>
              <h1 className="text-lg font-semibold">{props.publisher}</h1>
            </div>
            <div>
              <h3 className="text-[#aaaaaa] text-sm">Year</h3>
              <h1 className="text-lg font-semibold">{props.year}</h1>
            </div>
          </div>
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{
                scale: 1,
                backgroundColor: "#d4d0fe",
                color: "#6c5dd4",
              }}
              onClick={handleAddToCart}
              className="px-10 py-3 rounded-xl font-bold text-white bg-[#6c5dd4]"
            >
              <i className="fa-solid fa-cart-shopping mr-2"></i>Add to cart
            </motion.button>
            <div
              className={`w-12 h-12 ml-2 border flex items-center justify-around rounded-xl text-[#6c5dd4] bg-white cursor-pointer ${
                liked ? "!bg-[#6c5dd4] text-[#fff]" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
            >
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useRef, useState } from "react";
import CarouselItem1 from "./CarouselItem1";
import { motion } from "framer-motion";
import bookData from "../dt/BookData";
import Slider from "react-slick";
const background = [
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQo6lalD6aQUe7KLFFGVTn_rE-X5Ot9HyZsFnZUQ6Bgn2G0dE4u",
  "https://plus.unsplash.com/premium_photo-1661723331885-5470e9c7c140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
];

export default function BestSeller() {
  const slider = useRef();
  const [index, setIndex] = useState(0);
  const bs = [];
  bookData.forEach((item) => {
    if (item.category.includes("bestseller")) {
      bs.push(item);
    }
  });
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    initialSlide: 0,
  };
  console.log(index);
  function next() {
    slider.current.slickNext();
    if (index === bs.length - 1) {
      setIndex(0);
    } else setIndex(index + 1);
    console.log(index);
  }
  function prev() {
    slider.current.slickPrev();
    if (index === 0) {
      setIndex(bs.length - 1);
    } else setIndex(index - 1);
    console.log(index);
  }
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background[index]})`,
      }}
      className="home-best-seller-container text-center"
    >
      <h1>Best Seller</h1>
      <p>Based sales this week</p>
      <Slider ref={slider} {...settings} className="w-full ">
        {bs.map((item) => (
          <CarouselItem1
            key={item.id}
            id={item.id}
            link={item.link}
            title={item.title}
            genre={item.genre}
            newPrice={item.price}
            oldPrice={item.oldPrice}
          />
        ))}
      </Slider>
      <motion.button
        initial={{ translateY: "-50%" }}
        whileHover={{ scale: 1.2 }}
        className="btn-left-arrow"
        onClick={prev}
      >
        <i className="fa-solid fa-angle-left"></i>
      </motion.button>
      <motion.button
        initial={{ translateY: "-50%" }}
        whileHover={{ scale: 1.2 }}
        className="btn-right-arrow"
        onClick={next}
      >
        <i className="fa-solid fa-angle-right"></i>
      </motion.button>
    </div>
  );
}

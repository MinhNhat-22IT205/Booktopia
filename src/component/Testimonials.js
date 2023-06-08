import Slider from "react-slick";
import Comment from "./Comment";
import { motion } from "framer-motion";
import { useRef } from "react";
import testimonialData from "../dt/TestimonialsData";

export default function Testimonials() {
  const ref = useRef({});
  function next() {
    ref.current.slickNext();
  }
  function previous() {
    ref.current.slickPrev();
  }
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="col-start-2 col-span-11 py-10">
      <div className="flex justify-between items-center">
        <div className="w-2/4">
          <h1 className="text-4xl font-bold">Testimonials</h1>
          <p className=" opacity-60 mb-8 mt-3">
            We are delighted to have such satisfied customers who have chosen
            our books, and we truly value their loyalty and support of our
            business.
          </p>
        </div>
        <div className="flex mr-32">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={previous}
            className="booksonsale-leftright-btn"
          >
            <i className="fa-solid fa-angle-left"></i>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={next}
            className="booksonsale-leftright-btn"
          >
            <i className="fa-solid fa-angle-right"></i>
          </motion.button>
        </div>
      </div>
      <Slider ref={ref} {...settings}>
        {testimonialData.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            star={comment.star}
            comment={comment.comment}
            link={comment.link}
            name={comment.name}
          />
        ))}
      </Slider>
    </div>
  );
}

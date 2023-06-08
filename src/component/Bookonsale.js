import { Component, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem2 from "./CarouselItem2";
import { motion } from "framer-motion";
import Slider from "react-slick";
import bookData from "../dt/BookData";
export default function Bookonsale() {
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
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 3500,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="booksonsale">
      <div className="booksonsale-header">
        <h1 className="font-bold">Books on Sales</h1>
        <div className="booksonsale-header-nav">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={previous}
            className="booksonsale-leftright-btn"
          >
            <i className="fa-solid fa-angle-left"></i>
          </motion.button>
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
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

      <Slider
        customPaging={(i) => (
          <div style={{ position: "absolute", width: "100%", opacity: 0 }}>
            i
          </div>
        )}
        dotsClass="slick-dots dots"
        ref={ref}
        {...settings}
      >
        {bookData.map(
          (item) =>
            item.category.includes("bookonsale") && (
              <CarouselItem2
                key={item.id}
                id={item.id}
                discount={item.discount}
                link={item.link}
                title={item.title}
                genre={item.genre}
                rating={item.rating}
                oldPrice={item.oldPrice}
                newPrice={item.newPrice}
              />
            )
        )}
      </Slider>
    </div>
  );
}

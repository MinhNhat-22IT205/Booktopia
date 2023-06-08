import Slider from "react-slick";
import CarouselItem3 from "./CarouselItem3";
import bookData from "../dt/BookData";
export default function FeatureBook() {
  var settings = {
    dots: true,
    arrows: false,
    speed: 500,
    infinity: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    centerMode: true,
    variableWidth: true,
    centerPadding: 0,
  };
  return (
    <div className="col-span-12  py-10 bg-[#f2f0fe]">
      <div className="w-2/4 text-center mx-auto">
        <h1 className="text-4xl font-bold ">Featured Product</h1>
        <p className="opacity-60 mt-5 mb-2">
          Our books are carefully curated to provide our visitors with a diverse
          selection of popular titles and new releases. Each book is guaranteed
          to provide readers with a fulfilling and enjoyable reading experience.
        </p>
      </div>
      <div className="w-full">
        <Slider {...settings}>
          {bookData.map(
            (item) =>
              item.category.includes("featuredbook") && (
                <CarouselItem3
                  key={item.id}
                  id={item.id}
                  link={item.link}
                  title={item.title}
                  author={item.author}
                  genre={item.genre}
                  des={item.des}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  discount={item.discount}
                />
              )
          )}
        </Slider>
      </div>
    </div>
  );
}

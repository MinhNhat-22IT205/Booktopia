export default function CarouselItem2(props) {
  return (
    <div className="cavoursel2 ">
      <div className="cavoursel2-img relative !pt-0 overflow-hidden shadow-sm shadow-[#000]/30">
        <img className="" alt="" src={props.link} />
        <div>
          <h1 className="text-xl bg-[#ff764c] py-1 px-3 rounded-l-lg absolute top-3 right-0 font-semibold">
            {props.discount}%
          </h1>
        </div>
      </div>
      <h2 className="font-bold text-lg">{props.title}</h2>
      <p className="text-xs text-[#6c5dd4] mb-[0.5rem]">{props.genre}</p>
      <div className="flex justify-between items-center">
        <h3 className="text-[#ff764c] font-semibold">
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          {props.rating}
        </h3>
        <div className="flex items-center">
          <h3 className="font-bold text-lg">{"$" + props.newPrice}</h3>
          <span className="text-sm ml-1 opacity-50 line-through font-semibold">
            {"$" + props.oldPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

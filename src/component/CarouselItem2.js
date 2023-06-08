export default function CarouselItem2(props) {
  return (
    <div className="cavoursel2">
      <div
        style={{ backgroundImage: `url(${props.link})` }}
        className="cavoursel2-img"
      >
        <div>
          <h1 className="text-xl font-semibold">{props.discount}</h1>
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

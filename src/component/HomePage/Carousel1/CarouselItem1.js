export default function CarouselItem1(props) {
  return (
    <div className="carouselItem1 ">
      <img
        className="shadow-lg shadow-[#000]/30 "
        alt=""
        src={props.link}
      ></img>
      <p className="carouselItem1-title ">{props.title}</p>
      <p className="carouselItem1-genre uppercase">{props.genre}</p>
      <div className="carouselItem1-price !mt-4 ">
        <h4 className="text-sm line-through opacity-50">{props.oldPrice}</h4>
        <h4 className="font-bold ">{"USD " + props.newPrice}</h4>
      </div>
    </div>
  );
}

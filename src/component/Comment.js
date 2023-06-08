export default function Comment(props) {
  var star = props.star;
  var stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < star) {
      stars.push(<i className="fa-solid fa-star text-[#6c5dd4]"></i>);
    } else {
      stars.push(<i className="fa-solid fa-star text-[#d4d0fe]"></i>);
    }
  }
  return (
    <div className="max-w-[400px] bg-[#f7f5f4] rounded-xl px-10 py-5">
      <div className="flex mt-2">{stars.map((star) => star)}</div>
      <h2 className="opacity-80 my-4">{props.comment}</h2>
      <div className="flex items-center ">
        <img
          className="w-[62px] rounded-full border-2 border-[#fff] "
          alt=""
          src={props.link}
        ></img>
        <div className="ml-5">
          <h2 className="font-bold text-lg">{props.name}</h2>
          <h3 className="opacity-60">Book Lover</h3>
        </div>
      </div>
    </div>
  );
}

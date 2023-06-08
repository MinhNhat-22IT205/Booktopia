export default function Mission(props) {
  return (
    <div className="text-2xl px-10 py-10 bg-white rounded-2xl shadow-lg shadow-[#6c5dd4]">
      {props.icon}
      <h1 className="font-bold text-3xl mt-3">{props.title}</h1>
      <p className="opacity-60 my-3">{props.des}</p>
      <h2 className="font-semibold text-xl text-[#6c5dd4]">
        Learn more {">>"}
      </h2>
    </div>
  );
}

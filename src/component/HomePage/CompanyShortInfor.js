export default function CompanyShortInfor(props) {
  return (
    <div className="home-short-infor">
      <div className="home-short-infor-icon shadow-md shadow-[#000]/20">
        {props.i}
      </div>
      <div className="home-short-infor-des">
        <h3 className="font-bold">{props.feature}</h3>
        <p>{props.des}</p>
      </div>
    </div>
  );
}

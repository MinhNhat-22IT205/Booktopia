import Mission from "../component/Mission";
import NumberCounter from "../component/NumberCounter";
import About from "../component/About";
import OurMission from "../component/OurMission";
export default function AboutUs() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-[10px] mb-10 pt-3">
        <h3 className="col-start-2 col-span-10 text-[#6c5dd4] font-poppins text-lg font-bold my-5 ">
          Home&nbsp;/&nbsp;
          <span className="text-[#000] font-poppins text-lg font-bold opacity-40">
            &nbsp;About
          </span>
        </h3>
        <div className="col-start-2 col-span-10 flex lg:scale-100 scale-90  lg:flex-row flex-col justify-between  my-5">
          <About />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[10px] bg-[#f1eeff] ">
        <div className="col-start-2 col-span-10 py-12">
          <OurMission />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[10px] my-24">
        <NumberCounter />
      </div>
    </div>
  );
}

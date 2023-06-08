export default function About() {
  return (
    <>
      <div className="flex relative min-w-[700px]">
        <div>
          <img
            className="w-[274px] mr-5 rounded-lg mb-20"
            alt=""
            src="https://bookland.dexignzone.com/xhtml/images/about/about1.jpg"
          ></img>
        </div>
        <div>
          <img
            className="w-[274px] mr-5 rounded-lg mb-7"
            alt=""
            src="https://bookland.dexignzone.com/xhtml/images/about/about2.jpg"
          ></img>
          <div className=" flex absolute left-[150px]">
            <div className="w-[167px] h-[167px] rounded-xl bg-[#6c5dd4] p-5">
              <h1 className="font-bold text-6xl text-white pb-3">5+</h1>
              <h2 className="font-poppins text-xl text-white">
                Years of Experience
              </h2>
            </div>
            <ul className="my-auto ml-6">
              <li className="before:content-['✓'] before:text-[#6c5dd4] before:mr-2 font-poppins text-[#777789] before:font-bold my-2">
                Comics & Graphics
              </li>
              <li className="before:content-['✓'] before:text-[#6c5dd4] before:mr-2 font-poppins text-[#777789] before:font-bold my-2">
                Biography
              </li>
              <li className="before:content-['✓'] before:text-[#6c5dd4] before:mr-2 font-poppins text-[#777789] before:font-bold my-2">
                Literary Collections
              </li>
              <li className="before:content-['✓'] before:text-[#6c5dd4] before:mr-2 font-poppins text-[#777789] before:font-bold my-2">
                Childrem Fiction
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-auto max-w-[550px]">
        <h1 className="font-bold text-5xl ">
          Booktopia Is Best Choice For Learners
        </h1>
        <p className="opacity-50 font-poppins my-8">
          Discover a wonderland of words at Booktopia. Handpicked books,
          unbeatable prices, and fast shipping. Join the community and ignite
          your passion for reading. Your next great read is just a click away!
        </p>
        <button className="bg-[#6c5dd4] text-[#fff] font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-[#6c5dd4]">
          Contact Us
        </button>
      </div>
    </>
  );
}

export default function NumberCounter() {
  return (
    <div className="col-start-2 col-span-10 grid grid-cols-4 text-center py-20">
      <div>
        <i className="fa-solid fa-users icon-cell border-dashed border-4 border-[#6c5dd4] rounded-lg text-6xl px-3 py-3 text-[#6c5dd4]"></i>
        <h1 className="font-bold text-3xl my-2">125,663</h1>
        <h3 className=" text-base opacity-60">Happy Customers</h3>
      </div>
      <div>
        <i className="fa-solid fa-book icon-cell  border-dashed border-4 border-[#6c5dd4] rounded-lg text-6xl px-3 py-3 text-[#6c5dd4]"></i>
        <h1 className="font-bold text-3xl my-2">50,673</h1>
        <h3 className=" text-base opacity-60">Book Collections</h3>
      </div>
      <div>
        <i className="fa-solid fa-store icon-cell  border-dashed border-4 border-[#6c5dd4] rounded-lg text-6xl px-3 py-3 text-[#6c5dd4]"></i>
        <h1 className="font-bold text-3xl my-2">5</h1>
        <h3 className=" text-base opacity-60">Our Stores</h3>
      </div>
      <div>
        <i className="fa-solid fa-leaf icon-cell  border-dashed border-4 border-[#6c5dd4] rounded-lg text-6xl px-3 py-3 text-[#6c5dd4]"></i>
        <h1 className="font-bold text-3xl my-2">457</h1>
        <h3 className=" text-base opacity-60">Famous Writers</h3>
      </div>
    </div>
  );
}

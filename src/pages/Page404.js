import React from "react";

export default function Page404() {
  return (
    <div className="text-center h-[90vh] flex flex-col items-center justify-end">
      <h1 className="font-extrabold text-9xl text-[#373a42]">
        <span className="text-9xl text-[#5d60e7] font-normal">- </span>
        404 <span className="text-9xl text-[#5d60e7] font-normal">-</span>
      </h1>
      <p className="text-lg my-2 mb-11">uh-oh! Page not found</p>
      <img className="mx-auto" alt="" src="https://i.imgur.com/NdNf7ly.png" />
    </div>
  );
}

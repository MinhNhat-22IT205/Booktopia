import React from "react";

const QuantityCountItem = (props) => {
  return (
    <div class="col-span-12 sm:col-span-6 xl:col-span-4 bg-white rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl intro-y">
      <div class="">
        <div class="box p-5">
          <div class="flex">
            {props.svg}
            <div class="ml-auto">
              <div class="flex items-center gap-1 rounded-full bg-green-400 font-medium text-white  px-2 py-1 font-roboto bg-theme-9 tooltip cursor-pointer">
                {" "}
                {props.percentage}%{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-up w-4 h-4"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>{" "}
              </div>
            </div>
          </div>
          <div class="text-3xl font-bold leading-8 mt-6">{props.count}</div>
          <div class="text-base text-gray-600 mt-1">{props.name}</div>
        </div>
      </div>
    </div>
  );
};

export default QuantityCountItem;

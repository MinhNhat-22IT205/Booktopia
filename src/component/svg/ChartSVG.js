import React from "react";

const ChartSVG = () => {
  return (
    <svg
      class="h-4 w-4 text-current"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" />{" "}
      <line x1="4" y1="19" x2="20" y2="19" />{" "}
      <polyline points="4 15 8 9 12 11 16 6 20 10" />
    </svg>
  );
};

export default ChartSVG;

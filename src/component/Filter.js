import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Button, Slider } from "@mui/material";
import { styled } from "@mui/system";
const CustomSlide = styled(Slider)({
  "& .MuiSlider-valueLabel": {
    color: "#6c5dd4",
    backgroundColor: "#f1eeff",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
  },
  "& .MuiSlider-rail": {
    color: "#6c5dd4",
  },
  "& .MuiSlider-thumb": {
    color: "#6c5dd4",
  },
  "& .MuiSlider-track": {
    color: "#6c5dd4",
  },
});
export default function Filter() {
  const [value, setValue] = useState([20, 37]);
  const [dropDown, setDropDown] = useState({
    category: false,
    year: false,
    price: false,
  });
  const setdropdownState = (dropdownName, value) => {
    setDropDown((prevState) => ({ ...prevState, [dropdownName]: value }));
    console.log(dropDown.category);
  };
  const valueLabelFormat = (value) => {
    return `$${value}`;
  };
  const show = {
    display: "grid",
    // gridTemplateRows: "1fr",
    height: "auto",
    borderTop: "1px solid #e5e7eb",
    opacity: 1,
    transitionEnd: {},
  };

  const hide = {
    // gridTemplateRows: "0fr",
    height: 0,
    padding: 0,
    borderTop: 0,
    transitionEnd: {
      display: "none",
      opacity: 0,
    },
  };
  return (
    <div className="w-[290px]">
      <h1 className="font-bold text-3xl mb-5">Filter Option</h1>
      {/* CATEGORY */}
      <div className="rounded-xl border w-[290px]">
        <div
          className="flex justify-between px-6 py-5 items-center  cursor-pointer "
          onClick={() => setdropdownState("category", !dropDown.category)}
        >
          <h1 className="font-semibold text-lg">Shop by Category</h1>
          <i
            className={
              dropDown.category
                ? "fa-solid fa-angle-up rotate-0 text-[#6c5dd4] transition-all duration-200"
                : "fa-solid fa-angle-up rotate-180 transition-all duration-200"
            }
          ></i>
        </div>
        <motion.div
          animate={dropDown.category ? show : hide}
          className="grid grid-cols-2 py-6 px-1 overflow-hidden"
        >
          <div>
            <input
              className="cursor-pointer  mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="action"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="action"
            >
              Action
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="fantasy"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="fantasy"
            >
              Fantasy
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="adventure"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="adventure"
            >
              Adventure
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="History"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="History"
            >
              History
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Animation"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Animation"
            >
              Animation
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Horror"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Horror"
            >
              Horror
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Biography"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Biography"
            >
              Biography
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Mystery"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Mystery"
            >
              Mystery
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Comedy"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Comedy"
            >
              Comedy
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Romance"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Romance"
            >
              Romance
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Crime"
            ></input>
            <label className="font-[500] font-poppins text-sm " htmlFor="Crime">
              Crime
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Sci-fi"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Sci-fi"
            >
              Sci-fi
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Documentary"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Documentary"
            >
              Documentary
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Sport"
            ></input>
            <label className="font-[500] font-poppins text-sm " htmlFor="Sport">
              Sport
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Design"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Design"
            >
              Design
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="Science"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="Science"
            >
              Science
            </label>
          </div>
        </motion.div>
      </div>
      {/* SELECT YEAR */}
      <div className="rounded-xl border w-[290px] mt-3">
        <div
          className="flex justify-between px-6 py-5 items-center  cursor-pointer "
          onClick={() => setdropdownState("year", !dropDown.year)}
        >
          <h1 className="font-semibold text-lg">Select Year</h1>
          <i
            className={
              dropDown.year
                ? "fa-solid fa-angle-up rotate-0 text-[#6c5dd4] transition-all duration-200"
                : "fa-solid fa-angle-up rotate-180 transition-all duration-200"
            }
          ></i>
        </div>
        <motion.div
          animate={dropDown.year ? show : hide}
          className="grid grid-cols-2 py-5 px-1 overflow-hidden"
        >
          <div>
            <input
              className="cursor-pointer  mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1action"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1action"
            >
              2023
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1fantasy"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1fantasy"
            >
              2022
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1adventure"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1adventure"
            >
              2021
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1History"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1History"
            >
              2020
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Animation"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Animation"
            >
              2019
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Horror"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Horror"
            >
              2018
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Biography"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Biography"
            >
              2017
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Mystery"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Mystery"
            >
              2016
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Comedy"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Comedy"
            >
              2015
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Romance"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Romance"
            >
              2014
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="2013"
            ></input>
            <label className="font-[500] font-poppins text-sm " htmlFor="2013">
              2013
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Sci-fi"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Sci-fi"
            >
              2012
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Documentary"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Documentary"
            >
              2011
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Sport"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Sport"
            >
              2010
            </label>{" "}
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="1Design"
            ></input>
            <label
              className="font-[500] font-poppins text-sm "
              htmlFor="1Design"
            >
              2009
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="2008"
            ></input>
            <label className="font-[500] font-poppins text-sm " htmlFor="2008">
              2008
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="2007"
            ></input>
            <label className="font-[500] font-poppins text-sm " htmlFor="2007">
              2007
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="2006"
            ></input>
            <label className="font-[500] font-poppins text-sm " htmlFor="2006">
              2006
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="2005"
            ></input>
            <label className="font-[500] font-poppins text-sm " htmlFor="2005">
              2005
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer mr-2 ml-4 accent-[#6c5dd4] w-4 h-4 mb-3"
              type="checkbox"
              id="2004"
            ></input>
            <label className="font-[500] font-poppins text-sm " htmlFor="2004">
              2004
            </label>
          </div>
        </motion.div>
      </div>
      <div className="rounded-xl border w-[290px] mt-3">
        <div
          className="flex justify-between px-6 py-5 items-center  cursor-pointer "
          onClick={() => setdropdownState("price", !dropDown.price)}
        >
          <h1 className="font-semibold text-lg">Price Range</h1>
          <i
            className={
              dropDown.price
                ? "fa-solid fa-angle-up rotate-0 text-[#6c5dd4] transition-all duration-200"
                : "fa-solid fa-angle-up rotate-180 transition-all duration-200"
            }
          ></i>
        </div>
        <motion.div
          max={500}
          animate={dropDown.price ? show : hide}
          className="overflow-hidden"
        >
          <Box className="w-[200px] mx-auto mt-14 mb-2">
            <CustomSlide
              // className="m-5"
              value={value}
              getAriaLabel={() => "Temperature range"}
              valueLabelDisplay="on"
              valueLabelFormat={valueLabelFormat}
              max={500}
              onChange={(e, value) => {
                setValue(value);
              }}
            ></CustomSlide>
          </Box>
        </motion.div>
      </div>
      <Button
        className="!bg-[#6c5dd4] !normal-case !font-semibold !w-full !py-3 !rounded-lg !mt-8 !mb-3"
        variant="contained"
      >
        Refine Search
      </Button>
      <br></br>
      <Button
        className="!border !border-[#e5e7eb] !text-[#aaaaaa] !normal-case !font-semibold !w-full !py-2.5 !rounded-lg"
        variant="outlined"
      >
        Reset Filter
      </Button>
    </div>
  );
}

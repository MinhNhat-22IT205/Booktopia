import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Button, Slider } from "@mui/material";
import { styled } from "@mui/system";
import MultiDropdownSelect from "../UI/MultiDropdownSelect";
import useForm from "../../shared/hook/useForm";
import useHttp from "../../shared/hook/useHttp";
import { useNavigate } from "react-router-dom";
const genres = [
  "Action",
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Horror",
  "Historical Fiction",
  "Biography",
  "Autobiography",
  "Self-Help",
  "Business",
  "History",
  "Travel",
  "Cooking",
  "Young Adult",
  "Children",
  "Poetry",
  "Drama",
  "Comedy",
  "Action and Adventure",
  "Science",
  "Religion",
  "Philosophy",
  "Art",
  "Sports",
  "Parenting",
  "Education",
  "Health and Fitness",
  "Psychology",
  "Technology",
  "Reference",
  "Graphic Novels",
  "Comics",
  "Magazines",
  "Short Stories",
  "Essays",
  "Anthology",
  "Classic",
  "Historical",
  "Contemporary",
  "Literary Fiction",
  "Crime",
  "Dystopian",
  "Urban Fantasy",
  "Paranormal",
  "Supernatural",
  "Psychological Thriller",
  "Political",
  "Science",
  "Space Opera",
  "Cyberpunk",
  "Post-Apocalyptic",
  "Steampunk",
  "Western",
  "Magical Realism",
  "Gothic",
  "Time Travel",
  "Chick Lit",
  "Urban Fiction",
  "Satire",
  "Humor",
  "Memoir",
  "True Crime",
  "Travelogue",
  "Artificial Intelligence",
  "Environmental",
  "Sociology",
  "Economics",
  "Anthropology",
  "Philosophy of Mind",
  "Spirituality",
  "Mythology",
  "Fairy Tales",
  "Graphic Design",
  "Crafts and Hobbies",
  "Fashion",
  "Sports Memoir",
  "Fitness",
  "Nutrition",
  "Cognitive Science",
  "Computer Science",
  "Data Science",
  "Software Development",
  "Web Development",
];
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1999 },
  (_, index) => currentYear - index + ""
);
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
export default function Filter(props) {
  const [value, setValue] = useState([20, 37]);
  const nav = useNavigate();
  const [dropDown, setDropDown] = useState({
    category: false,
    price: false,
  });
  const { data, memoizedSetData, errors, isValid } = useForm(
    {
      category: "",
      price: "",
    },
    (values) => {
      return [];
    }
  );
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

  const submit = () => {
    props.setFilter1(data);
  };
  const resetFilter = () => {
    window.location.reload();
  };
  return (
    <div className="w-[290px]">
      <h1 className="font-bold text-3xl mb-5">Filter Option</h1>
      {/* CATEGORY */}
      <div className="rounded-xl border w-[290px] shadow-md shadow-[#000]/5">
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
          className=" py-6 px-2 overflow-hidden"
        >
          <MultiDropdownSelect
            label=""
            type="input"
            name="category"
            required={true}
            setData={memoizedSetData}
            errors={errors}
            chooseData={genres}
            className="border w-80 mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
          />
          {/* {genres.map((genre) => (
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
                {genre}
              </label>
            </div>
          ))} */}
        </motion.div>
      </div>
      {/* SELECT YEAR */}
      {/* <div className="rounded-xl shadow-md shadow-[#000]/5 border w-[290px] mt-3">
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
          className=" py-5 px-2 overflow-hidden"
        >
          <MultiDropdownSelect
            label=""
            type="input"
            name="createYear"
            required={true}
            setData={memoizedSetData}
            errors={errors}
            chooseData={years}
            className="border w-80 mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
          />
        </motion.div>
      </div> */}
      <div className="rounded-xl shadow-md shadow-[#000]/5 border w-[290px] mt-3">
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
              max={1000}
              onChange={(e, value) => {
                setValue(value);
                memoizedSetData("price", value);
              }}
            ></CustomSlide>
          </Box>
        </motion.div>
      </div>
      <Button
        className="!bg-[#6c5dd4] !normal-case !font-semibold !w-full !py-3 !rounded-lg !mt-8 !mb-3"
        variant="contained"
        onClick={submit}
      >
        Refine Search
      </Button>
      <br></br>
      <Button
        className="!border !border-[#e5e7eb] !text-[#aaaaaa] !normal-case !font-semibold !w-full !py-2.5 !rounded-lg"
        variant="outlined"
        onClick={resetFilter}
      >
        Reset Filter
      </Button>
    </div>
  );
}

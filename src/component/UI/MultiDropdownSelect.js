import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import XSVG from "../svg/XSVG";

function MuliDropdownSelect({
  label,
  errors,
  type,
  name,
  setData,
  initialValue = [],
  chooseData = [],
  ...otherProps
}) {
  const [input, setInput] = useState(initialValue);
  const [searchValue, setSearchValue] = useState("");
  const [initial, setInitial] = useState(true);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    });
  }, []);
  useEffect(() => {
    setData(name, input);
  }, [input, name, setData]);
  function blur(e) {
    console.log("blur");
    setInitial(false);
  }
  const inputProps = {
    id: name,
    name,
    onBlur: blur,
    type,
    ...otherProps,
    style: {
      borderColor: `${errors[name] && initial === false ? "red" : "black"}`,
      outline: "none",
    },
  };
  const addNewItem = (item) => {
    setInput((prev) => [...prev, item]);
  };
  const handleDelete = (i) => {
    const inputValue = [...input];
    inputValue.splice(i, 1);
    setInput(inputValue);
    setData(name, inputValue);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addNewItem(event.target.value);
    }
  };
  return (
    <>
      <div className="flex gap-5">
        <label htmlFor={name} className="font-semibold ">
          {label}
        </label>
      </div>
      <div
        onClick={() => {
          blur();
          setOpen(true);
        }}
        className="flex flex-wrap items-center gap-2 p-1.5 border rounded-lg min-h-[40px]"
      >
        {input.map((item, index) => (
          <div
            onClick={() => handleDelete(index)}
            className="flex cursor-pointer items-center gap-1 bg-gray-200 px-2 py-0.5 rounded-md"
          >
            <p className="text-gray-600 h-fit">{item}</p>
            <button type="button" className="text-gray-600">
              <XSVG />
            </button>
          </div>
        ))}
      </div>
      {open && (
        <div ref={ref} className=" border rounded-md w-full mt-2 shadow-md">
          <div className="m-1.5">
            <input
              placeholder="Click here to search..."
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onKeyDown={handleKeyDown}
              className=" border rounded-sm w-full px-2 py-1 focus:ring focus:outline-none"
            />
          </div>

          <hr />
          <div className="w-full max-h-[300px] overflow-y-scroll">
            {chooseData.map((item, index) => {
              if (
                !input.includes(item) &&
                item.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return (
                  <div
                    className="w-full px-4 py-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => addNewItem(item)}
                  >
                    {item}
                  </div>
                );
              } else return <></>;
            })}
          </div>
        </div>
      )}

      {errors[name] && initial === false && (
        <p className="text-red-600 ml-[16px]">{errors[name]}</p>
      )}
    </>
  );
}
export default React.memo(MuliDropdownSelect);

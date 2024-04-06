import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function DynamicInput({
  label,
  errors,
  type,
  name,
  setData,
  initialValue = [""],
  ...otherProps
}) {
  const [input, setInput] = useState(initialValue);
  const [initial, setInitial] = useState(true);

  function change(e, i) {
    const value = e.target.value;
    const inputValue = [...input];
    inputValue[i] = value;
    setInput(inputValue);
  }
  useEffect(() => {
    setData(name, input);
  }, [input]);
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
  const addNewField = () => {
    setInput((prev) => [...prev, ""]);
    console.log(input);
    // const curData = data[name];
    // const newDataFormat = curData.push(" ");
    // setData(name, newDataFormat);
  };
  const handleDelete = (i) => {
    const inputValue = [...input];
    inputValue.splice(i, 1);
    setInput(inputValue);
    setData(name, inputValue);
  };
  return (
    <>
      <div className="flex gap-5">
        <label htmlFor={name} className="font-semibold ">
          {label}
        </label>
        <motion.button
          type="button"
          className="px-[9px] pb-0.5 rounded-full border text-[#9ca3af] transition-all"
          whileHover={{ backgroundColor: "rgb(235, 235, 235)", scale: 1.5 }}
          onClick={addNewField}
        >
          +
        </motion.button>
      </div>
      {input.map((value, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={value.replace(/,/g, "")}
            onChange={(e) => change(e, index)}
            {...inputProps}
          />
          {index !== 0 && (
            <motion.button
              type="button"
              className="px-[17.5px] rounded-lg font-bold mt-2 mb-3.5 bg-gray-300"
              onClick={() => handleDelete(index)}
              whileHover={{
                backgroundColor: "rgb(240, 74, 74)",
                color: "rgb(255,255,255)",
                scale: 1.1,
              }}
            >
              X
            </motion.button>
          )}
        </div>
      ))}

      {errors[name] && initial === false && (
        <p className="text-red-600 ml-[16px]">{errors[name]}</p>
      )}
    </>
  );
}
export default React.memo(DynamicInput);

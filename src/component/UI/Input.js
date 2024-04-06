import React, { useEffect, useState } from "react";

function Input({
  label,
  tagType,
  errors,
  type,
  flex,
  gap,
  errorStyle,
  name,
  setData,
  initialValue = "",
  ...otherProps
}) {
  const [input, setInput] = useState(initialValue);
  const [initial, setInitial] = useState(true);
  const inputType = tagType === "textarea" ? "textarea" : "input";

  function change(e) {
    const value = e.target.value;
    setInput((prev) => value);
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
    onChange: change,
    onBlur: blur,
    value: input,
    type,
    ...otherProps,
    style: {
      borderColor: `${errors[name] && initial === false ? "red" : "black"}`,
      outline: "none",
    },
  };
  return (
    <>
      <div className={`${flex === true && "flex"} gap-${gap}`}>
        <label htmlFor={name} className="font-semibold text-[#44546e]">
          {label}
        </label>
        {React.createElement(inputType, inputProps)}
      </div>
      {errors[name] && initial === false && (
        <p className={"text-red-600 ml-[16px] " + errorStyle}>{errors[name]}</p>
      )}
    </>
  );
}
export default React.memo(Input);

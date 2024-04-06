import React, { useState } from "react";

function Input({ label, tagType, errors, type, name, setData, ...otherProps }) {
  const [input, setInput] = useState("");
  const [initial, setInitial] = useState(true);
  const inputType = tagType === "textarea" ? "textarea" : "input";

  function change(e) {
    const value = e.target.value;
    setInput((prev) => value);
    setData(name, value);
  }
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
    // style: {
    //   borderColor: `${errors[name] && initial === false ? "red" : "black"}`,
    //   outline: "none",
    // },
  };
  return (
    <>
      <div className="inputBox !mt-6">
        {React.createElement(inputType, inputProps)}
        <span>{label}</span>
        <i
          className={`${
            errors[name] && initial === false && "border border-red-600"
          }`}
        ></i>
      </div>
      {errors[name] && initial === false && (
        <p className="text-red-600 ml-[16px]">{errors[name]}</p>
      )}
    </>
  );
}
export default React.memo(Input);

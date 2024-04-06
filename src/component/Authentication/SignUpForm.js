import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useForm from "../../shared/hook/useForm";
import AuthenInput from "../UI/AuthenInput";
import { notificationAction } from "../../shared/store/notification";
import { signup } from "../../shared/store/user";

const validator = (values) => {
  let errors = {};
  if (!values.username) {
    errors.username = "This field cannot be empty";
  } else if (values.username?.length < 4) {
    errors.username = "Name length should be greater than 3";
  } else if (/\d/.test(values.username)) {
    errors.username = "Name should not contain number";
  }
  if (!values.email) {
    errors.email = "This feild cannot be empty";
  } else if (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    ) === false
  ) {
    errors.email = "Please enter the valid email";
  }
  if (!values.password) {
    errors.password = "This field cannot be empty";
  } else if (values.password?.length < 6) {
    errors.password = "Password must be above 5 chracters";
  }
  if (!values.repeatPassword) {
    errors.repeatPassword = "This field cannot be empty";
  }
  return errors;
};

export default function Signup(props) {
  const [active, setActive] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { data, memoizedSetData, errors, isValid } = useForm(
    {
      username: null,
      email: null,
      password: null,
      repeatPassword: null,
      avatar: null,
    },
    validator
  );

  useEffect(() => {
    memoizedSetData("avatar", file);
  }, [file]);
  const nextHandler = (e) => {
    e.preventDefault();
    console.log(isValid);
    if (!isValid) {
    } else if (data.password === data.repeatPassword) {
      setActive(true);
    } else {
      console.log("hi");
      dispatch(
        notificationAction.notify({
          message: "Password unmatch! Please confirm your password again",
          status: "error",
        })
      );
    }
  };
  useEffect(() => {
    const page1 = document.querySelector("#page1");
    const page2 = document.querySelector("#page2");
    const inputs = document.querySelectorAll(".inputBox input");
    const next = document.querySelector("#next");
    if (active) {
      page1.classList.add("translate-x-[-420px]");
      page2.classList.remove("translate-x-[420px]");
    } else {
      page1.classList.remove("translate-x-[-420px]");
      page2.classList.add("translate-x-[420px]");
    }
    next.addEventListener("click", () => {
      inputs.forEach((input) => {
        input.reportValidity();
      });
    });
  });

  const submit = (e) => {
    //   id: "user" + Math.random().toString(16).slice(2),
    e.preventDefault();
    console.log(file);
    dispatch(
      signup(
        {
          email: data.email,
          password: data.password,
          avatar: file,
          username: data.username,
        },
        setisLoading,
        props.onClose
      )
    );
  };

  return (
    <div className="signup-box">
      <form onSubmit={submit} className="signup-form">
        <div className="btn-closeAuth" onClick={props.onClose}>
          X
        </div>
        <div
          id="page1"
          className={`absolute mt-4 transition-all duration-200 `}
        >
          <h2 className="!text-3xl">Sign up</h2>
          <p className="!mx-auto opacity-50 mt-2 w-fit">Join us now!</p>
          <AuthenInput
            label="Name"
            type="input"
            name="username"
            required={true}
            setData={memoizedSetData}
            errors={errors}
          />
          <AuthenInput
            label="Email"
            type="input"
            name="email"
            required={true}
            setData={memoizedSetData}
            errors={errors}
          />
          <AuthenInput
            label="Password"
            type="password"
            required={true}
            name="password"
            setData={memoizedSetData}
            errors={errors}
          />
          <AuthenInput
            label="Repeat password"
            type="password"
            required={true}
            name="repeatPassword"
            setData={memoizedSetData}
            errors={errors}
          />
          <div className="flex items-center !pl-7 mt-2">
            <input type="checkbox" className="w-4 h-4"></input>
            <p className="text-sm ml-2 opacity-50 w-3/4 mt-2">
              I agree with the terms of use and privacy policy
            </p>
          </div>
          <button
            id="next"
            type="button"
            className="font-semibold rounded-[5px] text-white py-2.5 px-6 bg-[#6c5dd4] ml-[230px] mt-3"
            onClick={nextHandler}
          >
            Next
          </button>
          {/* <input className="!mt-5" type="submit" value={"Sign up"}></input> */}
        </div>
        <div id="page2" className={`absolute transition-all duration-200 `}>
          <h1 className="text-center my-5 mt-8 mb-12 text-2xl font-bold">
            Create your avatar
          </h1>
          <div
            className={`border-2 w-[250px] rounded-full mx-auto border-[#ebebeb] outline-none font-bold bg-[#fafafb] border-dashed min-h-[250px]  `}
          >
            <div
              className={` w-full ${
                file
                  ? "text-center"
                  : "flex flex-col items-center justify-center h-[250px]"
              }`}
            >
              {!file && (
                <input
                  id="image"
                  type="file"
                  name="avatar"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  className="border-none text-transparent !w-[100px]"
                />
              )}
              <div className="flex gap-2 items-center justify-center flex-wrap">
                {file && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-[250px] h-[250px] object-cover rounded-full"
                    />
                    <span
                      className="absolute top-0 right-0 bg-black/5 font-bold px-3.5 py-1.5 cursor-pointer text-gray-500 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                    >
                      X
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-[80px] w-[300px]">
            <button
              id="back"
              type="button"
              className="font-semibold rounded-[5px] text-white py-2.5 px-8 bg-[#6c5dd4] "
              onClick={() => setActive(false)}
            >
              Back
            </button>
            <input
              className={` !m-0 ${
                isLoading && "!bg-[#d4d0fe] !text-[#6c5dd4]"
              }`}
              type="submit"
              value={isLoading ? "Processing.." : "Sign up"}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../shared/store/user";
import useForm from "../../shared/hook/useForm";
import AuthenInput from "../UI/AuthenInput";
import { useNavigate } from "react-router-dom";

const validator = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "This field cannot be empty";
  } else if (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    ) === false
  ) {
    errors.email = "This seems to be not an email";
  }
  if (!values.password) {
    errors.password = "This field cannot be empty";
  }
  return errors;
};

export default function Login(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { data, memoizedSetData, errors, isValid } = useForm(
    {
      email: null,
      password: null,
    },
    validator
  );

  useEffect(() => {
    const submit = document.querySelector("#submit");
    const inputs = document.querySelectorAll(".inputBox input");
    submit.addEventListener("click", () => {
      inputs.forEach((input) => {
        input.reportValidity();
      });
    });
  }, []);
  function submitHandler(event) {
    event.preventDefault();
    if (isValid) {
      dispatch(
        login(
          {
            email: data.email,
            password: data.password,
          },
          setIsLoading,
          props.onClose,
          nav
        )
      );
    }
  }

  return (
    <div className="login-box" onSubmit={submitHandler}>
      <form className="login-form ">
        <div className="btn-closeAuth" onClick={props.onClose}>
          X
        </div>
        <h2 className="!text-3xl">Sign in</h2>
        <p className="mx-auto mt-2 text-base opacity-50">Welcome back!</p>
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
        <div className="links ml-3">
          <a href="google.com">Forgot Password?</a>
        </div>
        <input
          id="submit"
          className={` mx-3 ${isLoading && "!bg-[#d4d0fe] !text-[#6c5dd4]"}`}
          type="submit"
          value={isLoading ? "Processing.." : "Login"}
        ></input>
      </form>
    </div>
  );
}

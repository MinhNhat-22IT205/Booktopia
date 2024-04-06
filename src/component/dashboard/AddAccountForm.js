import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useForm from "../../shared/hook/useForm";
import Input from "../UI/Input";
import { MenuItem, Select } from "@mui/material";
import { signup } from "../../shared/store/user";
import { useNavigate } from "react-router-dom";

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
  return errors;
};

const AddAccountForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, memoizedSetData, errors, isValid } = useForm(
    {
      username: null,
      email: null,
      password: null,
      isAdmin: "false",
    },
    validator
  );

  const submit = (e) => {
    e.preventDefault();
    console.log(data.isAdmin);
    if (isValid) {
      dispatch(
        signup(
          {
            email: data.email,
            password: data.password,
            username: data.username,
            isAdmin: data.isAdmin,
          },
          setIsLoading,
          props.onClose
        )
      );
    }
  };
  return (
    <div>
      <h1 className="font-poppins my-2 font-semibold">Create Account</h1>
      <hr />
      <br />
      <form onSubmit={submit} action="">
        <Input
          label="Username"
          placeholder="Name here.."
          type="input"
          name="username"
          required={true}
          setData={memoizedSetData}
          errors={errors}
          errorStyle="!ml-1 -mt-2 mb-2"
          className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-4 py-2 rounded-lg outline-none "
        />
        <Input
          label="Email"
          placeholder="Email here.."
          type="input"
          name="email"
          required={true}
          setData={memoizedSetData}
          errors={errors}
          errorStyle="!ml-1 -mt-2 mb-2"
          className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-4 py-2 rounded-lg outline-none "
        />
        <Input
          label="Password"
          placeholder="Password here.."
          type="input"
          name="password"
          required={true}
          setData={memoizedSetData}
          errors={errors}
          errorStyle="!ml-1 -mt-2 mb-2"
          className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-4 py-2 rounded-lg outline-none "
        />
        <select
          className="border rounded-lg p-2 px-2"
          value={data.isAdmin}
          onChange={(e) => memoizedSetData("isAdmin", e.target.value)}
        >
          <option value={false}>User</option>
          <option value={true}>Admin</option>
        </select>
        <br />
        <div className="w-full text-right">
          <button className="bg-[#6c5dd4] hover:scale-105 transition-all w-fit font-bold text-white rounded-lg py-2 px-4">
            {isLoading ? "..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAccountForm;

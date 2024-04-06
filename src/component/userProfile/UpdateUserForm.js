import React, { useRef, useState } from "react";
import useForm from "../../shared/hook/useForm";
import Input from "../UI/Input";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../shared/store/user";

const validator = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "This feild cannot be empty";
  } else if (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    ) === false
  ) {
    errors.email = "Please enter the valid email";
  }
  if (!values.username) {
    errors.username = "This field cannot be empty";
  }
  if (!values.bio) {
    errors.bio = "This field cannot be empty";
  } else if (values.bio?.length < 7) {
    errors.bio = "Bio must be above 6 chracters";
  }
  if (!values.address) {
    errors.address = "This field cannot be empty";
  }
  if (!values.contactNumber) {
    errors.contactNumber = "This field cannot be empty";
  } else if (!/^\d+$/.test(values.contactNumber)) {
    errors.contactNumber = "Phone number must be a bunch of integers";
  }

  return errors;
};

const UpdateUserForm = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(
    user.avatar && "http://localhost:5000/" + user.avatar
  );
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const { data, memoizedSetData, errors, isValid } = useForm(
    {
      username: null,
      email: null,
      address: null,
      bio: null,
      contactNumber: null,
    },
    validator
  );

  const submit = (e) => {
    e.preventDefault();
    if (isValid) {
      let reqData = { ...data };
      if (file && file instanceof File) {
        reqData.avatar = file;
      }
      dispatch(updateUser(user.uid, reqData, user.token, setIsLoading));
    }
  };

  return (
    <div className="px-2 ">
      <h1 className="font-poppins my-2 font-semibold">Display Information</h1>
      <hr />
      <br />
      <form onSubmit={submit} action="" className="flex gap-8">
        <div className="flex flex-col items-center h-fit border rounded-xl py-4 px-6">
          <div
            className={`relative border-2  border-[#ebebeb] mb-2  outline-none font-bold bg-[#fafafb] border-dashed h-32 w-32 rounded-full`}
          >
            <input
              ref={fileInputRef}
              hidden={true}
              name="image"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              className="border-none text-[#aaa]"
            />
            <div className="relative mx-auto gap-2 w-full h-full rounded-full overflow-hidden">
              {file && (
                <img
                  src={
                    file && file instanceof File
                      ? URL.createObjectURL(file)
                      : file
                  }
                  alt=""
                  className="object-cover h-full w-full"
                ></img>
              )}
            </div>
            {file && (
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                }}
                className="absolute -top-4 -right-4 m-3 mx-3 bg-gray-50/80 backdrop-blur-0 rounded-full w-8 h-8 text-center font-bold "
              >
                X
              </button>
            )}
          </div>
          <button
            className="mx-auto w-fit bg-[#f2f0fe] text-[#6c5dd4] px-3 py-1.5 rounded-lg font-bold"
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
            Pick Image
          </button>
        </div>
        <div>
          <Input
            label="Display name"
            placeholder="Name here.."
            type="input"
            name="username"
            required={true}
            initialValue={user.username}
            setData={memoizedSetData}
            errors={errors}
            errorStyle="!ml-1 -mt-2 mb-2"
            className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-4 py-2 rounded-lg outline-none "
          />
          <Input
            label="Bio"
            placeholder="Say somethings about yourself"
            type="input"
            tagType="textarea"
            name="bio"
            required={true}
            initialValue={user.bio}
            setData={memoizedSetData}
            errors={errors}
            errorStyle="!ml-1 -mt-2 mb-2"
            className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-4 py-2 rounded-lg outline-none "
          />
          <Input
            label="Email"
            placeholder="Your email"
            type="input"
            name="email"
            required={true}
            initialValue={user.email}
            setData={memoizedSetData}
            errors={errors}
            errorStyle="!ml-1 -mt-2 mb-2"
            className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-4 py-2 rounded-lg outline-none "
          />
          <Input
            label="Address"
            placeholder="Place where you live"
            type="input"
            name="address"
            required={true}
            initialValue={user.address}
            setData={memoizedSetData}
            errors={errors}
            errorStyle="!ml-1 -mt-2 mb-2"
            className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-4 py-2 rounded-lg outline-none "
          />
          <Input
            label="Phone Number"
            placeholder="0909123456"
            type="input"
            name="contactNumber"
            required={true}
            initialValue={user.contactNumber}
            setData={memoizedSetData}
            errors={errors}
            errorStyle="!ml-1 -mt-2 mb-2"
            className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-4 py-2 rounded-lg outline-none "
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`bg-[#6c5dd4] text-white font-semibold px-4 mr-auto py-2 text-sm rounded-lg ${
              isLoading && "!bg-[#d4d0fe] !text-[#6c5dd4]"
            }`}
          >
            {isLoading ? "Loading.." : "Update"}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;

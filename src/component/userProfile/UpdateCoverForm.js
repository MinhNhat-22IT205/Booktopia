import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { notificationAction } from "../../shared/store/notification";
import { uploadCover } from "../../shared/store/user";

const UpdateCoverForm = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState(
    user.coverImage && "http://localhost:5000/" + user.coverImage
  );
  const fileInputRef = useRef();
  const submit = (e) => {
    e.preventDefault();
    if (file && file instanceof File) {
      dispatch(
        uploadCover(user.uid, { coverImage: file }, user.token, setIsLoading)
      );
    } else {
      dispatch(
        notificationAction.notify({
          message: "No image found or no changes found",
          status: "error",
        })
      );
    }
  };
  return (
    <div className="px-2 ">
      <h1 className="font-poppins my-2 font-semibold">Change Cover</h1>
      <hr />
      <br />
      <form onSubmit={submit} action="" className="flex gap-8">
        <div className="flex flex-col items-center h-fit  py-4 px-6">
          <div
            className={`relative border-2  border-[#ebebeb] mb-2 font-bold bg-[#fafafb] border-dashed h-[200px] w-[500px] rounded-sm`}
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
              className=" "
            />
            {file && (
              <>
                <img
                  src={
                    file && file instanceof File
                      ? URL.createObjectURL(file)
                      : file
                  }
                  alt=""
                  className="object-cover h-full w-full"
                ></img>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                  }}
                  className="absolute -top-6 -right-6 m-3 mx-3 bg-gray-50/80 rounded-full w-8 h-8 text-center font-bold "
                >
                  X
                </button>
              </>
            )}
          </div>
          <button
            className="mx-auto w-fit hover:!px-5 transition-all bg-[#f2f0fe] text-[#6c5dd4] px-3 py-1.5 rounded-lg font-bold"
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
            Pick Image
          </button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`bg-[#6c5dd4] ml-auto text-white font-semibold px-4 py-2 text-sm rounded-lg ${
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

export default UpdateCoverForm;

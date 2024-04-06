import React, { useState } from "react";
import EditSVG from "../svg/EditSVG";
import { Link, useNavigate } from "react-router-dom";
import TrashSVG from "../svg/TrashSVG";
import Modal from "../UI/Modal";
import UpdateUserForm from "./UpdateUserForm";
import useHttp from "../../shared/hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { notificationAction } from "../../shared/store/notification";

const UserTableItem = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { isLoading, fetchData } = useHttp();
  const token = useSelector((state) => state.user.token);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const deleteAccount = async () => {
    try {
      const b = await fetchData(
        `http://localhost:5000/users/${user.id}`,
        "DELETE",
        {
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(
        notificationAction.notify({
          message: "Deleted successfully!",
          status: "success",
        })
      );
      nav(0);
    } catch (er) {
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    }
  };

  return (
    <>
      <tr>
        <td>
          <div className="flex gap-3 items-center mx-5 my-3">
            <img
              className="w-12 h-12 object-cover rounded-full"
              alt=""
              src={"http://localhost:5000/" + user.avatar}
            />
            <h3 className="font-roboto font-medium">{user.username}</h3>
          </div>
        </td>
        <td>
          <p className="mx-auto font-roboto">{user.email}</p>
        </td>
        <td>
          <p className="mx-auto font-roboto">
            {new Date(user.registerDate).toDateString()}
          </p>
        </td>
        <td>
          <p
            className={`mx-auto font-roboto ${
              !user.address && "opacity-70 italic text-lg"
            }`}
          >
            {user.address ? user.address : "null"}
          </p>
        </td>
        <td>
          <p
            className={`mx-auto font-roboto ${
              !user.contactNumber && "opacity-70 italic text-lg"
            }`}
          >
            {user.contactNumber ? user.contactNumber : "null"}
          </p>
        </td>
        <td>
          <p
            className={`${
              user.isAdmin
                ? "bg-yellow-300 text-yellow-700 "
                : "bg-green-300 text-green-700 "
            } w-fit px-3 py-1 rounded-lg font-roboto font-normal mx-auto`}
          >
            {user.isAdmin ? "Admin" : "User"}
          </p>
        </td>
        <td>
          <div className="flex gap-2 ml-7">
            <button
              onClick={(e) => setModalOpen(true)}
              className="bg-blue-500 flex gap-1 px-3 py-1.5 font-semibold text-white rounded-lg"
            >
              <EditSVG />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenConfirmModal(true);
              }}
              className="bg-red-500 flex gap-1 font-semibold px-3 py-1.5 text-white rounded-lg"
            >
              <TrashSVG />
              Delete
            </button>
          </div>
        </td>
      </tr>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <UpdateUserForm user={user} />
        </Modal>
      )}
      {openConfirmModal && (
        <Modal onClose={() => setOpenConfirmModal(false)}>
          <h1 className="font-roboto text-lg pb-2 border-b">
            Delete this account?
          </h1>
          <p className="my-3 mb-4 ">
            Are you sure you want to delete {user.username} ?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpenConfirmModal(false)}
              className="bg-gray-300 py-1.5 px-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteAccount()}
              className="bg-red-500 py-1.5 px-3 text-white rounded-lg"
            >
              {isLoading ? " ... " : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserTableItem;

import React, { useState } from "react";
import TrashSVG from "../svg/TrashSVG";
import EditSVG from "../svg/EditSVG";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../UI/Dropdown";
import Modal from "../UI/Modal";
import BookStatistic from "./BookStatistic";
import ChartSVG from "../svg/ChartSVG";
import EyeSVG from "../svg/EyeSVG";
import useHttp from "../../shared/hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { notificationAction } from "../../shared/store/notification";

const BookCard = ({ item, index, canAdjust }) => {
  const [openStatistic, setOpenStatistic] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { isLoading, fetchData } = useHttp();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const deleteBook = async () => {
    try {
      const b = await fetchData(
        `http://localhost:5000/books/${item.id}`,
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
    <article
      key={index}
      className="relative w-fit mb-8 border rounded-2xl shadow-lg  px-5 py-5"
    >
      <div className="absolute top-3 right-3 scale-110">
        {canAdjust && (
          <Dropdown>
            <Link
              to={`/books/${item.id}`}
              className="transition-all flex gap-1 font-poppins text-sm text-gray-300 hover:text-gray-500 hover:font-bold hover:bg-gray-50 pl-3 pr-12 py-2"
            >
              <EyeSVG />
              Show
            </Link>
            <button
              onClick={() => setOpenStatistic(true)}
              className="transition-all flex gap-1 font-poppins text-sm text-gray-300 hover:text-gray-500 hover:font-bold hover:bg-gray-50 pl-3 pr-12 py-2"
            >
              <ChartSVG />
              Statistic
            </button>
          </Dropdown>
        )}
      </div>
      {openStatistic && (
        <Modal onClose={() => setOpenStatistic(false)}>
          <BookStatistic bid={item.id} />
        </Modal>
      )}
      <Link className="block w-[220px]" to={`/books/${item.id}`}>
        <div className="mx-auto w-fit mb-2 rounded-xl overflow-hidden shadow-inner ">
          <img
            src={"http://localhost:5000/" + item.image}
            className="w-full aspect-[3/4] object-cover"
            alt=""
          />
        </div>
        <div className="w-full px-3">
          <h1 className="font-bold text-lg text-primaryColor">{item.title}</h1>
          <p className="text-[#6c5dd4] uppercase text-sm mb-2 ">
            {item.genre.join(", ")}
          </p>
          <div className="flex justify-between">
            <span className="text-[#fa744b] flex text-lg items-center font-bold gap-1">
              <i className="fa-solid fa-star text-[#fe754b]"></i>
              <h3>4.3</h3>
            </span>
            <span className="flex items-baseline gap-2">
              <h3 className="text-lg font-bold">
                ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
              </h3>
              <p className="text-gray-400 text-md  line-through">
                ${item.price}
              </p>
            </span>
          </div>
          {canAdjust ? (
            <>
              <div className="flex justify-between mt-3.5">
                <button
                  onClick={(e) => e.preventDefault()}
                  className="bg-blue-500 px-3 py-1.5 font-semibold text-white rounded-lg"
                >
                  <Link
                    className=" flex gap-1"
                    to={`/books/${item.id}/update-product`}
                  >
                    <EditSVG />
                    Edit
                  </Link>
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
            </>
          ) : (
            <button className="font-semibold mt-3 w-full px-4 py-2 rounded-lg bg-[#6c5dd4] text-white">
              View more
            </button>
          )}
        </div>
      </Link>
      {openConfirmModal && (
        <Modal onClose={() => setOpenConfirmModal(false)}>
          <h1 className="font-roboto text-lg pb-2 border-b">
            Delete this book?
          </h1>
          <p className="my-3 mb-4 ">
            Are you sure you want to delete {item.title} ?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpenConfirmModal(false)}
              className="bg-gray-300 py-1.5 px-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteBook()}
              className="bg-red-500 py-1.5 px-3 text-white rounded-lg"
            >
              {isLoading ? " ... " : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </article>
  );
};

export default BookCard;

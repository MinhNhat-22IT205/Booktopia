import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportProduct } from "../../shared/store/user";

const OrdersTabRow = ({ item, setData }) => {
  const { uid, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isExporting, setIsExporting] = useState(false);

  const exportHandler = (iid) => {
    dispatch(exportProduct(uid, iid, token, setIsExporting, setData));
  };

  return (
    <tr className=" ">
      <td className="flex items-center justify-between gap-3 w-fit">
        <img
          src={"http://localhost:5000/" + item.book.image}
          alt=""
          className="w-16 h-24 object-cover rounded-lg my-3 ml-5"
        />
        <div>
          <h2 className="font-bold text-lg text-[#1e4060]">
            {item.book.title}
          </h2>
          <p className="text-[#000]/50 font-semibold">
            by{" "}
            <span className="font-bold text-[#6353d1]/80">
              {item.book.author}
            </span>
          </p>
          <p className="text-[#000]/50 font-bold bg-gray-200 rounded-lg px-2 w-fit">
            x{item.quantity}
          </p>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-between gap-3 w-fit">
          <img
            src={"http://localhost:5000/" + item.order_id.user_id.avatar}
            alt=""
            className="w-12 h-12 object-cover rounded-full my-3 ml-5"
          />
          <div>
            <h2 className="font-bold text-[#1e4060]">
              {item.order_id.user_id.username}
            </h2>
            <p className="text-[#000]/50 font-semibold">
              {item.order_id.user_id.email}
            </p>
          </div>
        </div>
      </td>
      <td className="text-[#000]/50 font-semibold">
        {new Date(item.order_id.checkOutDate).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </td>
      <td className="text-[#000]/50 font-semibold">
        {item.order_id.phoneNumber}
      </td>
      <td className="text-[#000]/50 font-semibold">
        <div
          className={`${
            item.status === "Completed" && "!bg-green-200 !text-green-700 "
          }  bg-[#e8e4fa] text-[#6658d1] w-fit font-bold rounded-lg py-1.5 px-3`}
        >
          {item.status}
        </div>
      </td>
      <td className="text-[#000]/50 font-semibold">
        ${" "}
        <span className="text-[#1e4060]">
          {item.quantity * item.book.price}{" "}
        </span>
      </td>
      <td className="text-[#000]/50 font-semibold">
        <button
          disabled={item.status === "Completed"}
          onClick={() => exportHandler(item.id)}
          className={`${
            (item.status === "Completed" || isExporting) &&
            "!bg-[#d4d0fe] !text-[#6c5dd4]"
          } bg-[#6c5dd4] text-white py-2 px-4 rounded-lg ml-5`}
        >
          {item.status !== "Completed"
            ? isExporting
              ? "Processing.."
              : "Export"
            : "Exported"}
        </button>
      </td>
    </tr>
  );
};

export default OrdersTabRow;

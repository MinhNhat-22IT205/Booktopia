import React, { useState } from "react";
import OrderItem from "./OrderItem";
import Modal from "../UI/Modal";

export default function Order({ order, index }) {
  const [viewDetail, setViewDetail] = useState(false);
  const exitView = () => {
    setViewDetail(false);
  };

  return (
    <div key={order.id}>
      <div className="rounded-xl px-6 py-6 shadow-lg shadow-[#000]/20 border w-[335px]">
        <div>
          <h1 className="font-bold text-xl">Order #{index + 1}</h1>
          <h1 className="font-bold text-[#000]/40 text-md">
            {new Date(order.checkOutDate).toLocaleString("en-US", {
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </h1>
        </div>
        <div className="mt-4 h-[250px] overflow-y-auto no-scrollbar">
          {order.items.map((item) => {
            return <OrderItem item={item} />;
          })}
        </div>
        <div className="flex items-center justify-between my-2">
          <div>
            <h2 className="text-[#000]/40 font-semibold text-md">
              {`x${order.items.reduce((total, item) => {
                return total + item.quantity;
              }, 0)} items`}
            </h2>
            <h1 className="font-bold text-xl">
              ${order.totalAmount.toFixed(2)}
            </h1>
          </div>
          <button
            onClick={() => setViewDetail(true)}
            className="border-2 border-[#efedfd] rounded-xl py-2.5 px-4 font-bold text-[#6353d1] hover:bg-[#d4d0fe] hover:border-[#d4d0fe]"
          >
            View Detail
          </button>
        </div>
      </div>

      {viewDetail && (
        <Modal onClose={exitView}>
          <div className=" flex flex-col gap-5 w-full">
            <div className="w-full basis-2/3">
              <table className="w-[950px] rounded-xl col-start-3 col-span-8 bg-[#f1f3fb] overflow-hidden">
                <thead className="text-left text-[#95a6b6] border border-b-0">
                  <tr className=" rounded-t-xl overflow-hidden">
                    <th className="pl-10 py-2 text-lg">PRODUCT</th>
                    <th className="py-2 text-lg">UNIT PRICE</th>
                    <th className="py-2 text-lg">QUANTITY</th>
                    <th className="py-2 text-lg">TOTAL</th>
                    <th className="py-2 text-lg">STATUS</th>
                  </tr>
                </thead>
                <tbody className="w-fit bg-white [&>*]:px-5 border-2 border-t-0 [&>*]:py-2">
                  {order.items.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="flex items-center gap-5">
                            <img
                              src={"http://localhost:5000/" + item.book.image}
                              alt=""
                              className="w-24 h-32 object-cover rounded-lg my-3 ml-5"
                            />
                            <div>
                              <h2 className="font-bold text-xl text-primaryColor">
                                {item.book.title}
                              </h2>
                              <p className="text-[#000]/50 font-semibold">
                                by{" "}
                                <span className="font-bold text-[#6353d1]/80">
                                  {item.book.author}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="ml-5 font-semibold  text-lg text-secondaryColor top-0">
                            $
                            {(
                              item.book.price -
                              (item.book.price * item.book.discount) / 100
                            ).toFixed(2)}
                          </p>
                        </td>
                        <td>
                          <div className="text-center w-20">
                            {item.quantity}
                          </div>
                        </td>
                        <td className="text-[#6c5dd4] text-lg font-semibold">
                          $
                          {(
                            (item.book.price -
                              (item.book.price * item.book.discount) / 100) *
                            item.quantity
                          ).toFixed(2)}
                        </td>
                        <td>
                          <p
                            className={`text-center w-20 py-1 font-semibold rounded-md ${
                              item.status === "Completed"
                                ? "bg-green-300 text-green-700"
                                : "bg-purple-200 text-purple-600"
                            }`}
                          >
                            {item.status}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex gap-5 shadow-md items-start justify-start w-fit rounded-xl bg-gray-50 px-5 pb-5">
              <div className=" w-fit  my-5">
                <h1 className="uppercase ml-4 font-bold text-xl my-auto before:content-[''] before:absolute before:w-[4px] before:rounded-full before:h-full relative before:top-0 before:-left-4 before:bg-[#6353d1] mt-1 mb-3">
                  shipping detail
                </h1>
                <table>
                  <tbody>
                    <tr className="[&>*]:border [&>*]:px-5 [&>*]:py-2">
                      <td className="text-left font-semibold">Receiver</td>
                      <td>{order.receiverName}</td>
                    </tr>
                    <tr className="[&>*]:border [&>*]:px-5 [&>*]:py-2">
                      <td className="text-left font-semibold">
                        Shipping Address
                      </td>
                      <td>{order.deliveryAddress}</td>
                    </tr>
                    <tr className="[&>*]:border [&>*]:px-5 [&>*]:py-2">
                      <td className="text-left font-semibold">Phone number</td>
                      <td>{order.phoneNumber}</td>
                    </tr>

                    <tr className="[&>*]:border [&>*]:px-5 [&>*]:py-2">
                      <td className="text-left font-semibold">Status</td>
                      <td className="text-[#22c55e] font-semibold">
                        {order.orderStatus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=" w-fit mt-5">
                <h1 className="uppercase ml-4 font-bold text-xl my-auto before:content-[''] before:absolute before:w-[4px] before:rounded-full before:h-full relative before:top-0 before:-left-4 before:bg-[#6353d1] mt-1 mb-3">
                  Cart Subtotal
                </h1>
                <table>
                  <tbody>
                    <tr className="[&>*]:border [&>*]:px-5 [&>*]:py-2">
                      <td className="text-left font-semibold">
                        Order Subtotal
                      </td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr className="[&>*]:border [&>*]:px-5 [&>*]:py-2">
                      <td className="text-left font-semibold">Shipping</td>
                      <td>Free Shipping</td>
                    </tr>
                    <tr className="[&>*]:border [&>*]:px-5 [&>*]:py-2">
                      <td className="text-left font-semibold">Coupon</td>
                      <td>$0.00</td>
                    </tr>
                    <tr className="[&>*]:border [&>*]:px-5 [&>*]:py-2">
                      <td className="text-left !font-semibold">Total</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction, checkout } from "../shared/store/user";
import { notificationAction } from "../shared/store/notification";

export default function Cart() {
  const cart = useSelector((state) => state.user.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const FnameInput = useRef();
  const LnameInput = useRef();
  const addressInput = useRef();
  const apartmentInput = useRef();
  const cityInput = useRef();
  const countryInput = useRef();
  const phoneNumber = useRef();
  const [isLoading, setIsLoading] = useState(false);

  // let totalPrice = activeUser.cart.reduce(
  //   (sum, item) =>
  //     sum +
  //     Math.round(
  //       ((item.oldPrice - (item.oldPrice * item.discount) / 100) *
  //         item.quantity +
  //         Number.EPSILON) *
  //         100
  //     ) /
  //       100,
  //   0
  // );
  let totalPrice = cart.totalAmount;
  let shipPrice = cart.items.reduce(
    (sum, item) => sum + item.book.shipPrice,
    0
  );
  let totalPriceWithCoupon = totalPrice < 0 ? 0 : totalPrice;
  const updateQuantity = (item, type) => {
    if (type === "+") {
      if (+item.quantity + 1 > item.book.numberInStock) {
        dispatch(
          notificationAction.notify({
            message: `Max stock`,
            status: "error",
          })
        );
        return;
      }
      dispatch(userAction.addCartItem({ ...item.book, quantity: 1 }));
    } else {
      dispatch(userAction.reduceCartItemAmount({ ...item.book, quantity: 1 }));
    }
  };
  const removeProduct = (product) => {
    dispatch(userAction.removeCartItem(product));
  };
  const order = (e) => {
    e.preventDefault();
    const data = {
      deliveryAddress: `${apartmentInput.current.value}, ${addressInput.current.value}, ${cityInput.current.value}, ${countryInput.current.value}`,
      receiverName: `${FnameInput.current.value} ${LnameInput.current.value}`,
      phoneNumber: `${phoneNumber.current.value}`,
    };
    dispatch(checkout(data, user.uid, user.token, setIsLoading));
  };

  return (
    <section className="grid grid-cols-12 my-5 ">
      <h1 className="col-start-2 col-span-10 text-4xl font-bold  mb-10">
        My Cart
      </h1>
      <div className="col-start-2 col-span-10 flex flex-col gap-5">
        <table className="w-full rounded-xl overflow-hidden">
          <thead className="text-left border-b uppercase text-[#000]/50">
            <tr className=" rounded-t-xl overflow-hidden">
              <th className=" py-3 text-lg">Product</th>
              <th className=" py-3 text-lg text-center">Price</th>
              <th className=" py-3 text-lg text-center">Discount</th>
              <th className="py-2 text-lg text-center">Unit Price</th>
              <th className=" py-2 text-lg text-center">Quantity</th>
              <th className="py-2 text-lg text-center">Total</th>
              <th className="py-2 text-lg text-center">Close</th>
            </tr>
          </thead>
          <tbody className="[&>*]:px-5  overflow-hidden border-t-0 [&>*]:py-2 ">
            {cart.items.map((item, index) => {
              return (
                <tr className="border-b" key={index}>
                  <td className="flex items-center gap-3">
                    <img
                      src={"http://localhost:5000/" + item.book.image}
                      alt=""
                      className="w-24 h-32 object-cover rounded-lg my-3 ml-5"
                    />
                    <div className="w-fit">
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
                  </td>
                  <td className="font-semibold text-lg text-center ">
                    ${item.book.price.toFixed(2)}
                  </td>
                  <td className="font-semibold text-lg   text-[#6658d1]">
                    <div className="flex justify-center items-center">
                      <div className="bg-[#e8e4fa] rounded-lg px-4 py-1 font-bold w-fit">
                        {item.book.discount} %
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold text-lg text-center ">
                    $
                    {(
                      item.book.price -
                      (item.book.price * item.book.discount) / 100
                    ).toFixed(2)}
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          updateQuantity(item, "-");
                        }}
                        className=" border pb-1 border-[#efedfd] rounded-lg text-[#6353d1] px-3.5 text-3xl"
                      >
                        -
                      </button>
                      <input
                        onChange={() => {}}
                        value={item.quantity}
                        type="text"
                        className="outline-none w-14 text-center font-semibold text-xl "
                      />
                      <button
                        onClick={() => {
                          updateQuantity(item, "+");
                        }}
                        className=" border pb-1 text-center border-[#efedfd] rounded-lg text-[#6353d1] px-3 text-3xl"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-[#000] font-semibold text-lg min-w-[60px] text-center">
                    $
                    {(
                      item.quantity *
                      (item.book.price -
                        item.book.price * (item.book.discount / 100))
                    ).toFixed(2)}
                  </td>
                  <td className="">
                    <div className="w-full h-full flex justify-center items-start">
                      <button
                        className="bg-[#000]/5 px-4 font-bold py-2 rounded-full text-black "
                        onClick={() => {
                          removeProduct(item.book);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <form
          onSubmit={order}
          className="flex w-full items-center gap-10 mt-8 px-8 py-10 rounded-xl shadow-lg bg-gray-50"
        >
          <div className="grid gap-4 grid-cols-2 basis-3/5">
            <h1 className="uppercase ml-4 font-bold text-2xl my-auto before:content-[''] before:absolute before:w-[4px] before:rounded-full before:h-full relative before:top-0 before:-left-4 before:bg-[#6c5dd4] mb-5">
              BILLING & SHIPPING ADDRESS
            </h1>
            <input
              ref={FnameInput}
              className="col-start-1 col-span-1 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="First Name"
              required
            ></input>
            <input
              ref={LnameInput}
              className="col-start-2 col-span-1 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="Last Name"
              required
            ></input>
            <input
              ref={addressInput}
              className="col-start-1 col-span-2 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="Address"
              required
            ></input>
            <input
              ref={apartmentInput}
              className="col-start-1 col-span-1 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="Apartment, suite, unit etc."
              required
            ></input>
            <input
              ref={cityInput}
              className="col-start-2 col-span-1 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="Town / City"
              required
            ></input>
            <input
              ref={countryInput}
              className="col-start-1 col-span-1 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="State / Country"
              required
            ></input>
            <input
              className="col-start-2 col-span-1 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="Postcode / Zip"
              required
            ></input>
            <input
              className="col-start-1 col-span-1 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="Email"
              required
            ></input>
            <input
              ref={phoneNumber}
              className="col-start-2 col-span-1 px-6 py-3 border-2 font-semibold rounded-lg"
              type="text"
              placeholder="Phone"
              required
            ></input>
            {/* <button
              disabled={addressBtn? true:false}
              onClick={()=>{setAddressBtn(false);setOrderBtn(true)}}
              className="col-span-2 px-10 py-3 font-bold bg-green-500 mt-5 text-white rounded-lg"
            >
              Confirm
            </button> */}
          </div>
          <div>
            {/* <h1 className="uppercase ml-4 font-bold text-xl my-auto before:content-[''] before:absolute before:w-[4px] before:rounded-full before:h-full relative before:top-0 before:-left-4 before:bg-green-500 mt-1 mb-5">
              Cart Subtotal
            </h1> */}
            <table>
              <tbody className="font-semibold">
                <tr className=" [&>*]:px-5 [&>*]:py-2">
                  <th className="text-left text-black/50  font-semibold">
                    Order Subtotal
                  </th>
                  <td className="text-right">${totalPrice.toFixed(2)}</td>
                </tr>
                <tr className=" [&>*]:px-5 [&>*]:py-2">
                  <th className="text-left font-semibold text-black/50 ">
                    Shipping
                  </th>
                  <td className="text-right">${shipPrice.toFixed(2)}</td>
                </tr>
                <tr className=" [&>*]:px-5 [&>*]:py-2">
                  <th className="text-left font-semibold text-black/50 ">
                    Coupon
                  </th>
                  <td className="text-right">$0.00</td>
                </tr>
                <tr className="[&>*]:border-t [&>*]:px-5 [&>*]:py-2">
                  <th className="text-left font-semibold text-black/50">
                    Total
                  </th>
                  <td className="text-right text-green-600 font-bold text-lg">
                    ${totalPriceWithCoupon}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              className={`font-bold px-5 py-2 ${
                isLoading && "!bg-[#d4d0fe] !text-[#6c5dd4]"
              } bg-[#6c5dd4] mt-5 text-white rounded-lg w-full flex justify-between`}
              onClick={order}
            >
              <span>{isLoading ? "Pending.." : "Checkout"}</span>
              <span> {totalPriceWithCoupon}$</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

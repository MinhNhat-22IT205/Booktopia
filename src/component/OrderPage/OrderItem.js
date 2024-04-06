import React from "react";

export default function OrderItem({ item }) {
  return (
    <div className="flex items-center mb-2">
      <div>
        <img
          alt=""
          src={"http://localhost:5000/" + item.book.image}
          className="rounded-lg w-[73px] h-[84px] object-cover"
        />
      </div>
      <div className="h-[84px] border-b flex items-center w-full">
        <div className="ml-5 w-full">
          <h1 className="font-bold text-lg">{item.book.title}</h1>
          <p className="text-[#000]/50 font-semibold mb-2">
            by <span className="text-[#6353d1]/90">{item.author}</span>
          </p>
          <div className="flex justify-between font-bold">
            <h1>
              $
              {(
                item.book.price -
                item.book.price * (item.book.discount / 100)
              ).toFixed(2)}
            </h1>
            <h1>Qty: {item.quantity}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

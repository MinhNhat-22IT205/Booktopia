import React from "react";

const TopBooksItem = ({ book }) => {
  return (
    <div className="flex justify-between items-center border-b py-4 pr-5 scroll-sm">
      <div className="flex justify-between gap-3 items-center">
        <img
          className="w-12 h-16 object-fit rounded-md"
          alt=""
          src={"http://localhost:5000/" + book.image}
        />
        <div>
          <h3 className="font-roboto font-medium">{book.title}</h3>
          <p className="font-roboto opacity-50 text-sm">by {book.author}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="font-roboto font-medium">{book.numberBought}</h3>
        <p className="font-roboto opacity-75">Sold</p>
      </div>
    </div>
  );
};

export default TopBooksItem;

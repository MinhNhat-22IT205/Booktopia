import React from "react";
import TopBooksItem from "./TopBooksItem";

const TopBooks = (props) => {
  return (
    <div className="h-[390px] overflow-y-scroll no-scrollbar">
      {props.data.map((book) => (
        <TopBooksItem book={book} />
      ))}
    </div>
  );
};

export default TopBooks;

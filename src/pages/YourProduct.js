import styled from "@emotion/styled";
import bookData from "../dt/BookData";
import { Pagination } from "@mui/material";
import { useState } from "react";
import activeUser from "../dt/ActiveUser";
import { Link } from "react-router-dom";
import users from "../dt/Users";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../shared/store/user";
import { bookAction } from "../shared/store/books";

const CustomPagination = styled(Pagination)({
  "& .MuiPagination-ul": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  ".MuiPaginationItem-page": {
    backgroundColor: "white",
    margin: 0,
    border: "none",
    borderRadius: 0,
  },

  ".Mui-selected": {
    backgroundColor: "#6c5dd4 !important",
    borderRadius: "6px",
    color: "white",
  },
  "& .MuiPaginationItem-icon": {
    color: "#6c5dd4",
  },
});
export default function YourProduct() {
  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.user.yourProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(myBook.length / itemsPerPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = myBook.slice(startIndex, endIndex);
  console.log(displayedItems);
  return (
    <section className="grid grid-cols-12 my-10">
      <div className="col-start-2 col-span-10">
        <h1 className="font-bold text-3xl mb-8 text-primaryColor">
          Your Products
        </h1>
        <div className="flex flex-wrap gap-5 justify-center  ">
          {displayedItems.map((item) => {
            console.log(item);
            return (
              <article className="w-fit mb-8 border rounded-2xl shadow-lg shadow-[#000]/20 px-5 py-5">
                <Link className="block w-[230px]" to={`/books/${item.id}`}>
                  <div className="mx-auto w-fit mb-2 rounded-xl overflow-hidden shadow-lg shadow-[#000]/20">
                    <img
                      src={item.link}
                      className="w-full aspect-[3/4] object-cover"
                      alt=""
                    />
                  </div>
                  <div className="w-full px-3">
                    <h1 className="font-bold text-[1.4rem] text-primaryColor">
                      {item.title}
                    </h1>
                    <p className="text-[#6c5dd4] uppercase text-sm mb-2 ">
                      {item.genre}
                    </p>
                    <div className="flex justify-between">
                      <span className="text-[#fa744b] flex text-lg items-center font-bold gap-1">
                        <i className="fa-solid fa-star text-[#fe754b]"></i>
                        <h3>4.3</h3>
                      </span>
                      <span className="flex items-baseline gap-2">
                        <h3 className="text-xl font-bold">
                          $
                          {item.discount > 0
                            ? item.price - (item.price * item.discount) / 100
                            : item.price}
                        </h3>
                        <p className="text-gray-500 font-semibold line-through">
                          ${item.price}
                        </p>
                      </span>
                    </div>
                    <div className="flex justify-between mt-3.5">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="bg-blue-600 px-5 py-1 font-semibold text-white rounded-lg"
                      >
                        <Link to={`/books/${item.id}/update-product`}>
                          Edit
                        </Link>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(userAction.deleteBook(item.id));
                          dispatch(bookAction.removeBook(item.id));
                        }}
                        className="bg-red-600 font-semibold px-5 py-1 text-white rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        <div className=""></div>
        <CustomPagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          className="flex justify-end bg-transparent mt-14 border-none scale-125 -translate-x-32 z-[10]"
        />
      </div>
    </section>
  );
}

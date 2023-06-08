import { Pagination } from "@mui/material";
import Filter from "../component/Filter";
import Filter2 from "../component/Filter2";
import GridProduct from "../component/GridProduct";
import bookData from "../dt/BookData";
import { useState } from "react";
import styled from "@emotion/styled";
import ListProduct from "../component/ListProduct";

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
export default function Bookspage() {
  const [status, setStatus] = useState({
    date: "This-month",
    order: "Newest",
    displayType: "grid",
  });
  const changeStatus = (name, data) => {
    setStatus((prevState) => ({ ...prevState, [name]: data }));
    console.log(status.displayType);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(bookData.length / itemsPerPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = bookData.slice(startIndex, endIndex);

  return (
    <div className="grid grid-cols-12 gap-[10px]">
      <h3 className="col-start-2 col-span-10 text-[#6c5dd4] font-poppins text-lg font-bold my-5 ">
        Home&nbsp;/&nbsp;
        <span className="text-[#000] font-poppins text-lg font-bold opacity-40">
          &nbsp;Books
        </span>
      </h3>
      <div className="col-start-2 col-span-10 flex">
        <Filter />
        <div className="w-full ml-5">
          <h1 className="font-bold text-3xl mb-5">Books</h1>
          <Filter2 onChange={changeStatus} />
          <div
            className={` grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mt-3 z-10 ${
              status.displayType === "grid" ? "grid" : "block"
            }`}
          >
            {status.displayType === "grid"
              ? displayedItems.map((item, index) => {
                  return (
                    <GridProduct
                      key={item.id}
                      id={item.id}
                      star={4}
                      link={item.link}
                      title={item.title}
                      genre={item.genre}
                      price={item.price}
                      oldPrice={item.oldPrice}
                    />
                  );
                })
              : displayedItems.map((item) => {
                  return (
                    <ListProduct
                      key={item.id}
                      id={item.id}
                      star={4}
                      des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis, ipsum at fermentum dignissim, nulla nisl viverra nibh, sed feugiat quam magna vitae nunc. Fusce commodo dui vel nisl rhoncus, eu pulvinar velit malesuada."
                      link={item.link}
                      author={item.author}
                      title={item.title}
                      genre={item.genre}
                      price={item.price}
                      oldPrice={item.oldPrice}
                    />
                  );
                })}
          </div>
          <CustomPagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            className="flex justify-end bg-transparent mt-14 border-none scale-125 -translate-x-32"
          />
        </div>
      </div>
    </div>
  );
}

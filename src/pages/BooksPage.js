import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Pagination } from "@mui/material";

import Filter from "../component/BooksPage/Filter";
import Filter2 from "../component/BooksPage/Filter2";
import GridProduct from "../component/BooksPage/GridProduct";
import ListProduct from "../component/BooksPage/ListProduct";
import useQuery from "../shared/hook/useQuery";
import useHttp from "../shared/hook/useHttp";

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
  const nav = useNavigate();
  const { isLoading, fetchData } = useHttp();
  const [filter1, setFilter1] = useState({});
  const [status, setStatus] = useState({
    date: "",
    order: "desc",
    displayType: "grid",
  });
  const changeStatus = useCallback(
    (name, data) => {
      setStatus((prevState) => ({ ...prevState, [name]: data }));
    },
    [setStatus, status]
  );
  // const b = useSelector((state) => state.books);

  const query = useQuery();
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const p = Number(query.get("p"));
    setCurrentPage(p);
    const search = query.get("search");
    const params = new URLSearchParams(status);
    const params2 = new URLSearchParams(filter1);
    nav(
      `/books?p=${p}&${params}&${params2}${search ? "&search=" + search : ""}`
    );
    (async () => {
      try {
        console.log(params);
        const responseData = await fetchData(
          `http://localhost:5000/books?p=${p}&${params}&${params2}${
            search ? "&search=" + search : ""
          }`
        );
        setBooks(responseData.books);
        setTotalPages(Math.ceil(responseData.totalNumber / 8));
      } catch (er) {
        setBooks([]);
        setTotalPages(0);
        console.log(er);
      }
    })();
  }, [query, currentPage, fetchData, status, nav, filter1]);

  // useEffect(() => {
  //   console.log("search change " + books);
  //   setCurrentPage(1);
  //   if (query.get("search")) {
  //     setBooks(
  //       b.filter((book) =>
  //         book.title.toLowerCase().includes(query.get("search").toLowerCase())
  //       )
  //     );
  //   } else {
  //     setBooks(b);
  //   }
  // }, [query.get("search")]);

  // const itemsPerPage = 12;
  // const totalPages = Math.ceil(books.length / itemsPerPage);
  const handleChange = (event, value) => {
    // query.append("p", value);
    const search = query.get("search");
    const params = new URLSearchParams(status);
    nav(`/books?p=${value}&${params}${search ? "&search=" + search : ""}`);
    setCurrentPage(value);
  };
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const displayedItems = books.slice(startIndex, endIndex);

  return (
    <div className="grid grid-cols-12 gap-[10px]">
      <h3 className="col-start-2 col-span-10 text-[#6c5dd4] font-poppins text-lg font-bold my-5 ">
        Home&nbsp;/&nbsp;
        <span className="text-[#000] font-poppins text-lg font-bold opacity-40">
          &nbsp;Books
        </span>
      </h3>
      <div className="col-start-2 col-span-10 flex">
        <Filter setFilter1={setFilter1} />
        <div className="w-full ml-5">
          <h1 className="font-bold text-3xl mb-5">Books</h1>
          <Filter2 status={status} onChange={changeStatus} />
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-[368px]">
              <p>Loading...</p>
            </div>
          ) : (
            <div
              className={` grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mt-3 z-10 ${
                status.displayType === "grid" ? "grid" : "block"
              }`}
            >
              {books.length === 0 && (
                <p className="text-center mt-5">No books found!</p>
              )}
              {status.displayType === "grid"
                ? books.map((item, index) => {
                    return (
                      <GridProduct
                        key={index}
                        id={item.id}
                        star={4}
                        image={"http://localhost:5000/" + item.image}
                        title={item.title}
                        genre={item.genre}
                        price={item.price}
                        discount={item.discount}
                      />
                    );
                  })
                : books.map((item, index) => {
                    return (
                      <ListProduct
                        key={index}
                        id={item.id}
                        star={4}
                        des={item.description}
                        image={"http://localhost:5000/" + item.image}
                        author={item.author}
                        title={item.title}
                        genre={item.genre}
                        price={item.price}
                        discount={item.discount}
                        date={new Date(item.createDate).toDateString()}
                      />
                    );
                  })}
            </div>
          )}
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

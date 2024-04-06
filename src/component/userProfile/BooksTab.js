import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useHttp from "../../shared/hook/useHttp";
import Spinner from "../UI/Spinner";
import { Link } from "react-router-dom";
import Dropdown from "../UI/Dropdown";
import TrashSVG from "../svg/TrashSVG";
import EditSVG from "../svg/EditSVG";
import Modal from "../UI/Modal";
import BookStatistic from "./BookStatistic";
import BookCard from "./BookCard";

const BooksTab = ({ canAdjust, uid }) => {
  const { isLoading, fetchData } = useHttp();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resData = await fetchData(
          `http://localhost:5000/books/mybooks/${uid}`
        );
        setData(resData.books);
      } catch (er) {
        console.log(er);
      }
    })();
  }, [fetchData, uid]);

  return (
    <>
      {isLoading || !data || data.length === 0 ? (
        <Spinner />
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, x: -100, opacity: 0 }}
          className="col-start-2 col-span-10"
        >
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl mb-8 text-primaryColor">
              {!canAdjust ? "Books" : "Your Books"}
            </h1>
            {canAdjust && (
              <Link
                to={"/create-product"}
                className="bg-[#6c5dd4] text-white h-fit px-4 py-2 rounded-lg font-bold transition-all hover:!px-5"
              >
                + Create new
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-8 ">
            {data.map((item, index) => {
              return (
                <BookCard item={item} index={index} canAdjust={canAdjust} />
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default BooksTab;

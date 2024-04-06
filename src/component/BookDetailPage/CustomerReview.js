import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../shared/hook/useHttp";
import { useParams } from "react-router-dom";
import { createReview } from "../../shared/store/user";
import { motion } from "framer-motion";
import Spinner from "../UI/Spinner";

const CustomerReview = (props) => {
  const isAuth = useSelector((state) => !!state.user.token);
  const user = useSelector((state) => state.user);
  const { bookId } = useParams();
  const { isLoading, error, fetchData } = useHttp();
  const [isPosting, setisPosting] = useState(false);
  const [stars, setStars] = useState(1);
  const [reviews, setReviews] = useState();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(0);

  const getStarPercentage = (star, review) => {
    if (!reviews) {
      return 0;
    }
    const percent = (
      (reviews.reduce((total, review) => {
        if (review.star === +star) {
          return total + 1;
        } else {
          return total;
        }
      }, 0) /
        reviews.length) *
      100
    ).toFixed(0);
    console.log(reviews);
    return percent;
  };
  const getOverAllRating = () => {
    if (!reviews) {
      return 0;
    }
    const totalStars = reviews.reduce(
      (total, review) => total + review.star,
      0
    );
    const averageRating = totalStars / reviews.length;
    return averageRating.toFixed(1);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData(
          `http://localhost:5000/reviews/${bookId}`,
          "GET"
        );
        setReviews(res.reviews);
        if (res.reviews.length >= 5) {
          setPage(5);
        } else setPage(res.reviews.length);
      } catch (er) {}
    })();
  }, [bookId, fetchData, flag]);

  const post = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      dispatch(
        createReview(
          bookId,
          { user_id: user.uid, star: stars, comment: inputRef.current.value },
          user.token,
          setisPosting,
          setFlag
        )
      );
    }
  };

  return (
    <>
      <div className="mr-10">
        <div className="px-8 py-5 flex gap-5 my-8">
          <div className="basis-2/5">
            <h1 className="text-[#0a0e28] font-bold text-2xl">
              Rating Information
            </h1>
            <p className="text-sm text-[#555769]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              incidunt neque et illo eum, reprehenderit a deserunt voluptatem
              ratione
            </p>
          </div>
          <ul className="basis-2/5 text-[#0a0e28] font-bold">
            {[5, 4, 3, 2, 1].map((item) => (
              <li className="flex items-center gap-2">
                <i class="fa-solid fa-star text-[#fe754b]"></i>
                <span>{item}</span>
                <div
                  className={`w-full bg-[#f0eeff] h-2 rounded-full after:content-[""]  transition-all after:h-2 after:absolute relative after:bg-[#6c5dd4] after:rounded-full`}
                >
                  <div
                    className="bg-[#6c5dd4] h-full rounded-full transition-all"
                    style={{ width: getStarPercentage(item, reviews) + "%" }}
                  ></div>
                </div>
                <span>{getStarPercentage(item, reviews)}%</span>
              </li>
            ))}
          </ul>
          <div className="basis-1/5 flex flex-col items-center justify-center text-primaryColor">
            <span className="font-bold text-3xl  mr-5">
              {getOverAllRating()}
            </span>{" "}
            out of 5
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <i
                  className={`fa-solid fa-star ${
                    item <= getOverAllRating()
                      ? "text-[#fe754b]"
                      : "text-[#e0e0e0]"
                  } `}
                ></i>
              ))}
            </div>
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <h1 className="font-bold text-xl mb-10 text-primaryColor">
              Showing {page} of {reviews?.length} reviews
            </h1>
            {isAuth && (
              <form onSubmit={post} className="my-5">
                <h3 className="ml-20 my-2 font-semibold text-md">
                  Rate this book!
                </h3>
                <div className="mx-5 flex gap-3 mb-3 ml-20">
                  {[1, 2, 3, 4, 5].map((item) => {
                    return (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setStars(item);
                        }}
                      >
                        <i
                          className={`fa-solid fa-star rounded-sm hover:ring hover:ring-[#fe754b] text-[${
                            stars >= item ? "#fe754b" : "#e0e0e0"
                          }]`}
                        ></i>
                      </button>
                    );
                  })}

                  {/* <i className="fa-solid fa-star text-[#e0e0e0]"></i> */}
                </div>

                <div className="flex gap-3 mx-5">
                  <img
                    src={"http://localhost:5000/" + user.avatar}
                    alt=""
                    className="w-10 h-10 shadow-sm object-cover aspect-square rounded-full"
                  />
                  <textarea
                    ref={inputRef}
                    type="text"
                    placeholder="Tell us your thought about this book..."
                    className="w-full border rounded-lg px-5 py-2 focus:!ring-[#6c5dd4]"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className={`bg-[#6c5dd4] ml-auto mt-auto text-white font-semibold px-4 py-2 text-sm rounded-lg ${
                      isPosting && "!bg-[#d4d0fe] !text-[#6c5dd4]"
                    }`}
                  >
                    {isPosting ? "Pending.." : "Post"}
                  </motion.button>
                </div>
              </form>
            )}

            <ul className="flex flex-col gap-5">
              {reviews?.map((item, index) => {
                if (index <= page - 1) {
                  return (
                    <li className="flex flex-col  gap-2 px-5 py-2 border rounded-xl border-[#ededed] hover:shadow-md">
                      <div className="flex gap-5 items-center">
                        <img
                          alt=""
                          className="w-10 aspect-square object-cover rounded-lg"
                          src={"http://localhost:5000/" + item.user_id.avatar}
                        />
                        <div>
                          <h3 className="font-bold text-primaryColor">
                            {item.user_id.username}
                          </h3>
                          <p className="text-gray-500 font-light">
                            {new Date(item.createDate).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="text-primaryColor w-full font-semibold">
                          {item.comment}
                        </p>
                        <div className="relative -top-3">
                          <span className="text-starColor text-center text-2xl block font-bold mb-1">
                            {item.star}.0
                          </span>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <i
                                className={`fa-solid fa-star ${
                                  i <= item.star
                                    ? "text-[#fe754b]"
                                    : "text-[#e0e0e0]"
                                } `}
                              ></i>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
              {page >= 5 && (
                <button
                  onClick={() =>
                    setPage((prev) => {
                      if (prev === reviews?.length) return 5;
                      if (prev + 5 > reviews?.length) return reviews?.length;
                      return prev + 5;
                    })
                  }
                  className={`bg-[#6c5dd4] ${
                    page === reviews?.length && "!bg-[#d4d0fe] !text-[#6c5dd4]"
                  } text-white py-3 rounded-lg font-bold `}
                >
                  {page === reviews?.length ? "View less" : "View More"}
                </button>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerReview;

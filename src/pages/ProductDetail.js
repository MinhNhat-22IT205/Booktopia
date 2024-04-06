import { Link, useNavigate, useParams } from "react-router-dom";
import { mdiMessageText, mdiThumbUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RelatedProducts from "../component/BooksPage/RelatedProducts";
import Bookonsale from "../component/HomePage/Carousel2/Bookonsale";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../shared/store/user";
import Spinner from "../component/UI/Spinner";
import useHttp from "../shared/hook/useHttp";
import { notificationAction } from "../shared/store/notification";
import CustomerReview from "../component/BookDetailPage/CustomerReview";

export default function ProductDetail() {
  const { bookId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState(1);
  const [isInStock, setIsInStock] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [book, setBook] = useState();
  const nav = useNavigate();
  const { isLoading, error, fetchData } = useHttp();

  useEffect(() => {
    (async () => {
      const b = await fetchData(`http://localhost:5000/books/${bookId}`, "GET");
      setBook(b.book);
      setIsInStock(b.book.numberInStock > 0);
    })();
  }, [bookId, fetchData]);

  useEffect(() => {
    if (error) {
      nav("/books?p=1");
    }
  }, [error, nav]);

  var star = 4;
  var starss = [];
  for (let i = 0; i < 5; i++) {
    if (i < star) {
      starss.push(<i className="fa-solid fa-star text-[#ff764c] mx-0.5"></i>);
    } else {
      starss.push(<i className="fa-solid fa-star text-[#e1e1e1] mx-0.5"></i>);
    }
  }

  const addtocart = (e) => {
    if (!user.uid) {
      dispatch(
        notificationAction.notify({
          message: `Please login in order to buy a book`,
          status: "error",
        })
      );
      return;
    }
    if (user.uid === book.creator.id) {
      dispatch(
        notificationAction.notify({
          message: `This is your book, you cannot buy your own thing :))`,
          status: "error",
        })
      );
    } else {
      if (quantity > book.numberInStock) {
        dispatch(
          notificationAction.notify({
            message: `Item quantity reach max of stock available`,
            status: "error",
          })
        );
        return;
      }
      dispatch(userAction.addCartItem({ ...book, quantity: quantity }));
      // dispatch(
      //   notificationAction.notify({
      //     message: `Added ${quantity} ${
      //       quantity === 1 ? "item" : "items"
      //     } to cart`,
      //     status: "success",
      //   })
      // );
    }
  };

  return (
    <>
      {book && !isLoading ? (
        <div className="grid grid-cols-12 gap-[10px]">
          <div className="col-start-2 col-span-10">
            <h3 className="text-[#6c5dd4] font-bold text-xl mt-5 mb-10">
              Home / Books /{" "}
              <span className="text-[#aaaaaa] text-lg font-[600] ml-1">
                {book.title}
              </span>
            </h3>
            <div className="flex w-full gap-10">
              <img
                className="w-[300px] h-[430px] rounded-2xl object-cover"
                alt=""
                src={"http://localhost:5000/" + book.image}
              />
              <div className="">
                <h1 className="font-bold text-4xl">{book.title}</h1>
                <div className="flex gap-5 items-center mt-3">
                  <div className="flex items-center gap-3 mr-3">
                    <div className="flex items-center justify-between my-3">
                      {starss.map((star) => star)}
                    </div>
                    <h2 className="font-semibold text-lg text-[#00021d]">
                      {4}.0
                    </h2>
                  </div>
                  <div className="flex gap-2 items-center text-sm font-semibold">
                    <Icon path={mdiMessageText} color="#6353d1" size={0.85} />
                    235 Reviews
                  </div>
                  <div className="flex gap-2 items-center text-sm font-semibold">
                    <Icon path={mdiThumbUp} color="#6353d1" size={0.85} />
                    456k Like
                  </div>
                </div>
                <p className="text-[#8a8a8a] my-5">
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse sagittis, ipsum at fermentum dignissim, nulla nisl
                  viverra nibh, sed feugiat quam magna vitae nunc. Fusce commodo
                  dui vel nisl rhoncus, eu pulvinar velit malesuada. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Suspendisse
                  sagittis, ipsum at fermentum dignissim, nulla nisl viverra
                  nibh, sed feugiat quam magna vitae nunc. Fusce commodo dui vel
                  nisl rhoncus, eu pulvinar velit malesuada. */}
                  {book.description}
                </p>
                <div className="border-dashed border-b-2 border-[#e4e4e4] pb-6">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/profile/${book.creator.id}`}
                      className="flex items-center px-2 py-1 hover:bg-gray-100 rounded-lg"
                    >
                      <img
                        alt="Ccc"
                        className="w-10 h-10 object-cover aspect-square rounded-xl mr-3"
                        src={
                          "http://localhost:5000/" + book.creator.avatar
                          // "https://images.unsplash.com/photo-1602465528357-ee742c488c2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGF1dGhvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        }
                      />
                      <div>
                        <h3 className="text-[#aaaaaa] text-sm">Publisher</h3>
                        <h1 className="text-lg font-semibold">
                          {book.creator.username}
                        </h1>
                      </div>
                    </Link>
                    <div className="mx-10">
                      <h3 className="text-[#aaaaaa] text-sm">Writen by</h3>
                      <h1 className="text-lg font-semibold">{book.author}</h1>
                    </div>
                    <div>
                      <h3 className="text-[#aaaaaa] text-sm">Year</h3>
                      <h1 className="text-lg font-semibold">
                        {new Date(book.createDate).getMonth() +
                          1 +
                          "-" +
                          new Date(book.createDate).getFullYear()}
                      </h1>
                    </div>
                    <div className="flex gap-5 ml-8">
                      <div className="bg-[#e8e4fa] px-5 py-2  rounded-lg">
                        <i className="fa-solid fa-truck-fast pr-2 text-[#6c5dd4]"></i>
                        <span className="text-[#6658d1] font-bold">
                          {/* {book.shipPrice === 0
                            ? "FREE SHIPPING"
                            : book.shipPrice.toFixed(2) + " USD"} */}
                          "FREE SHIPPING"
                        </span>
                      </div>
                      <div
                        className={`${
                          isInStock ? "bg-[#dbf3e3]" : "bg-red-200"
                        } px-5 py-2  rounded-lg`}
                      >
                        <i
                          className={`fa-solid fa-box pr-2 ${
                            isInStock ? "text-[#3db65f]" : "text-red-500"
                          }`}
                        ></i>
                        <span
                          className={`${
                            isInStock ? "text-[#3db65f]" : "text-red-500"
                          } font-bold`}
                        >
                          {`${
                            isInStock ? book.numberInStock + " IN" : "OUT OF"
                          } STOCKS`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex mt-10 justify-between">
                  <div className="flex gap-6 items-center">
                    <div className="flex gap-4 items-center">
                      <h1 className="text-[#15172f] text-4xl font-black">
                        $
                        {(
                          book.price -
                          book.price * (book.discount / 100)
                        ).toFixed(2)}
                      </h1>
                      <h3 className="text-[#6f6f6f] mt-1 text-lg">
                        ${book.price}
                      </h3>
                    </div>
                    <div className="px-3 text-white font-semibold rounded-full  bg-[#fe754b] ">
                      <h3>{book.discount}%</h3>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex items-center border-2 border-[#f1eeff] rounded-lg">
                      <button
                        onClick={() => {
                          if (quantity > 1) {
                            return setQuantity((value) => value - 1);
                          }
                        }}
                        className="text-[#6353d1] px-3 text-3xl font-semibold pb-1"
                      >
                        -
                      </button>
                      <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="text"
                        className="outline-none w-14 text-center font-semibold text-xl "
                      />
                      <button
                        onClick={() => setQuantity((value) => value + 1)}
                        className="mb-1 text-[#6353d1] px-3 text-3xl font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <motion.button
                      whileTap={{
                        scale: 0.9,
                        backgroundColor: "#d4d0fe",
                        color: "#6c5dd4",
                      }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        addtocart();
                      }}
                      className="bg-[#6c5dd4] text-white font-bold px-6 py-3 shadow-lg shadow-indigo-500/50  rounded-lg"
                    >
                      Add To Cart
                    </motion.button>
                    <button
                      className={`px-3.5 border flex items-center justify-around rounded-xl bg-white cursor-pointer ${
                        active ? "!bg-[#f1eeff] text-[#6c5dd4]" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(!active);
                      }}
                    >
                      <i className="fa-regular fa-heart text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-20 mt-10">
              <div className="basis-2/3">
                <div className=" [&>*]:py-2  [&>*]:font-bold [&>*]:text-3xl">
                  <button
                    onClick={() => setTab(1)}
                    className={`${
                      tab === 1 ? "text-[#0a0e28]" : "text-[#ababab]"
                    }  mr-5`}
                  >
                    Product Details
                  </button>
                  <button
                    onClick={() => setTab(2)}
                    className={`${
                      tab === 2 ? "text-[#0a0e28]" : "text-[#ababab]"
                    }  mr-5`}
                  >
                    Customer Reviews
                  </button>
                </div>
                {tab === 2 ? (
                  <CustomerReview />
                ) : (
                  <table className="w-full border mr-10 my-5">
                    <tr>
                      <th className="w-2/5 py-4 px-8 text-lg text-left">
                        Book Genre
                      </th>
                      <td className=" text-left">{book.genre.join(", ")}</td>
                    </tr>
                    <tr>
                      <th className="w-2/5 py-4 px-8 text-lg text-left">
                        Author
                      </th>
                      <td className=" text-left">{book.author}</td>
                    </tr>
                    <tr>
                      <th className="w-2/5 py-4 px-8 text-lg text-left">
                        Edition Language
                      </th>
                      <td className=" text-left">{book.language}</td>
                    </tr>
                    <tr>
                      <th className="w-2/5 py-4 px-8 text-lg text-left">
                        Book Format
                      </th>
                      <td className=" text-left">{book.bookFormat}</td>
                    </tr>
                    <tr>
                      <th className="w-2/5 py-4 px-8 text-lg text-left">
                        ISBN
                      </th>
                      <td className=" text-left">{book.ISBN}</td>
                    </tr>
                    <tr>
                      <th className="w-2/5 py-4 px-8 text-lg text-left">
                        Tags
                      </th>
                      <td className=" text-left flex gap-3 flex-wrap">
                        {book.tag.map((tag) => (
                          <div className="bg-[#e8e4fa] px-5 py-2 w-fit rounded-lg">
                            <span className="text-[#6658d1] font-bold">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-2/5 py-4 px-8 text-lg text-left">
                        Note
                      </th>
                      <td className=" text-left">none</td>
                    </tr>
                  </table>
                )}
              </div>
              <RelatedProducts exceptBook={book} />
            </div>
            <Bookonsale />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

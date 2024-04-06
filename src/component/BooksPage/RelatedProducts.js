import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useHttp from "../../shared/hook/useHttp";
// import bookData from "../../dt/BookData";
export default function RelatedProducts(props) {
  const [books, setBooks] = useState([]);
  const { isLoading, fetchData } = useHttp();
  useEffect(() => {
    (async () => {
      try {
        const responseData = await fetchData(
          `http://localhost:5000/books?p=1&date=&order=desc&displayType=grid`
        );
        setBooks(responseData.books);
      } catch (er) {
        console.log(er);
      }
    })();
  }, [fetchData]);

  return (
    <div className="basis-1/4">
      <h1 className="font-bold text-primaryColor text-3xl mb-8">
        Related Books
      </h1>
      <ul className="flex flex-col gap-5">
        {books.map((product, index) => {
          if (product.id !== props.exceptBook.id && index <= 4)
            return (
              <li key={product.id} className="">
                <Link to={`/books/${product.id}`} className="flex gap-5">
                  <div className="basis-1/3 ">
                    <img
                      src={"http://localhost:5000/" + product.image}
                      alt=""
                      className="rounded-lg h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-primaryColor font-bold text-lg">
                      {product.title}
                    </h1>
                    <p className="text-[#6c5dd4] font-semibold text-xs mt-1 uppercase">
                      {product.genre.join(", ")}
                    </p>
                    <div className="flex items-center gap-3 my-2">
                      <div className="flex items-center">
                        <i class="fa-solid fa-star text-[#fe754b]"></i>

                        <span className="text-starColor font-bold ml-1">
                          4.7
                        </span>
                      </div>
                      <span className="text-[#afafaf] font-semibold text-sm">
                        244 reviews
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2 ml-1">
                      <h3 className="font-bold text-lg">
                        $
                        {(
                          product.price -
                          (product.price * product.discount) / 100
                        ).toFixed(2)}
                      </h3>
                      <h4 className="text-sm text-[#aaaaaa] line-through font-semibold">
                        ${product.price}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 w-fit bg-[#f1eeff] px-3.5 py-1.5 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#6c5dd4"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>

                      <span className="font-bold text-sm text-[#6c5dd4] ">
                        Add to cart
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
        })}
      </ul>
    </div>
  );
}

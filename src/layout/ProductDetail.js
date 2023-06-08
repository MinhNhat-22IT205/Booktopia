import { useParams } from "react-router-dom";
import bookData from "../dt/BookData";
import { mdiMessageText } from "@mdi/js";
import Icon from "@mdi/react";

export default function ProductDetail() {
  const { bookId } = useParams();
  const book = bookData.find((book) => book.id === bookId);
  var star = book.star;
  var stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < star) {
      stars.push(<i className="fa-solid fa-star text-[#ff764c] mx-0.5"></i>);
    } else {
      stars.push(<i className="fa-solid fa-star text-[#e1e1e1] mx-0.5"></i>);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-[10px]">
      <div className="col-start-2 col-span-10">
        <h3 className="text-[#6c5dd4] font-bold text-xl">
          Home / Books / <span className="text-[#aaaaaa]">{book.title}</span>
        </h3>
        <div className="flex">
          <img
            className="w-[300px] h-[430px] rounded-2xl"
            alt=""
            src={book.link}
          />
          <div>
            <h1>All Good News</h1>
            <div>
              <div className="flex items-center justify-between my-3">
                {stars.map((star) => star)}
              </div>
              <h2>{book.star}.0</h2>
              <div>
                <Icon path={mdiMessageText} size={1} />
                235 Reviews
              </div>
              <div>
                <i className="fa-solid fa-thumbs-up text-[#6c5dd4]"></i>
                456k Like
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse sagittis, ipsum at fermentum dignissim, nulla nisl
              viverra nibh, sed feugiat quam magna vitae nunc. Fusce commodo dui
              vel nisl rhoncus, eu pulvinar velit malesuada.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse sagittis, ipsum at fermentum dignissim, nulla nisl
              viverra nibh, sed feugiat quam magna vitae nunc. Fusce commodo dui
              vel nisl rhoncus, eu pulvinar velit malesuada.
            </p>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#aaaaaa] text-sm">Writen by</h3>
                  <h1 className="text-lg font-semibold">{book.author}</h1>
                </div>
                <div className="mx-10">
                  <h3 className="text-[#aaaaaa] text-sm">Publisher</h3>
                  <h1 className="text-lg font-semibold">{book.publisher}</h1>
                </div>
                <div>
                  <h3 className="text-[#aaaaaa] text-sm">Year</h3>
                  <h1 className="text-lg font-semibold">{book.year}</h1>
                </div>
              </div>
              <div>
                <i className="fa-solid fa-truck-fast text-[#6c5dd4]"></i>FREE
                SHIPPING
              </div>
              <div>
                <i className="fa-solid fa-box text-[#3db760]"></i>IN STOCKS
              </div>
            </div>
            <div>
              <div>
                <h1>${book.price}</h1>
                <h3>${book.oldPrice}</h3>
                <div>
                  <h3>{book.discount}</h3>
                </div>
              </div>
              <div>
                <input />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

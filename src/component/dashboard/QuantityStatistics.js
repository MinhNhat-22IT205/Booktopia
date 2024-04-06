import React, { useEffect, useState } from "react";
import QuantityCountItem from "./QuantityCountItem";
import CartSVG from "../svg/CartSVG";
import BookSVG from "../svg/BookSVG";
import UserSVG from "../svg/UserSVG";
import useHttp from "../../shared/hook/useHttp";

const QuantityStatistics = () => {
  const { isLoading, error, fetchData } = useHttp();
  const [data, setData] = useState({
    productCount: 0,
    userCount: 0,
    orderItemCount: 0,
  });

  useEffect(() => {
    (async () => {
      const b = await fetchData(
        `http://localhost:5000/statistics/counts`,
        "GET"
      );
      setData(b);
    })();
  }, [fetchData]);
  return (
    <div class="grid grid-cols-12 gap-6 mt-5 w-full">
      <QuantityCountItem
        percentage={33}
        svg={<CartSVG />}
        name="Item Sales"
        count={data.orderItemCount}
      />
      <QuantityCountItem
        percentage={12}
        svg={<BookSVG />}
        name="Total Products"
        count={data.productCount}
      />
      <QuantityCountItem
        percentage={22}
        svg={<UserSVG />}
        name="Current User"
        count={data.userCount}
      />
    </div>
  );
};

export default QuantityStatistics;

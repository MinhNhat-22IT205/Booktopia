import useHttp from "../../shared/hook/useHttp";
import Spinner from "../UI/Spinner";
import OrdersTabRow from "./OrdersTabRow";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const OrdersTab = () => {
  const { uid } = useSelector((state) => state.user);
  const { isLoading, error, fetchData } = useHttp();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resData = await fetchData(
          `http://localhost:5000/orders/ordereditems/${uid}`
        );
        setData(resData.orders);
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
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ scale: 0.5, x: -100, opacity: 0 }}
        >
          <h1 className=" font-bold text-2xl my-5 ">Users's orders</h1>
          <table className="w-full rounded-xl col-start-2 col-span-9 bg-[#f1f3fb] overflow-hidden">
            <thead className="text-left text-[#95a6b6]">
              <tr className=" rounded-t-xl overflow-hidden">
                <th className=" py-3 text-lg pl-10">Product</th>
                <th className=" py-3 text-lg px-10">Customer</th>
                <th className="py-3 text-lg ">Purchase Date</th>
                <th className="py-3 text-lg ">Phone number</th>
                <th className=" py-3 text-lg px-5">Status</th>
                <th className="py-3 text-lg ">Price</th>
                <th className="py-3 text-lg text-center">Close</th>
              </tr>
            </thead>
            <tbody className="[&>*]:px-5 bg-white overflow-hidden border-t-0 [&>*]:py-2 ">
              {data.map((item) => (
                <OrdersTabRow key={item.id} item={item} setData={setData} />
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </>
  );
};

export default OrdersTab;

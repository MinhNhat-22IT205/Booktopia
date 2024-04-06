import Order from "../component/OrderPage/Order";
import { useSelector } from "react-redux";
import useHttp from "../shared/hook/useHttp";
import { useEffect, useState } from "react";

export default function Orders() {
  const { uid } = useSelector((state) => state.user);
  const { isLoading, error, fetchData } = useHttp();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resData = await fetchData(`http://localhost:5000/orders/${uid}`);
        setData(resData.orders);
      } catch (er) {
        console.log(er);
      }
    })();
  }, [fetchData, uid]);

  return (
    <section className="grid grid-cols-12 ">
      <h1 className="font-bold text-2xl col-start-2 col-span-10 my-5">
        Order List
      </h1>
      <div className="z-[10] col-start-2 col-span-10 flex flex-wrap gap-5">
        {data.map((order, index) => {
          return <Order order={order} index={index} />;
        })}
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import useHttp from "../../shared/hook/useHttp";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
};
const BookStatistic = ({ bid }) => {
  const { isLoading, fetchData } = useHttp();
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "#2196F3",
        borderColor: "#2196F3",
      },
    ],
  });

  useEffect(() => {
    (async () => {
      try {
        const resData = await fetchData(
          `http://localhost:5000/orders/statistic/${bid}`
        );
        console.log(bid);
        console.log(resData);
        setData({
          labels: resData?.data.map((item) => item.date),
          datasets: [
            {
              label: "Book bought",
              data: resData?.data.map((item) => item.bookBought),
              backgroundColor: "#83c0f1",
              borderColor: "#2196F3",
              borderWidth: 4,
            },
          ],
        });
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);

  return (
    <div className="w-[600px] text-[#83c0f1] h-[300px]">
      {data && !isLoading && <Line options={options} data={data}></Line>}
    </div>
  );
};

export default BookStatistic;

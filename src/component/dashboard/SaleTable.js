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
        callback: (value) => `$${value}`, // Add $ mark to the y-axis ticks
        precision: 0,
      },
    },
    x: {
      grid: {
        display: false, // Remove horizontal gray lines
      },
    },
  },
  elements: {
    line: {
      tension: 0.35, // Set the tension value for the line curve
    },
  },
};
const SaleTable = () => {
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
        const resData = await fetchData(`http://localhost:5000/orders/sales`);
        setData({
          labels: resData?.sales.map(
            (item) => item.date.split("-")[1] + "-" + item.date.split("-")[2]
          ),
          datasets: [
            {
              label: "Total sale",
              data: resData?.sales.map((item) => item.totalSales),
              backgroundColor: "#1a56db",
              borderColor: "#1a56db",
              borderWidth: 4,
            },
          ],
        });
        console.log(data);
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);
  return (
    <div className="w-[580px] col-span-6 intro-y bg-white rounded-lg border py-6 px-7 shadow-sm">
      <h2 className="!font-poppins font-semibold text-2xl">$45,385</h2>
      <p className="opacity-50 !font-roboto">Sales last 7 days</p>
      <br></br>
      {data && !isLoading && (
        <Line options={options} data={data} width={600} height={440}></Line>
      )}
    </div>
  );
};

export default SaleTable;

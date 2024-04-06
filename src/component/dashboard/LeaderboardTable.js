import React, { useEffect, useState } from "react";
import useHttp from "../../shared/hook/useHttp";
import TopBooks from "./TopBooks";
import TopUsers from "./TopUsers";

const LeaderboardTable = () => {
  const [tab, setTab] = useState(1);
  const [data, setData] = useState({ topBooks: [], topUsers: [] });
  const { isLoading, fetchData } = useHttp();
  useEffect(() => {
    (async () => {
      try {
        const resData = await fetchData(
          `http://localhost:5000/statistics/topsales`
        );
        setData(resData);
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);

  return (
    <div className="w-full h-full col-span-6 intro-y bg-white rounded-lg border py-6 px-7 shadow-sm">
      <h2 className="font-medium text-xl font-roboto mb-3">Statistics</h2>
      <div className="flex h-fit bg-[#f9fafb] rounded-t-lg border-b">
        <div
          onClick={() => setTab(1)}
          className={`hover:text-[#6c5dd4]  cursor-pointer text-[#${
            tab === 1 ? "6c5dd4" : "818793"
          }] w-1/2 border-r-2 text-center py-3`}
        >
          <h3 className="!font-roboto text-inherit font-medium text-sm">
            Top books
          </h3>
        </div>
        <div
          onClick={() => setTab(2)}
          className={`hover:text-[#6c5dd4] cursor-pointer text-[#${
            tab === 2 ? "6c5dd4" : "818793"
          }] w-1/2 text-center py-3`}
        >
          <h3 className="!font-roboto text-inherit font-medium text-sm">
            Top Earned Users
          </h3>
        </div>
      </div>
      {tab === 1 && <TopBooks data={data.topBooks} />}
      {tab === 2 && <TopUsers data={data.topUsers} />}
    </div>
  );
};

export default LeaderboardTable;

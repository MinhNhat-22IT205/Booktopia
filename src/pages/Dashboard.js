import React from "react";
import SideBar from "../component/dashboard/SideBar";
import QuantityStatistics from "../component/dashboard/QuantityStatistics";
import SaleTable from "../component/dashboard/SaleTable";
import LeaderboardTable from "../component/dashboard/LeaderboardTable";
import UserTable from "../component/dashboard/UserTable";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 scroll-smooth">
      <SideBar />
      <div class="p-4 sm:ml-64 w-full">
        <QuantityStatistics />
        <div className="grid grid-cols-12 mt-5">
          <SaleTable />
          <LeaderboardTable />
        </div>
        {/* <img
          className="w-full h-[650px] rounded-xl mt-5"
          alt="asd"
          src="https://i.imgur.com/RzhOzkE.png"
        /> */}
        <UserTable />
      </div>
    </div>
  );
};

export default Dashboard;

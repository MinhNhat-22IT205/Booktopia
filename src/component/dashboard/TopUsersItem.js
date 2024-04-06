import React from "react";

const TopUsersItem = ({ user }) => {
  return (
    <div className="flex justify-between items-center border-b py-4 pr-5 scroll-sm">
      <div className="flex justify-between gap-3 items-center">
        <img
          className="w-12 h-12 object-cover rounded-full"
          alt=""
          src={"http://localhost:5000/" + user.avatar}
        />
        <div>
          <h3 className="font-roboto font-medium">{user.username}</h3>
          <p className="font-roboto opacity-50 text-sm"> {user.email}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <h3 className="font-roboto font-medium">
          $ {user.totalEarned.toFixed(2)}
        </h3>
        <p className="font-roboto opacity-75">Earned</p>
      </div>
    </div>
  );
};

export default TopUsersItem;

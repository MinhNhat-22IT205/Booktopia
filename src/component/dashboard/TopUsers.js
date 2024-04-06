import React from "react";
import TopUsersItem from "./TopUsersItem";

const TopUsers = (props) => {
  return (
    <div className="h-[390px] overflow-y-scroll no-scrollbar">
      {props.data.map((user) => (
        <TopUsersItem user={user} />
      ))}
    </div>
  );
};

export default TopUsers;

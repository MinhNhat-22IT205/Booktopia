import React, { useEffect, useState } from "react";
import useHttp from "../../shared/hook/useHttp";
import UserTableItem from "./UserTableItem";
import { useDispatch } from "react-redux";
import { signup } from "../../shared/store/user";
import Modal from "../UI/Modal";
import AddAccountForm from "./AddAccountForm";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [openAddAccount, setOpenAddAccount] = useState(false);
  const { isLoading, fetchData } = useHttp();
  useEffect(() => {
    (async () => {
      try {
        const resData = await fetchData(`http://localhost:5000/users`);
        setData(resData.users);
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);

  return (
    <div id="users">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium font-roboto my-5">All users</h1>
        <button
          className="bg-[#6c5dd4] text-md hover:scale-105 transition-all h-fit w-fit font-medium font-roboto text-white rounded-lg py-2.5 px-4"
          onClick={() => setOpenAddAccount(true)}
        >
          + Add Account
        </button>
        {openAddAccount && (
          <Modal onClose={() => setOpenAddAccount(false)}>
            <AddAccountForm onClose={() => setOpenAddAccount(false)} />
          </Modal>
        )}
      </div>
      <table className="w-full rounded-xl col-start-3 col-span-8 bg-[#f1f3fb] overflow-hidden">
        <thead className="text-left text-[#95a6b6] border border-b-0">
          <tr className=" rounded-t-xl overflow-hidden">
            <th className=" py-3 text-lg pl-10">NAME</th>
            <th className=" py-3 text-lg">EMAIL</th>
            <th className="py-3 text-lg ">JOIN DATE</th>
            <th className=" py-3 text-lg px-5">ADDRESS</th>
            <th className="py-3 text-lg ">CONTACT</th>
            <th className="py-3 text-lg text-center">ROLE</th>
            <th className="py-3 text-lg text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="[&>*]:px-5 border bg-white overflow-hidden border-t-0 [&>*]:py-2 ">
          {data.map((user) => (
            <UserTableItem key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

import CardInfor from "../component/userProfile/CardInfor";
import LocationSVG from "../component/svg/LocationSVG";
import EmailSVG from "../component/svg/EmailSVG";
import DateSVG from "../component/svg/DateSVG";
import PhoneSVG from "../component/svg/PhoneSVG";
import ListSVG from "../component/svg/ListSVG";
import MoneySVG from "../component/svg/MoneySVG";
import BookSVG from "../component/svg/BookSVG";
import OrdersTab from "../component/userProfile/OrdersTab";
import Modal from "../component/UI/Modal";
import BooksTab from "../component/userProfile/BooksTab";
import Dropdown from "../component/UI/Dropdown";
import EditSVG from "../component/svg/EditSVG";
import PrivacySVG from "../component/UI/PrivacySVG";
import CameraSVG from "../component/svg/CameraSVG";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UpdateUserForm from "../component/userProfile/UpdateUserForm";
import UpdateCoverForm from "../component/userProfile/UpdateCoverForm";
import ExportSVG from "../component/svg/ExportSVG";
import useHttp from "../shared/hook/useHttp";
import Spinner from "../component/UI/Spinner";

const UserProfile = () => {
  const [tab, setTab] = useState(0);
  const [userAction, setUserAction] = useState(0);
  const user = useSelector((state) => state.user);
  const { uid } = useParams();
  const { isLoading, fetchData } = useHttp();
  const [userdata, setUserData] = useState();
  const [canAdjust, setCanAdjust] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const b = await fetchData(`http://localhost:5000/users/${uid}`, "GET");
        setUserData(b.user);
        console.log(b.user);
        setCanAdjust(uid === user.uid);
      } catch (er) {
        console.log(er);
      }
    })();
  }, [fetchData, uid, user.uid]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-12 my-5">
          <div className="group relative col-start-2 col-span-10 overflow-hidden bg-gray-100 h-56 w-[900px] mx-auto text-gray-100 rounded-lg rounded-tl-3xl translate-y-5">
            {(canAdjust ? user : userdata)?.coverImage && (
              <img
                className="w-full h-full object-cover"
                src={
                  "http://localhost:5000/" +
                  (canAdjust ? user : userdata)?.coverImage
                }
                alt=""
              ></img>
            )}
            {canAdjust && (
              <div
                onClick={() => setUserAction(3)}
                className="absolute top-0 right-0 p-2.5 rounded-full hover:bg-gray-100 opacity-0  group-hover:opacity-100 transition-all cursor-pointer"
              >
                <CameraSVG />
              </div>
            )}
          </div>
          <div className="col-start-2 col-span-10 flex gap-5 items-center w-fit max-w-[800px] mx-auto">
            <img
              className="w-36 h-36 object-cover rounded-full border-white border-4 shadow-lg shadow-[#edeeee] -translate-y-5"
              // src="https://i.pravatar.cc/300"
              src={
                "http://localhost:5000/" + (canAdjust ? user : userdata)?.avatar
              }
              alt=""
            ></img>
            <div className="mt-10">
              <h2 className="font-poppins text-2xl font-semibold capitalize">
                {(canAdjust ? user : userdata)?.username}
              </h2>
              <p className="mb-2 ">
                {(canAdjust ? user : userdata)?.bio
                  ? (canAdjust ? user : userdata)?.bio
                  : "Vel laboriosam voluptatem et dolorem velit eos iure quia"}
              </p>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-red-600 col-start-1 col-span-1 row-start-1  flex gap-1 justify-start items-center">
                  <LocationSVG colorHex="a0a0a0" />
                  <p className="font-roboto text-gray-600">
                    {(canAdjust ? user : userdata)?.address}
                  </p>
                </span>
                <span className="text-red-500 col-start-2 col-span-1 row-start-1 ml-5 flex gap-1 justify-start items-center">
                  <EmailSVG colorHex="a0a0a0" />
                  <p className="font-roboto text-gray-600">
                    {(canAdjust ? user : userdata)?.email}
                  </p>
                </span>
                <span className="text-red-600 flex gap-1 justify-start items-center">
                  <DateSVG colorHex="" />
                  <p className="font-roboto text-gray-600">
                    {new Date(userdata?.registerDate).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </span>
                <span className="text-green-700 ml-5 flex gap-1 justify-start items-center">
                  <PhoneSVG colorHex="a0a0a0" />
                  <p className="font-roboto text-gray-600">
                    {userdata?.contactNumber}
                  </p>
                </span>
              </div>
            </div>
            {canAdjust && (
              <div className="t-0 w-fit h-full py-8">
                <Dropdown width={150}>
                  <button
                    onClick={() => setUserAction(1)}
                    to={`/books`}
                    className="flex items-center gap-1 transition-all font-poppins text-sm text-gray-300 hover:text-gray-500 hover:font-bold hover:bg-gray-50 pl-3 pr-5 py-2"
                  >
                    <EditSVG /> Update info
                  </button>
                  {/* <button
              onClick={() => setUserAction(2)}
              className="flex items-center gap-1 transition-all font-poppins text-sm text-gray-300 hover:text-gray-500 hover:font-bold hover:bg-gray-50 pl-3 pr-5 py-2"
            >
              <PrivacySVG /> Privacy
            </button> */}
                </Dropdown>
              </div>
            )}
          </div>
          <div className="col-start-2 col-span-10 flex gap-5 items-center w-fit overflow-visible mx-auto py-8">
            <CardInfor
              setTab={() => setTab(2)}
              svg={<MoneySVG />}
              quantity={`$ ${userdata?.totalEarned.toFixed(2)}`}
              name="Earning"
            />
            <CardInfor
              setTab={() => setTab(2)}
              svg={<ExportSVG />}
              quantity={userdata?.totalBookSold}
              name="BookSold"
            />
            <CardInfor
              setTab={() => setTab(3)}
              svg={<BookSVG />}
              quantity={userdata?.books.length}
              name="YourBooks"
            />
            <CardInfor
              setTab={() => setTab(1)}
              svg={<ListSVG />}
              quantity={237}
              name="Orders"
            />
          </div>
          <div className="col-start-2 col-span-9">
            {canAdjust ? (
              <AnimatePresence mode="wait">
                {tab === 1 ? (
                  <OrdersTab />
                ) : tab === 3 ? (
                  <BooksTab canAdjust={true} uid={uid} />
                ) : (
                  <></>
                )}
              </AnimatePresence>
            ) : (
              <BooksTab canAdjust={canAdjust} uid={uid} />
            )}
          </div>
          {canAdjust && (
            <AnimatePresence mode="wait">
              {userAction === 1 ? (
                <Modal onClose={() => setUserAction(0)}>
                  <UpdateUserForm />
                </Modal>
              ) : userAction === 2 ? (
                <Modal onClose={() => setUserAction(0)}>asd</Modal>
              ) : userAction === 3 ? (
                <Modal onClose={() => setUserAction(0)}>
                  <UpdateCoverForm />
                </Modal>
              ) : (
                <></>
              )}
            </AnimatePresence>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationAction } from "../../shared/store/notification";

export default function Notification() {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  let isGood = "";
  if (notification.status === "success") {
    isGood = "before:bg-[#85bd96]  before:shadow-inner";
  } else if (notification.status === "error") {
    isGood = "before:bg-red-500 before:shadow-red-300 before:shadow-inner";
  } else if (notification.status === "warning") {
    isGood =
      "before:bg-yellow-500 before:shadow-yellow-300 before:shadow-inner";
  } else {
    isGood = "before:bg-[#6c5dd4] before:shadow-[#aca0ff] before:shadow-inner";
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(notificationAction.clearNotify());
    }, 4500);
    return () => {
      console.log("clean");
      clearTimeout(timer);
    };
  }, [notification]);
  return (
    <>
      {notification.status === "sending" && (
        <div
          className={`fixed z-50 bottom-5 right-5 font-semibold font-poppins px-5 py-4 rounded-lg  drop-shadow-lg shadow-cyan-900  bg-white
      before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:transition-all before:animate-runOutOfTime before:h-2   
       `}
        >
          {notification.message}
        </div>
      )}
      {notification.message && notification.status !== "sending" && (
        <div
          key={Math.random()}
          className={`fixed z-50 bottom-5 right-5 font-semibold font-poppins px-5 py-4 rounded-xl  drop-shadow-lg shadow-cyan-900  bg-white
      before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:transition-all before:animate-runOutOfTime before:h-2 ${isGood}    
       `}
        >
          {notification.message}
        </div>
      )}
    </>
  );
}

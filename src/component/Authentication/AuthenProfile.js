import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function AuthenProfile(props) {
  const user = useSelector((state) => state.user);
  return (
    <div
      className="absolute flex flex-col pt-2 bg-[#fff] border-2 right-1 top-[35px] w-[150px]  before:absolute before:right-4 before:top-[-10px] before:border-l-[9px] before:border-l-transparent
        before:border-b-[11px] before:border-b-[#e4e4e4]
        before:border-r-[9px] before:border-r-transparent  before:shadow-2xl rounded-lg shadow-xl"
    >
      {!user.isAdmin && (
        <>
          <NavLink to={`/profile/${user.uid}`} className="nav-item">
            Profile
          </NavLink>
          <NavLink to="/cart" className="nav-item">
            Cart
          </NavLink>
          <NavLink to="/orders" className="nav-item">
            Orders
          </NavLink>
        </>
      )}

      <button
        onClick={props.onLogout}
        className="hover:text-[#6c5dd4] text-[#3e3e3e] !p-3 !px-5 text-start border-t font-semibold hover:bg-[#e4e4e4]"
      >
        <i className="fa-solid fa-right-from-bracket mr-2"></i>Log out
      </button>
    </div>
  );
}

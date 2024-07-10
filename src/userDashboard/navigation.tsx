// components/Navigation.tsx
import React, { useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { MdOutlineEventAvailable } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaStripe } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { clearUser } from "../features/registration/userAuthSlice";

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
  const user = useSelector((state: RootState) => state.userAuth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/home");
  };
  
  return (
    <nav className="bg-teal-500 p-4  h-auto w-64">
       <h1>Welcome, {user?.username}</h1>
      <ul className="space-y-10  ml-10">
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-Red-500 hover:text-black
             focus:outline-none focus:text-white"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.293 17.293a1 1 0 011.414 0L12 21.586l4.293-4.293a1 1 0 011.414 1.414L12 24.414l-5.707-5.707a1 1 0 010-1.414zM4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 6a1 1 0 000 2h14a1 1 0 000-2H5z"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="pt-4 text-pretty text-rose-800 lg:flex flex-col gap-12 lg:justify-between lg:pt-0">
            <li>
              <Link
                to="/user-dashboard"
                className="text-white flex gap-3 font-bold hover:text-gray-200 "
              >
                <MdDashboardCustomize />
                Dashboard{" "}
              </Link>
            </li>
            <li>
            <Link className="text-white font-bold  flex gap-3 hover:text-gray-200"
                to={`/user-bookings/${user?.user_id}`}>
                <TbBrandBooking /> Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                <MdOutlineEventAvailable />
                Available Cars
              </Link>
            </li>
            <li>
              <Link
                to="/user-payment"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                <FaStripe /> Payment History
              </Link>
            </li>
            <li>
              <Link
                to="/user-profile"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                {" "}
                <CgProfile /> Profile
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} className="px-4">
                  <RiLogoutCircleRFill />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4">
                Login
              </Link>
            )}
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/home");
  };
  
  return (
    <nav className="bg-cards p-4 h-screen w-52">
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
                to="/admin-dashboard"
                className="text-white flex gap-3 font-bold hover:text-gray-200 "
              >
                <MdDashboardCustomize />
                Dashboard{" "}
              </Link>
            </li>
            <li>
              <Link
                to="/bookings"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                <TbBrandBooking /> Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                <TbBrandBooking /> Users
              </Link>
            </li>
            <li>
              <Link
                to="/bookings"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                <TbBrandBooking /> Fleets
              </Link>
            </li>
            <li>
              <Link
                to="/vehicles"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                <MdOutlineEventAvailable />
                 Vehicles
              </Link>
            </li>
            <li>
              <Link
                to="/vspec"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                <MdOutlineEventAvailable />
                 V Spec
              </Link>
            </li>
            <li>
              <Link
                to="/payments"
                className="text-white font-bold  flex gap-3 hover:text-gray-200"
              >
                <FaStripe /> Payments
              </Link>
            </li>
            <li>
              <Link
                to="/admin-profile"
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

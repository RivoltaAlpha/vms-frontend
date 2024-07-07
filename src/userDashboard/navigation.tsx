// components/Navigation.tsx
import React from 'react';
import { MdDashboardCustomize } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { MdOutlineEventAvailable } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaStripe } from "react-icons/fa";
import { Link } from 'react-router-dom';


export const Navigation: React.FC = () => {
  return (
    <nav className="bg-teal-500 p-4  h-auto w-64">
      <ul className="space-y-10  ml-10">
        <li><Link to="/user-dashboard" className="text-white flex gap-3 font-bold hover:text-gray-200 "><MdDashboardCustomize /> Dashboard </Link></li>
        <li><Link to="/bookings" className="text-white font-bold  flex gap-3 hover:text-gray-200"><TbBrandBooking /> Bookings</Link></li>
        <li><Link to="/available-cars" className="text-white font-bold  flex gap-3 hover:text-gray-200"><MdOutlineEventAvailable />Available Cars</Link></li>
        <li><Link to="/user-payment" className="text-white font-bold  flex gap-3 hover:text-gray-200"><FaStripe /> Payment History</Link></li>
        <li><Link to="/user-profile" className="text-white font-bold  flex gap-3 hover:text-gray-200"> <CgProfile /> Profile</Link></li>
        <li><Link to="/home" className="text-white font-bold  flex gap-3 hover:text-gray-200"><RiLogoutCircleRFill />Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
import { useState } from 'react';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { clearUser } from '../features/users/userSlice';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const user = useSelector((state: RootState) => state.usersAPI);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <header className=" text-black">
      <nav className="container mx-auto px-6 py-3 flex flex-wrap justify-between items-center">
        <div className="text-xl font-bold">
        AniRental
        </div>
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
          className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
            <NavLink to="Explore" className="text-red-500 hover:text-black
             px-3 py-2">
              Explore
            </NavLink>
            <NavLink to="/bookings" className="text-red-500 hover:text-black px-3 py-2">Book Now</NavLink>
              {user.config ? (
                <>
                  <Link to="/user/dashboard" className="px-4">Dashboard</Link>
                  <button onClick={handleLogout} className="px-4">Logout</button>
                </>
              ) : (
                <Link to="/login" className="px-4">Login</Link>
              )}
            <NavLink to="/contact" className="text-red-500 hover:text-black
             px-3 py-2">
              <button className="bg-red-500 hover:bg-red-800 text-white lg:font-bold py-2 px-4 rounded">
                Contact Us
              </button>
            </NavLink>
            <NavLink to="/support" className="text-red-500 hover:text-black
             px-3 py-2">
              <button className="bg-red-500 hover:bg-red-800 text-white lg:font-bold py-2 px-4 rounded">
                Customer Support
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;



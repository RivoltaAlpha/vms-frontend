import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-red-50 ext-cards">
      <nav className=" mx-auto px-6 py-2 flex flex-wrap justify-between items-center">
        <div className="text-4xl text-cards flex font-bold">
        <img src="./images/logo.jpg" alt="" className="w-10 h-10 rounded-full" />
        AniRent
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-cards hover:text-black
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
            <NavLink to="/" className="text-cards hover:text-black
             px-3 py-2">
              Home
            </NavLink>
            <NavLink to="/about-us" className="text-cards hover:text-black
             px-3 py-2">
              About Us
            </NavLink>
            <NavLink to="Explore" className="text-cards hover:text-black
             px-3 py-2">
              Explore
            </NavLink>
            <NavLink to="/login" className="text-cards hover:text-black px-3 py-2">Book Now</NavLink>
            <NavLink to="/Fleets" className="text-cards hover:text-black
             px-3 py-2">
              Fleets
            </NavLink>
            <NavLink to="/contact" className="text-cards hover:text-black
             px-3 py-2">
              <button className="bg-cards hover:bg-secondary text-white lg:font-bold py-2 px-4 rounded">
                Contact Us
              </button>
            </NavLink>
            <NavLink to="/support" className="text-cards hover:text-black
             px-3 py-2">
              <button className="bg-cards hover:bg-secondary text-white lg:font-bold py-2 px-4  rounded">
                Customer Support
              </button>
            </NavLink>
            <Link to="/register" className="bg-cards hover:bg-secondary text-white lg:font-bold py-2 px-4 ml-3 lg:w-28 :w-28 rounded mt-3 lg:mt-0  lg:ml-4">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;



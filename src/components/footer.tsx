import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          {/* Organization Info */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">AniRental</h3>
            <p className="text-sm">Reach Us at</p>
            <p className="text-sm mt-2">Email: info@anirental.com</p>
            <p className="text-sm">Phone: +245797677629 </p>
          </div>

          {/* Newsletter Signup */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Get Monthly Updates</h3>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email here *"
                className="p-2 mb-2 border border-gray-300 rounded"
              />
              <NavLink to="/signup" className="text-sm hover:underline"><button className="bg-beige text-black p-2 rounded hover:bg-beige-dark transition duration-300">
                Sign Up!
              </button></NavLink>
            </form>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul>
              {['About', 'Support Us', 'Contact', 'Events'].map((link) => (
                <li key={link} className="mb-1">
                  <a href="#" className="text-sm hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center mt-8 space-x-4">
          {[FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram].map((Icon, index) => (
            <a key={index} href="#" className="text-gray-600 hover:text-gray-800">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
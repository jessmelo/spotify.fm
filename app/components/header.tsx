import React from "react";

const Header = () => {
  return (
    <header className="text-white py-4 px-8 flex justify-between items-center bg-orange-800">
      <h1 className="font-bold uppercase text-xl">Spotify.fm</h1>
      <nav>
        <ul className="flex space-x-4 text-xl text-rose-600">
          <li>
            <a href="/home" className="hover:text-gray-300 text-[#ffb9b9]">
              Home
            </a>
          </li>
          <li>
          <a href="/home" className="hover:text-gray-300 text-[#ffb9b9]">
              About
            </a>
          </li>
          <li>
          <a href="/home" className="hover:text-gray-300 text-[#ffb9b9]">
              Contact
            </a>
          </li>
          <li>
            <a href="/logout" className="hover:text-gray-300 text-[#ffb9b9]">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

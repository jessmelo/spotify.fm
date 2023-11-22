import React from "react";

const Header = () => {
  return (
      // write header component with tailwind that spans the width of the page and is fixed at the top
      <header className="py-4 px-8 flex justify-between items-center w-[100%] fixed top-0 bg-rose-300">
      <h1 className="font-bold uppercase text-xl">Spotify.fm</h1>
      <nav>
        <ul className="flex space-x-4 text-xl">
          <li>
            <a href="/home" className="hover:text-gray-300 text-[#000]">
              Home
            </a>
          </li>
          <li>
          <a href="/home" className="hover:text-gray-300 text-[#000]">
              About
            </a>
          </li>
          <li>
          <a href="/home" className="hover:text-gray-300 text-[#000]">
              Contact
            </a>
          </li>
          <li>
            <a href="/logout" className="hover:text-gray-300 text-[#000]">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

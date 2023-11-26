"use client";
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-2 px-4 sm:px-8 flex justify-between items-center w-full fixed top-0 bg-rose-300 z-10">

      <h1 className="font-bold uppercase text-lg sm:text-xl">Spotify.fm</h1>

      <button className="sm:hidden text-4xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ≡
      </button>

      <nav className={`${isMenuOpen ? 'absolute w-full left-0 top-full bg-rose-300' : 'hidden'} sm:static sm:block`}>
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-base sm:text-xl">
          <li className="border-b border-gray-500 sm:border-b-0">
            <a href="/home" className="hover:text-gray-300 text-[#000] block py-2 px-4">
              Home
            </a>
          </li>
          <li className="border-b border-gray-500 sm:border-b-0">
            <a href="/about" className="hover:text-gray-300 text-[#000] block py-2 px-4">
              About
            </a>
          </li>
          <li className="border-b border-gray-500 sm:border-b-0">
            <a href="/contact" className="hover:text-gray-300 text-[#000] block py-2 px-4">
              Contact
            </a>
          </li>
          <li className="border-b border-gray-500 sm:border-b-0">
            <a href="/logout" className="hover:text-gray-300 text-[#000] block py-2 px-4">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

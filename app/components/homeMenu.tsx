import React from "react";

const HomeMenu = () => {
    return (
        <div className="text-center w-full">
        <ul className="mt-2 ml-8 mr-8">
            <li className="py-4 bg-slate-700 mb-2 uppercase"><a href="/topArtists" className="text-orange-200">Top Artists</a></li>
            <li className="py-4 bg-slate-700 mb-2 uppercase hover:bg-slate-300"><a href="" className="text-orange-200">Top Songs</a></li>
            <li className="py-4 bg-slate-700 mb-2 uppercase"><a href="" className="text-orange-200">Top Genres</a></li>
        </ul>
        </div>
    );
}

export default HomeMenu;
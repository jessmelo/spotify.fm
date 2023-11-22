import React from "react";

const HomeMenu = () => {
    return (
        <div className="text-center w-full">
        <ul className="mt-2 ml-8 mr-8">
            <a href="/topArtists" className="text-orange-200">
            <li className="py-4 bg-slate-700 mb-2 uppercase hover:bg-slate-300">
                Top Artists
            </li>
            </a>
            <a href="/topTracks" className="text-orange-200">
            <li className="py-4 bg-slate-700 mb-2 uppercase hover:bg-slate-300">
                Top Tracks
            </li>
            </a>
            <a href="/topGenres" className="text-orange-200">
            <li className="py-4 bg-slate-700 mb-2 uppercase hover:bg-slate-300">
                Top Genres
            </li>
            </a>
        </ul>
        </div>
    );
}

export default HomeMenu;
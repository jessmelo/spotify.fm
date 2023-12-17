'use client';
import React from 'react';
  
  interface Song {
    id: string;
    name: string;
    album: {
      images: { url: string }[];
      name: string;
    };
    artists: { name: string }[];
}   
    
  interface TopSongsGridProps {
    songs: { items: Song[] } | null;
  }

const TopSongsGrid: React.FC<TopSongsGridProps> = ({ songs }) => {
    console.log(songs);
    return (
        <>        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {songs && songs.items.map((song, index) => (
            <div className="text-sm text-left" key={song.id || index}>
                <a key={song.id} href={`/song/${song.id}`}>
                <img src={song.album.images[0].url} className="max-w-full h-auto opacity-100 hover:opacity-80" />
                </a>
                <a key={song.id} className="text-rose-900 hover:text-rose-800" href={`/song/${song.id}`}>
                <h3 className="font-bold">{song.name}</h3>
                {song.artists.map((artist, index) => (
                    <h4 key={index}>{artist.name}</h4>
                ))}
                </a>
            </div>
            ))}
        </div>
        </>
    );
}

export default TopSongsGrid;
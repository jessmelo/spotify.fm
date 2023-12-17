'use client';
import React from 'react';

interface Artist {
    id: string;
    images: { url: string }[];
    name: string;
}
  
interface TopArtistsGridProps {
  artists: { items: Artist[] };
}

const TopArtistsGrid: React.FC<TopArtistsGridProps> = ({ artists }) => {
    return (
        <>        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {artists && artists.items.map((artist, index) => (
            <div className="text-sm text-left" key={artist.id || index}>
                <a key={artist.id} href={`/artists/${artist.id}`}>
                <img src={artist.images[0].url} className="max-w-full h-auto opacity-100 hover:opacity-80" />
                </a>
                <a key={artist.id} className="text-rose-900 hover:text-rose-800" href={`/artists/${artist.id}`}>
                <h3 className="font-bold">{artist.name}</h3>
                </a>
            </div>
            ))}
        </div>
        </>
    );
}

export default TopArtistsGrid;
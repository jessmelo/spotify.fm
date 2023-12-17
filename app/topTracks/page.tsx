import { Suspense } from "react";
import TopArtistsGrid from "../components/topArtistsGrid";
import React from "react";

async function TopTracksPage() {  
  return (    
    <div className="text-center">
      <h1 className='text-3xl'>Welcome to Spotify.fm</h1>
      <p>View your spotify data.</p>
        <Suspense fallback={<div>Loading...</div>}>
          <TopArtistsGrid />
        </Suspense>
      </div>
  );
};

export default TopTracksPage;
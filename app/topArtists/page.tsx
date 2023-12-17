import { Suspense } from "react";
import React from "react";
import TopArtistsData from "../components/topArtistsData";

async function TopArtistsPage() {
  return (    
    <div className="text-center">
      <h1 className='text-3xl'>Your Top Artists</h1>
        <Suspense>
          <TopArtistsData />
        </Suspense>
      </div>
  );
};

export default TopArtistsPage;
import { Suspense } from "react";
import React from "react";
import TopSongsData from "../components/topSongsData";

async function TopGenresPage() {  
  return (    
    <div className="text-center">
      <h1 className='text-3xl'>Your Top Genres</h1>
        <Suspense>
          <TopSongsData />
        </Suspense>
      </div>
  );
};

export default TopGenresPage;
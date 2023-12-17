import { Suspense } from "react";
import React from "react";
import TopGenresData from "../components/topGenresData";

async function TopGenresPage() {  
  return (    
    <div className="text-center">
      <h1 className='text-3xl'>Your Top Genres</h1>
      <h2 className='text-xl'>Coming soon!</h2>
        {/* <Suspense>
          <TopGenresData />
        </Suspense> */}
      </div>
  );
};

export default TopGenresPage;
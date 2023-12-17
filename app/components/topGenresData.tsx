'use client';
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import TimeRangeSelector from "./timeRangeSelector";
export const dynamic = "force-dynamic";

async function getTopGenres(timeRange: string) {
    console.log("Getting top genres...");
    try {
      const { data }  = await axios.get('/api/topGenres', {
          params: { time_range: timeRange },
      });


      return data;
    } catch (error) {
        console.error("Error fetching top genres.", error);
        return null;
    }
  }

async function TopGenresData() {
    const [topGenres, setTopGenres] = useState(null);
    const [loading, setLoading] = useState(true); 
    
    // Fetch top genres on initial page load
    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopGenres("medium_term");
            if (data) {
                setTopGenres(data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const handleTimeRangeChange = async (newTimeRange) => {
        setLoading(true);
        const data = await getTopGenres(newTimeRange);
        if (data) {
            setTopGenres(data);
            setLoading(false);
        } else {
            setLoading(false);
            setTopGenres(null);
        }
    };

    if (!topGenres && !loading) {
        return <div>Error fetching top genres.</div>;
    };

    return (
        <>
        <div className="flex justify-end">
            <TimeRangeSelector onTimeRangeChange={handleTimeRangeChange} />
        </div>

        <div className={`loading-container ${loading ? '' : 'hidden'}`}>
           <p>Loading...</p>
        </div>
        {topGenres}
        </>
    );
}

export default TopGenresData;
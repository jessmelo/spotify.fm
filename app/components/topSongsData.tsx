'use client';
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import TimeRangeSelector from "./timeRangeSelector";
import TopSongsGrid from "./topSongsGrid";

async function getTopSongs(timeRange: string) {
    console.log("Getting top songs...");
    try {
      const { data }  = await axios.get('/api/topSongs', {
          params: { time_range: timeRange },
      });
        return data;
    } catch (error) {
        console.error("Error fetching top artists.", error);
        return null;
    }
  }

async function TopSongsData() {
    const [topSongs, setTopSongs] = useState(null);
    const [loading, setLoading] = useState(true); 
    
    // Fetch top artists on initial page load
    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopSongs("medium_term");
            if (data) {
                setTopSongs(data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const handleTimeRangeChange = async (newTimeRange) => {
        setLoading(true);
        const data = await getTopSongs(newTimeRange);
        if (data) {
            setTopSongs(data);
            setLoading(false);
        } else {
            setLoading(false);
            setTopSongs(null);
        }
    };

    if (!topSongs && !loading) {
        return <div>Error fetching top artists.</div>;
    };

    return (
        <>
        <div className="flex justify-end">
            <TimeRangeSelector onTimeRangeChange={handleTimeRangeChange} />
        </div>

        <div className={`loading-container ${loading ? '' : 'hidden'}`}>
           <p>Loading...</p>
        </div>
        {!loading && <TopSongsGrid songs={topSongs} />} 
        </>
    );
}

export default TopSongsData;
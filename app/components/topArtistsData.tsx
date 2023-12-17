'use client';
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import TimeRangeSelector from "./timeRangeSelector";
import TopArtistsGrid from "./topArtistsGrid";

async function getTopArtists(timeRange: string) {
    console.log("Getting top artists...");
    try {
      const { data }  = await axios.get('/api/topArtists', {
          params: { time_range: timeRange },
      });
        return data;
    } catch (error) {
        console.error("Error fetching top artists.", error);
        return null;
    }
  }

async function TopArtistsData() {
    const [topArtists, setTopArtists] = useState(null);
    const [loading, setLoading] = useState(true); 
    
    // Fetch top artists on initial page load
    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopArtists("medium_term");
            if (data) {
                setTopArtists(data);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const handleTimeRangeChange = async (newTimeRange: string) => {
        setLoading(true);
        const data = await getTopArtists(newTimeRange);
        if (data) {
            setTopArtists(data);
            setLoading(false);
        } else {
            setLoading(false);
            setTopArtists(null);
        }
    };
    
    return (
        <>
        <div className="flex justify-end">
            <TimeRangeSelector onTimeRangeChange={handleTimeRangeChange} />
        </div>

        <div className={`loading-container ${loading ? '' : 'hidden'}`}>
           <p>Loading...</p>
        </div>
        
        {!loading && <TopArtistsGrid artists={topArtists} />}
        </>
    );
  }

export default TopArtistsData;
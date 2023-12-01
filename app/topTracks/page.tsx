import axios from "axios";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { refreshToken } from "../api/utils/auth";
import TimeRangeSelector from "../components/timeRangeSelector";
import React from "react";

async function getTopTracks(timeRange: string) {
  console.log("Getting top tracks...");
  const cookieStorage = cookies();
  const accessToken = cookieStorage.get('accessToken')?.value;
  try {
    const { data }  = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { time_range: timeRange },
    });

    if (data.status === 401) {
      const refreshed = await refreshToken();
        if (refreshed) {
          const newAccessToken = cookieStorage.get('accessToken')?.value;
          const { data }  = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: { Authorization: `Bearer ${newAccessToken}` },
            params: { time_range: timeRange },
        });
      return data;
    } else {
      throw new Error('Failed to refresh token');
    }}
    console.log("Got top tracks.");
   return data;
  } catch (error) {
      console.error("Error fetching top artists.");
      return null;
  }
}

async function TopArtists() {
  const topTracks = await getTopTracks("medium_term");

  if (!topTracks) {
    return <div>Error fetching top artists.</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {topTracks.items.map((track: any, index: number) => (
        <div className="text-sm text-left" key={index}>
          <img src={track.album.images[0].url} className="max-w-full h-auto" />
          <h3>{track.name}</h3>
          <h3>{track.artists[0].name}</h3>
          {/* <p>{track.genres.join(', ')}</p> */}
        </div>
      ))}
    </div>
  );
}

async function TopTracksPage() {
  let defaultTimeRange = 'medium_term';
  
  return (    
    <div className="text-center">
      <h1 className='text-3xl'>Welcome to Spotify.fm</h1>
      <p>View your spotify data.</p>
      <h1 className="text-left">Top Tracks</h1>

      <div className="flex justify-end">
        <TimeRangeSelector timeSelection={defaultTimeRange} />
      </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TopArtists />
        </Suspense>
      </div>
  );
};

export default TopTracksPage;
import axios from "axios";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { refreshToken } from "../api/utils/auth";
import React from "react";
import TopArtistsData from "../components/topArtistsData";
import TimeRangeSelector from "../components/timeRangeSelector";
import TopArtistsGrid from "../components/topArtistsGrid";
import { data } from "browserslist";

async function getTopArtists(timeRange: string) {
  console.log("Getting top artists...");
  const cookieStorage = cookies();
  const accessToken = cookieStorage.get('accessToken')?.value;

  try {
    const { data }  = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { time_range: timeRange },
    });

    if (data.status === 401) {
      const refreshed = await refreshToken();
        if (refreshed) {
          const newAccessToken = cookieStorage.get('accessToken')?.value;
          const { data }  = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: { Authorization: `Bearer ${newAccessToken}` },
            params: { time_range: timeRange },
        });
      return data;
    } else {
      throw new Error('Failed to refresh token');
    }}
    console.log("Got top artists.");
   return data;
  } catch (error) {
      console.error("Error fetching top artists.");
      return null;
  }
}

async function TopArtists(timeRange: string) {
  const topArtists = await getTopArtists(timeRange);
  if (!topArtists) {
    return <div>Error fetching top artists.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {topArtists.items.map((artist, index) => (
        <div className="text-sm text-left" key={index}>
          <a key={artist.id} href={`/artists/${artist.id}`}>
            <img src={artist.images[0].url} className="max-w-full h-auto opacity-100 hover:opacity-80" />
          </a>
          <a key={artist.id} className="text-rose-900 hover:text-rose-800" href={`/artists/${artist.id}`}>
            <h3 className="font-bold">{artist.name}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}

async function TopArtistsPage() {
  return (    
    <div className="text-center">
      <h1 className='text-3xl'>Welcome to Spotify.fm</h1>
      <p>View your spotify data.</p>
        <Suspense>
          <TopArtistsData />
        </Suspense>
      </div>
  );
};

export default TopArtistsPage;
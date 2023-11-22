import axios from "axios";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { refreshToken } from "../api/utils/auth";
import TimeRangeSelector from "../components/timeRangeSelector";

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
            headers: { Authorization: `Bearer ${accessToken}` },
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

async function TopArtists() {
  const topArtists = await getTopArtists("medium_term");

  if (!topArtists) {
    return <div>Error fetching top artists.</div>;
  }
  return (
    <div className="grid grid-cols-5 grid-rows-3 gap-4">
      {topArtists.items.map((artist: any, index: number) => (
        <div className="text-sm text-left" key={index}>
          <a key={artist.id} href={`/artists/${artist.id}`}>
            <img src={artist.images[0].url} className="max-w-full h-auto" />
          </a>
          <h3>{artist.name}</h3>
          <p>{artist.genres.join(', ')}</p>
          <p>{artist.popularity}</p>
        </div>
      ))}
    </div>
  );
}

async function TopArtistsPage() {
  let defaultTimeRange = 'medium_term';
  
  return (    
    <div className="text-center">
      <h1 className='text-3xl'>Welcome to Spotify.fm</h1>
      <p>View your spotify data.</p>
      <h1 className="text-left">Top Artists</h1>

      <div className="flex justify-end">
        <TimeRangeSelector timeSelection={defaultTimeRange} />
      </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TopArtists />
        </Suspense>
      </div>
  );
};

export default TopArtistsPage;
import axios from "axios";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { refreshToken } from "../../api/utils/auth";
import React from "react";

async function getArtistData(artistID: string) {
    console.log("Getting artist data...");
    const cookieStorage = cookies();
    const accessToken = cookieStorage.get('accessToken')?.value;

    try {
      const { data }  = await axios.get('https://api.spotify.com/v1/artists/' + artistID, {
          headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      if (data.status === 401) {
        const refreshed = await refreshToken();
          if (refreshed) {
            const newAccessToken = cookieStorage.get('accessToken')?.value;
            const { data }  = await axios.get('https://api.spotify.com/v1/artists/' + artistID, {
                headers: { Authorization: `Bearer ${newAccessToken}` },
          });
        return data;
      } else {
        throw new Error('Failed to refresh token');
      }}

      console.log("Got artist data.");
     return data;
    } catch (error) {
        console.error("Error fetching artist data.", error);
        return null;
    }
  }
  
async function Artist({ artistID }: { artistID: string }) {
    console.log("Getting artist data...");
    const artistData = await getArtistData(artistID);
  
    if (!artistData) {
      return <div>Error fetching artist.</div>;
    }
    return (
      <div className="flex">
        <div className="w-1/2">
          <img src={artistData.images[0].url} className="" />
        </div>
        <div className="w-1/2 px-4">
          <h1 className="text-4xl mb-4">{artistData.name}</h1>
          <h2 className="text-2xl mb-4">Genres</h2>
          <ul className="list-disc ml-8 text-left">
            {artistData.genres.map((genre: string) => (
              <li>{genre}</li>
            ))}
          </ul>
          <h2 className="text-2xl mb-4">Popularity</h2>
          <p>{artistData.popularity}</p>
        </div>
      </div>
    );
  }
    
async function ArtistPage({ params }: { params: { artist: string } }) {    
    let artistID = params.artist;
    return (    
      <div className="text-center">  
          <Suspense fallback={<div>Loading...</div>}>
            <Artist artistID={artistID} />
          </Suspense>
        </div>
    );
};
  
export default ArtistPage;
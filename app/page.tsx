import * as React from 'react';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

function checkLoginStatus() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  if (token?.value) {
    return true;
  }
  return false;
}

async function RootPage() {
  const isLoggedIn = checkLoginStatus();

  if (isLoggedIn) {
    redirect("/home");
  }

  return (    
    <div id="container" className="max-w-4xl justify-center rounded-2xl text-center mt-10">
      <h1 className='text-3xl'>Welcome to Spotify.fm</h1>
      <p>View your spotify data and learn more about your music taste.</p>
      <div className='flex place-content-center'>
          <a href="/login" className="p-2 mt-5 uppercase cursor-pointer text-cyan-50 hover:text-cyan-800 w-3/5 rounded-full bg-green-500">
          Login With Spotify
          </a>
      </div>
    </div>
  );
};

export default RootPage;
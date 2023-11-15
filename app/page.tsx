'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

function RootPage() {
  const router = useRouter();

  const handleLogin = () => {   
    router.push('/login');  
  };


  React.useEffect(() => {
    fetch('/login/checkLoginStatus')
      .then(response => response.json())
      .then(data => {
        if (data.isLoggedIn) {
          router.push('/home');
        }
      });
  }, []);

  return (    
    <div id="container" className="max-w-4xl justify-center rounded-2xl text-center">
      <h1 className='text-3xl'>Welcome to Spotify.fm</h1>
      <p>View your spotify data and learn more about your music taste.</p>
      <div className='flex place-content-center'>
      <p onClick={handleLogin} 
      className="p-2 mt-5 uppercase cursor-pointer hover:text-cyan-800 bg-orange-500 w-3/5 rounded-full">
        Login With Spotify</p>
        </div>
    </div>
  );
};

export default RootPage;
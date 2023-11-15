'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import HomeMenu from '../components/homeMenu';

function HomePage() {
  const router = useRouter();

  return (    
    <div className="text-center">
      <h1 className='text-3xl'>Welcome to Spotify.fm</h1>
      <p>View your spotify data.</p>

      <HomeMenu />
    </div>
  );
};

export default HomePage;
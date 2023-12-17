import React from 'react';
import Header from '../components/header';

export default function TopGenresLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <div>
        <Header />
        <div id="container" className="max-w-4xl mb-10 mt-20 rounded-2xl">
          {children}
        </div>
      </div>
  )
}

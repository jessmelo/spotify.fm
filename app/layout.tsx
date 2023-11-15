import React from 'react';
import { Ysabeau } from 'next/font/google';
import './styles/globals.css';
import './public/css/style.css';

export const metadata = {
  title: 'Spotify.FM',
  description: 'View your Spotify data.',
}

const ysabeau = Ysabeau({
  subsets: ['latin'],
  display: 'swap',
})

//@ts-ignore
global.performance = global.performance || {
  now: () => new Date().getTime(),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ysabeau.className}>
      <body>
        {children}
      </body>
    </html>
  )
}

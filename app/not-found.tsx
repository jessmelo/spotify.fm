import Link from 'next/link'
import React from 'react'
 
export default function NotFound() {
  return (
    <div>
    <div id="container" className="max-w-4xl justify-center rounded-2xl text-center mt-10">
        <h2 className="font-bold">404 - Not Found</h2>
        <p>Could not find page! :(</p>
        <Link href="/">Return to Home</Link>
      </div>
    </div>
  )
}
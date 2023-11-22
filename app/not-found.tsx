import Link from 'next/link'
import React from 'react'
 
export default function NotFound() {
  return (
    <div>
    <div id="container" className="max-w-4xl justify-center rounded-2xl text-center mt-10">
        <h2>404 - Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}
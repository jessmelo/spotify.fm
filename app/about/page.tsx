import React from "react";

async function AboutPage() {  
  return (    
    <div className="text-center">
      <h1 className='text-3xl mb-4'>About Spotify.FM</h1>

        <p>This website was built by 
            <a href="https://github.com/jessmelo/" target="_blank"> Jéssica Melo </a>
             with the wonderful 
            <a href="https://developer.spotify.com/documentation/web-api/" target="_blank"> Spotify API.</a>
        </p>
        
        <p>Find me on:
            <a href="https://www.linkedin.com/in/jessica-pmelo/" target="_blank"> LinkedIn</a> or
            <a href="https://github.com/jessmelo/" target="_blank"> GitHub</a>.
        </p>
      </div>
  );
};

export default AboutPage;
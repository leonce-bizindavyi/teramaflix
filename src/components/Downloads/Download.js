import React, { useState, useEffect } from 'react';
import Cached from '../Cacheds/Cached';

const CachedVideos = () => {
  const [cachedVideos, setCachedVideos] = useState([]);
  useEffect(() => {
    const cacheName = 'downloaded-videos-cache';
      const getCachedVideos= async () => {
        try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        const videoUrls = Array.from(keys).filter((key) =>key.url.endsWith('_data'));
        const videos = await Promise.all(videoUrls.map(async (url) => {
          const response = await cache.match(url);
          const videoInfo = JSON.parse(await response.text());
          return videoInfo
        }));
        setCachedVideos([...videos].reverse())
      } catch (error) {
          console.error('Error loading cached videos:', error);
        }
      }
      getCachedVideos()
  }, []);


  return (
    <div className="Uploads flex flex-col w-full h-full bg-white rounded-3xl">
      <div className="uploadsContainer w-full h-full pt-6 overflow-y-auto">
        {cachedVideos.length > 0 && cachedVideos.map((video, index) => (
          <React.Fragment key={video.url}>
            <Cached key={video.url} video={video} />
            {index === cachedVideos.length - 1 && <hr className="mb-5" />} 
          </React.Fragment>
        ))}
      </div>
    </div> 
  );
};

export default CachedVideos;

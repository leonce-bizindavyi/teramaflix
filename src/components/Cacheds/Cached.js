import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Cached({ video }) {
  const [online, setOnline] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [profBlobUrl, setProfBlobUrl] = useState(null);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    setOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    const getThumbnailFromCache = async () => {
      try {
        const cache = await caches.open('downloaded-videos-cache');
        const response = await cache.match(`/Thumbnails/${video.Image}`);
        if (response) {
          const blob = await response.blob();
          setThumbnailUrl(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error('Error fetching thumbnail from cache:', error);
      }
    };

    if (!online && video && video.Image) {
      getThumbnailFromCache();
    }
    

    const fetchProfile = async (photo) => {
      try {
        if (photo && !online) {
          const cache = await caches.open('mon-site-logo')
          const response = await cache.match(`/Thumbnails/${photo}`);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setProfBlobUrl(blobUrl);
        } else {
          const cache = await caches.open('mon-site-logo');
          const response =await cache.match('/img/logo.png');
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setProfBlobUrl(blobUrl);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchProfile(video.Photo)
  }, [online, video]);


  

  return (
    <>
      <div className="video1 flex flex-row w-full justify-between md:px-6 mb-6 cursor-pointer" >
        <div className="flex flex-col m-0 md:flex-row h-[260px] md:h-[150px] bg-gray-100 space-x-1 md:space-x-5 w-[100%] md:w-[80%] md:rounded-2xl">
          <div className=" w-[250px] h-[210px] md:h-[150px] md:rounded-2xl overflow-hidden">
            <Link href={`/Watch?v=${video.uniid}`}>
              {thumbnailUrl ? (
                <Image
                  width={100}
                  height={100}
                  src={thumbnailUrl}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              ) : (
                <Image
                  width={100}
                  height={100}
                  src={`/Thumbnails/${video.Image}`}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              )}
            </Link>
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-[1rem] md:text-[1.5rem]">{video.Title}</h1>
            <p className="text-sm md:text-base">{video.Body ? video.Body.split('\n').slice(0, 2).join('\n') : ''}</p>
            <Link href={`/profile?c=${video.Uuid}`}>
              <div className="description flex items-center text-sm">
                {video.Photo ?
                <Image
                width={80}
                height={80}
                alt="profile"
                className="lg:w-10 w-8 lg:h-10 h-8 my-1 ml-15 rounded-full"
                src={online || !profBlobUrl ? `/Thumbnails/${video.Photo}`: profBlobUrl}
              />
                :
                <Image
                  width={80}
                  height={80}
                  alt="profile"
                  className="lg:w-10 w-8 lg:h-10 h-8 my-1 ml-15 rounded-full"
                  src={online || !profBlobUrl ? `/img/logo.png`: profBlobUrl}
                />
                }
                
                <p className="nom ml-2">{video.page}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cached;

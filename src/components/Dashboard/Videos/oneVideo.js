import Link from 'next/link'
import Image from "next/image";
import { useState, useEffect } from 'react'
import ImageComp from '@/components/ImageComp';

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function OneVideo({ video, handleClick }) {


  return (
    <>
      <div className="videocontainer ">
        <div className="imag w-[270px] h-[170px] rounded  overflow-hidden">
          <Link onClick={() => handleClick(video.uniid)} href={`/dashboard/video?w=${video.uniid}`}>
            <ImageComp src={video.Image} w={800} h={800} a={'video'} />
          </Link>
        </div>

        <Link href="">
          <div className="flex space-x-2 items-center justify-start mb-4">
            {
              video.Photo ?
                <Image width={100} height={100}
                  src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Photo}`}
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                  className="lg:w-9 w-9 lg:h-9 h-9 my-1 ml-15 rounded-full " alt="profil" />
                :
                <Image width={100} height={100} src={`/img/logo.png`}
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                  className="lg:w-9 w-9 lg:h-9 h-9 my-1 ml-15 rounded-full " alt="profil" />
            }
            <div className="flex flex-col  space-y-2">
              <div className="right-1">
                <h10 title={video.Title} className="text-sm font-medium">{truncateText(video.Title, 25)}</h10>
                <span className="text-sm mt-2"> {video.Nom} </span>
              </div>
            </div>
          </div>
        </Link>

      </div>

    </>
  )
}

export default OneVideo;
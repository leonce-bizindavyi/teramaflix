import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImageComp from '../ImageComp'

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function Video({ video }) {
  return (
    <>
      <div className=" ">
        <div className="imag w-[100%] h-[170px] rounded  overflow-hidden">
          {
            video.Short == 1 ?
              <Link href={`/short`}>
                <ImageComp src={video.Image} w={800} h={800} a={'video'} />
              </Link>
              :
              <Link href={`/Watch?v=${video.uniid}`}>
                <ImageComp src={video.Image} w={800} h={800} a={'video'} />
              </Link>
          }
        </div>
        <Link href={`/profile?c=${video.Uuid}`}>
          <div className=" flex space-x-1 justify-start mb-4">
            {
              video.Photo ?
                <Image width={500} height={500} alt='profile'
                  className=" w-10  h-10 my-1 ml-15 rounded-full "
                  src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Photo}`}
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                :
                <Image width={500} height={500} alt='profile'
                  className=" w-10  h-10 my-1 ml-15 rounded-full "
                  src={`/img/logo.png`}
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
            }
            <div className="flex flex-col  space-y-2">
              <div className="right-1">
              <h1 title={video.Title} className="dark:text-white font-bold text-slate-900 text-lg ml-2 mb-2 sm:ml-0">{truncateText(video.Title, 25)}</h1>
                <span className="dark:text-white text-sm">{video.PageName}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Video
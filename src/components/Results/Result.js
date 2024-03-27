import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ImageComp from '../ImageComp'
function Result({ video }) {

  return (
    <>
      <div className="video1 flex flex-row w-full  justify-between md:px-6 mb-6 cursor-pointer ">
        <div className="dark:bg-slate-700 flex flex-col m-0 md:flex-row h-[260px] md:h-[150px]    bg-gray-100 space/-x-1 md:space-x-5 w-[100%] md:w-[80%] md:rounded-2xl  ">
          <div className=" bg-gray-200   w-full md:w-[250px] h-[210px] md:h-[150px] md:rounded-2xl   overflow-hidden">
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
          <div className="flex flex-col">
            <h1 className="dark:text-white font-semibold text-[1rem] md:text-md text-black">{video.Title}</h1>
            <p className="dark:text-white text-sm md:text-base">{video.Body.split('\n').slice(0, 2).join('\n')}</p>
            <Link href={`/profile?c=${video.Uuid}`}>
              <div className="description flex items-center  text-sm">
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
                <p className="dark:text-white nom ml-2" >{video.PageName}</p>
              </div>
            </Link>
          </div>

        </div>

      </div>
    </>
  )
}

export default Result
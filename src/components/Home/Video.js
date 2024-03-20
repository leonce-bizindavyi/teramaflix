import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { usePeriod } from '../Hooks/usePeriod'
import Image from 'next/image'
import ImageComp from '../ImageComp'
import LightMode from '../Theme/Mode'
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

//handle update time format
function formatTime(time) {
  const hours = Math.floor(time / 3600);
  time %= 3600;

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += hours < 10 ? `0${hours}:` : `${hours}:`;
  }

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  formattedTime += `${formattedMinutes}:${formattedSeconds}`;

  return formattedTime;
}

function Video({video}) {
  const period = usePeriod(video.Created_at)
  return (
    <>
       <div className='dark:bg-medium dark:border-2 dark:border-slate-800 bg-white rounded-md '>
        
          <div className="imag relative w-[100%] sm:h-[170px] h-[220px] flex justify-center items-center  sm:rounded bg-gray-300  overflow-hidden">
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
             {video.Time>0 && (<span className='bg-black bg-opacity-70 text-white text-sm  absolute left-2 bottom-1 px-1 rounded-md'>{formatTime(video.Time)}</span> ) }
          </div>
          <div className='dark:bg-medium id  py-2 pl-4'>
          <h1 title={video.Title} className="dark:text-white font-bold text-slate-900 text-lg ml-2 mb-2 sm:ml-0">{truncateText(video.Title, 25)}</h1>
            <Link href={`/profile?c=${video.Uuid}`}>
            <div className="flex gap-2 justify-start mb-4  ml-2 sm:ml-0">
              {
                  video.Photo ? 
                  <Image width={500} height={500} alt='profile' 
                  className=" w-10  h-10 my-1 ml-15 rounded-full " 
                  src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Photo}`}
                  priority={true} placeholder='blur' 
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)"/>
                  :
                  <Image width={500} height={500} alt='profile' 
                  className=" w-10  h-10 my-1 ml-15 rounded-full " 
                  src={`/img/logo.png`} 
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)"/>
                }
            <div className="flex flex-col  space-y-2">
                <div className="right-5">
                    <div className="dark:text-white text-md text-slate-900 opacity-90  font-bold">{video.PageName}</div>
                    <span className="dark:text-white text-xs text-slate-900 opacity-70 font-semibold">{video.Views} Views  {period}</span>
                </div>
            </div>
            </div>
        </Link>
          </div>
          
    </div> 
    </>
  )
}

export default Video
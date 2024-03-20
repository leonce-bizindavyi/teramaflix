import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ImageComp from '../ImageComp';

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

function Slide({ video }) {
  return (
    <>
      <div className='flex justify-center'>
        <div className="dark:bg-medium swiper-slide ">
          <div className="dark:border-2 dark:border-slate-800 pb-4">
            <div className="dark:bg-medium imag sm:h-[170px] h-[250px]  flex justify-center items-center bg-white rounded overflow-hidden">
              <Link href={`/Watch?v=${video.uniid}`}>
                <ImageComp src={video.Image} w={400} h={400} a={'video'} />
              </Link>
              {/* {video.Time>0 && (<span className='bg-black bg-opacity-70 text-white text-sm  absolute left-2 bottom-28 px-1 rounded-md'>{formatTime(video.Time)}</span> ) } */}
            </div>
            <p title={video.Title} className="dark:text-white font-bold text-slate-900 text-base">{truncateText(video.Title, 17)}</p>
            <Link href={`/profile?c=${video.Uuid}`}>
              <div className="flex flex-row justify-center items-center space-x-2 mb-4 ">
                <div>
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
                      src={`/img/logo.png`} priority={true}
                      placeholder='blur'
                      blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                }
                </div>
                  <div className="h-full flex  justify-center items-center">
                    <h1 className="dark:text-white text-sm text-slate-900 opacity-80  font-semibold">{video.PageName}</h1><br />
                  </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Slide
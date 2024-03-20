import Image from 'next/image'
import React from 'react'

function Comment({ comment }) {
  return (
    <>
      <div className='flex space-x-2'>
        <div className='w-[2.6rem] h-[2rem] rounded-full'>
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
        </div>
        <div className='flex-col w-[18.5rem] rounded-sm bg-gray-100 p-2'>
          <span className='text-lg font-bold'>{comment.PageName}</span>
          <p className=''>
            {comment.Body}
          </p>

        </div>
      </div>
    </>
  )
}

export default Comment
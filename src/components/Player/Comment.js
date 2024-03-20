import Image from 'next/image'
import React from 'react'

function Comment({comment}) {
  return (
    <>
       <div className="userComment flex flex-row space-x-1  mb-5">
            <div className="userProfil  cursor-pointer w-[10%] ">
            {
              comment.Photo ?
                <Image width={500} height={500} alt='profile'
                  className=" w-10  h-10 my-1 ml-15 rounded-full "
                  src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${comment.Photo}`}
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
            <div className="userTextComment bg-blue-500 max-w-[90%] rounded-lg px-[20px] py-[6px]">
                <h5 className="userName font-semibold">{comment.PageName}</h5>
                <p className="leading-[1rem]">{comment.Body}</p>
            </div>
        </div> 
    </>
  )
}

export default Comment
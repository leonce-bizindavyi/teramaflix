import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
function Sub({ page }) {
  const router = useRouter()
  const [profBlobUrl, setProfBlobUrl] = useState('/img/logo.png');
  const handleView = (uuid) => {
    router.push(`/profile?c=${uuid}`)
  }
  

  if (!page) return null
  return (
    <>
      <div className="dark:bg-slate-700 bg-gray-200 grid grid-cols-1 w-52 h-64 mt-6 rounded-lg">
        <div className="h-[4.8rem] w-[4.8rem] lg:w-[7rem] lg:h-[7rem] rounded-full mx-auto py-4">
          {
            page.Photo ?
              <Image width={500} height={500} alt='profile'
                className="rounded-full w-full h-[4.8rem] lg:h-[7rem]"
                src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${page.Photo}`}
                priority={true} placeholder='blur'
                blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
              :
              <Image width={500} height={500} alt='profile'
                className="rounded-full w-full h-[4.8rem] lg:h-[7rem]"
                src={`/img/logo.png`}
                priority={true} placeholder='blur'
                blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
          }

        </div>
        <div className='mb-1  flex-col space-y-2'>
          <label className="dark:text-white text-blue-700 flex justify-center font-bold">{page.PageName}</label>
          <label className="dark:text-white flex justify-center  text-blue-600 p-1">{page.Abonnes} subscribers</label>
          <div className="dark:bg-slate-600 dark:hover:bg-slate-500 cursor-pointer flex justify-center mx-auto bg-blue-600 rounded-md w-[6rem] h-[2rem] hover:bg-blue-700">
            <button onClick={() => handleView(page.uniid)} className="font-bold text-white">View</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sub
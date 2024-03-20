import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

function User({ user }) {
  return (
    <>
      <Link href={`/dashboard/users?user=${user.uniid}`}>
        <div className="user1 flex flex-row justify-between items-center px-6 mb-6 cursor-pointer">
          <div className="flex flex-row items-center space-x-3">
            <div className=" w-10 h-10 xl:w-12 xl:h-12 rounded-full overflow-hidden">
              {
                user.Photo ?
                  <Image width={100} height={100}
                    src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${user.Photo}`}
                    priority={true} placeholder='blur'
                    blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                    className="lg:w-9 w-9 lg:h-9 h-9 my-1 ml-15 rounded-full " alt="profil" />
                  :
                  <Image width={100} height={100} src={`/img/logo.png`}
                    priority={true} placeholder='blur'
                    blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                    className="lg:w-9 w-9 lg:h-9 h-9 my-1 ml-15 rounded-full " alt="profil" />
              }
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold">{user.PageName} </h1>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default User
import React,{useState,useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePeriod } from '@/components/Hooks/usePeriod'
function TimeAgo(Created){
  const period = usePeriod(Created)
  return period
}
function Details({handleActive,users}) {  
const [isActive,setIsActive]=useState(false)
useEffect(() => {
  if(users && users.Actif === 1){
    setIsActive(true)
  }
}, [users])
if (!users) {
  return null
}

const period = TimeAgo(users.Created_at)

  return (
    <>
      <div  className="userinfo xl:w-[60%] bg-white xl:full flex flex-col mb-5  rounded-3xl" id="userINFO">
        <div  className="flex felx-row justify-center w-full mt-5">
            <div  >
            {
                users.Photo ?
                  <Image width={100} height={100}
                    src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${users.Photo}`}
                    priority={true} placeholder='blur'
                    blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                    className='w-36 h-36  xl:w-40 xl:h-40 rounded-full overflow-hidden' alt="profil" />
                  :
                  <Image width={100} height={100} src={`/img/logo.png`}
                    priority={true} placeholder='blur'
                    blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                    className='w-36 h-36  xl:w-40 xl:h-40 rounded-full overflow-hidden' alt="profil" />
              }
            </div>
        </div>
        <div  className="userDetails p-8 xl:p-20 flex flex-row justify-between w-full ">
            <div  className="info text-lg xl:text-xl font-semibold space-y-3 w-[70%] xl:w-[40%]">
                <div  className=""><span>Username</span> : <span>
                {users.PageName}
                    </span></div>
                <div  className=""><span>Channel</span> : <span>{users.PageName}</span></div>
                <div  className=""><span>Type</span> : <span>Music</span></div>
                <div  className=""><span>Joined at</span> : <span> {period}</span></div>
                <div  className=""><span>Statut</span> : {isActive ? <span  className="status text-green-500 ">Enabled</span> : <span   className="status text-red-500 ">Disabled</span>} </div>
            </div>
            <div  className="btn  w-[25%] xl:w-[50%] ">
              <div  className="bg-gray-100 p-4 flex flex-col xl:flex-row justify-between items-center rounded-2xl space-y-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-7 h-7 xl:w-10 xl:h-10 cursor-pointer">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>  
                    <Link href={`/dashboard/sms?user=${users.uniid}`}>                          
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-7 h-7 xl:w-10 xl:h-10 cursor-pointer">
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                    </Link>  
                    { isActive ?
                      <button onClick={()=>{setIsActive(!isActive); handleActive(!isActive,users.user_id)}} className="btnStatu text-lg xl:text-xl font-semibold cursor-pointer bg-[#3378FF] text-white shadow-xl p-1 xl:p-2 rounded-xl">Desactive</button>
                    :
                      <button onClick={()=>{setIsActive(!isActive); handleActive(!isActive,users.user_id)}} className="btnStatu text-lg xl:text-xl font-semibold cursor-pointer bg-[#3378FF] text-white shadow-xl p-1 xl:p-2 rounded-xl">Active</button>
                    }
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Details
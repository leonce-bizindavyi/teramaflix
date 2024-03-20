import Dashboard from '@/components/Dashboard/Home/Dashboard'
import AdminSide from '@/components/Navs/AdminSide'
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

function DashboardPage() {
  return (
    <>
      <Dashboard />
    </>
  )
}

function DashboardLayout({ page }) {
  const router = useRouter()
  const [isClose, setClose] = useState(true)
  const [active, setActive] = useState("active")
  const [margin, setMargin] = useState(60)
  const [auto, setAuto] = useState()
  
  useEffect(() => {
    async function decodeJWT(token) {
      try {
        const decoded = jwt.decode(token);
        return setAuto(decoded);
      } catch (error) {
        console.error('Error decoding JWT:', error);
        
      }
    }
  
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        decodeJWT(token);
      }else{
        setAuto('unlogged')
      }
    }
  }, [typeof window !== 'undefined' && localStorage.getItem('token')]);
  

  const handleAside = (status) => {
    if (status) {
      setActive('')
      setMargin(230)
    } else {
      setActive('active')
      setMargin(60)
    }
  }
if(!auto) return null
else  if(auto === 'unlogged' || auto.Admin === 0) router.back()
else
  return (
    <>
      <div className="wrapper relative w-full h-full flex flex-row px-2 md:px-6 bg-gray-100 overflow-x-hidden">
        <AdminSide active={active} />
        <div style={{ marginLeft: `${margin}` + 'px' }} className="containeradm w-full h-[100%] sm:px-6 mt-6 bg-g/ray-100 flex flex-col justify-center ">

          <div className="userHead flex flex-row justify-between items-center px-6 w-full h-[60px] md:h-[70px] bg-white rounded-3xl">
            <div className="flex flex-row items-center  space-x-2">
              <div onClick={() => { setClose(!isClose); handleAside(!isClose) }} className="menuCloser cursor-pointer z-50 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 md:w-10 md:h-10 font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <h1 className="font-bold text-[#9442FE] text-[1.2rem] md:text-[1.5rem]">Dashboard</h1>
            </div>
            <div className="profil w-9 h-9 md:w-12 md:h-12 rounded-full overflow-hidden">
              {auto.Photo ?
                <Image title={auto.pageName} src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${auto.Photo} `} width={100} height={100} className="" alt="profil" />
                :
                <Image title={auto.PageName} src="/img/logo.png" width={100} height={100} className="" alt="profil" />
              }
            </div>
          </div>
          {page}
        </div>
      </div>
    </>
  )
}

DashboardPage.getLayout = function pageLayout(page) {
  return <DashboardLayout page={page} />
}

export default DashboardPage
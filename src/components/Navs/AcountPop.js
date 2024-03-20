import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
function AcountPop({ auto }) {
  const router = useRouter()
  const handleLoggout = async () => {
    localStorage.removeItem('token')
    router.push('/login')

  }
  const [switched, toggleSw] = useState()
  const [pages, setPages] = useState([])
  useEffect(() => {
    if (auto && auto !== 'unlogged') {
      console.log(auto)
      const fetchPages = async () => {
        const response = await fetch(`/api/users/${auto.User}`)
        const data = await response.json()
        if (data[0]) setPages(data)
      }
      fetchPages()
    }
  }, [auto])

  
  const handleSwitcAccBtn = async (page) => {
    const session = page
    session.Active = auto.Active
    session.Admin = auto.Admin
    session.Mail = auto.Mail
    session.User = auto.User
    delete session.user_id
    const response = await fetch('/api/users/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });
    if(response.ok){
      const {success,token} = await response.json();
      if(success){
        localStorage.setItem('token',token )
        router.reload()
      }
    }
  }
  return (
    <>
      <div id="setMenu" className="dark:bg-medium absolute right-0 lg:fixed top-10 z-30 mt-4 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:right-0 lg:right-0" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
        <div className="py-1 w-full" role="none">
          {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
          <div className='Accounts'>
            <Link href={`/profile?c=${auto.uniid}`} className="flex flex-col items-center dark:hover:bg-slate-700 hover:bg-gray-300 hover:border-1 hover:border-gray-400 w-100 justify-start px-3">
              {auto.Photo ?
                <Image width={500} height={500} className="w-8 h-8 rounded-full" title={`${auto.PageName}`}
                  src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${auto.Photo}`} alt='profile' />
                :
                <Image width={500} height={500} className="w-8 h-8 rounded-full" title={`${auto.PageName}`}
                  src={`/img/logo.png`} alt='profile' />
              }
              <h1 className="dark:text-white block px-2 py-2 text-sm text-gray-700" id="menu-item-0">{auto.PageName}</h1>
            </Link>
            <div className='switchAccounts flex flex-col space-y-2  '>
              <div className='dark:hover:bg-slate-700 flex flex-row space-x-2 items-center justify-center hover:bg-gray-300 hover:border-1 hover:border-gray-400 mx-auto'>
                <h1 className='dark:text-white text-sm'>switch accounts</h1>
                {switched ?

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onMouseOver={() => toggleSw(false)} className="dark:text-white dark:bg-slate-700 dark:hover:bg-medium w-6 h-6 rounded-full p-1 cursor-pointer bg-gray- hover:bg-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                  </svg>

                  :

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onMouseOver={() => toggleSw(true)} className="dark:text-white dark:bg-slate-700 dark:hover:bg-medium w-6 h-6 rounded-full p-1 cursor-pointer bg-gray- hover:bg-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                }
              </div>
              <div className={`dark:bg-slate-700 othersAccounts bg-gray-300 w-max rounded-md mx-auto ${switched ? '' : 'hidden'}`}>
                {
                  pages.map((page) => {
                    return (
                      <div onClick={()=>handleSwitcAccBtn(page)} key={page.ID} className="dark:hover:bg-slate-600 flex flex-row items-center cursor-pointer hover:bg-gray-100 hover:border-1 hover:border-gray-400  justify-center px-3">
                        {page.Photo ?
                          <Image width={500} height={500} className="w-6 h-6 rounded-full" title={`${page.PageName}`}
                            src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${page.Photo}`} alt='profile' />
                          :
                          <Image width={500} height={500} className="w-6 h-6 rounded-full" title={`${page.PageName}`}
                            src={`/img/logo.png`} alt='profile' />
                        }
                        <h1 className="dark:text-white block px-2 py-2 text-sm text-gray-700" id="menu-item-0">{page.PageName}</h1>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <Link href="/settings" className="dark:hover:bg-slate-700 flex flex-row items-center hover:bg-gray-300 hover:border-1 hover:border-gray-400 justify-start px-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="dark:text-white h-7 w-7 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
            </svg>
            <h1 className="dark:text-white block px-2 py-2 text-sm text-gray-700" id="menu-item-1">Settings </h1>
          </Link>
          <Link href="/channel/create" className="dark:hover:bg-slate-700 flex flex-row items-center hover:bg-gray-300 hover:border-1 hover:border-gray-400 justify-start px-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="dark:text-white h-7 w-7 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
            <h1 className="dark:text-white block px-2 py-2 text-sm text-gray-700" id="menu-item-1">Create Channel</h1>
          </Link>
          <div className="dark:hover:bg-slate-700 flex flex-row items-center hover:bg-gray-300 hover:border-1 hover:border-gray-400 justify-start px-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="dark:text-white h-7 w-7 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <div><button type="submit" onClick={() => handleLoggout()} className="dark:text-white block w-full px-2 py-2 text-left text-sm text-gray-700" role="" tabIndex="-1" id="menu-item-3">Sign out</button></div>
          </div>

        </div>
      </div>
    </>
  )
}

export default AcountPop
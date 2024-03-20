import React from 'react'
import Link from 'next/link'
function Sidebar({sideAll}) {
    return (
        <>
          <div className={`aside  ${sideAll} dark:bg-medium dark:border-t-medium dark:border-x-medium pt-5 border-4 rounded-md border-x-white border-t-blue-500  bg-white h-full z-20 md:flex flex-col space-y-6crans `}>
          <Link href="/">
            <div className="dark:hover:text-red-600 l hover:bg-gray-200 rounded h-[2.5rem] flex flex-row space-x-4 items-center pl-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                  <h3 className="dark:text-white dark:hover:text-medium text-xsm lg:text-lg font-medium hover:text-blue-500">Home</h3>
            </div>
          </Link>
          <Link href="/categorie">
            <div className="dark:hover:text-red-600 hover:bg-gray-200 rounded h-[2.5rem] flex flex-row space-x-4 items-center pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  >
                    <path strokeLinejoin="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                    <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
                  </svg>
                <h3 className="dark:text-white  dark:hover:text-medium text-xsm lg:text-lg font-medium hover:text-blue-500">Categories</h3>
            </div>
          </Link>
            
            <Link href="/Sub">
              <div className="dark:hover:text-red-600 hover:bg-gray-200 rounded h-[2.5rem] flex flex-row space-x-4 items-center pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                    <path strokeLinejoin="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                <h3 className="dark:text-white  dark:hover:text-medium text-xsm lg:text-lg font-medium hover:text-blue-500 ">Subscribers</h3>
              </div>
            </Link>
            <Link href="/history">
              <div className="dark:hover:text-red-600 hover:bg-gray-200 rounded h-[2.5rem] flex flex-row space-x-4 items-center pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                    <path strokeLinejoin="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                    <path strokeLinejoin="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>
                <h3 className="dark:text-white  dark:hover:text-medium text-xsm lg:text-lg font-medium hover:text-blue-500">History</h3>
              </div>
            </Link>
            <Link href="/short">
              <div className="dark:hover:text-red-600 hover:bg-gray-200 rounded h-[2.5rem] flex flex-row space-x-4 items-center pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='h-[4rem] w-[1rem]' >
                <path d="M21 3H3a2.002 2.002 0 00-2 2v14a2.002 2.002 0 002 2h18a2.002 2.002 0 002-2V5a2.002 2.002 0 00-2-2zM9.5 17.5v-11l8 5.5-8 5.5z"/>
              </svg>
                <h3 className="dark:text-white  dark:hover:text-medium text-xsm lg:text-lg font-medium hover:text-blue-500">Short</h3>
              </div>
            </Link>
            
         </div>
        </>
      )
}

export default Sidebar

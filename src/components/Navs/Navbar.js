import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'
import { SessionContext } from '../context/Auth'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SearchDrop from './SearchDrop'
import SmDrop from './smDrop'
import AcountPop from './AcountPop'
import { useRef } from 'react';
import LinearIndeterminate from '../Bar'
import { formatDistanceToNow, parseISO } from 'date-fns';
import LightMode from '../Theme/Mode'

function Navbar(props) {
  const router = useRouter()
  const auto = useContext(SessionContext)
  const [searchd, setSearchd] = useState("")
  const [acPop, setAcPop] = useState(false)
  const [searches, setSearches] = useState()
  const [sideAll, setSideAll] = useState('active')
  const [smSearch, setSmSearch] = useState(false)
  const [notif_pop, setpop_notif] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifCounter, setNotifCounter] = useState(0);
  const [liste_notification, setliste] = useState([]);
  const compoRef = useRef(null);
  const sideBarRef = useRef(null);
  const notifRef = useRef(null);
  const SearchInput2Ref = useRef(null);
  const [profBlobUrl, setProfBlobUrl] = useState(null);
  const [logo1, setLogo1] = useState(null)
  const [logo2, setLogo2] = useState(null)
  const [online, setOnline] = useState(true);

  
  useEffect(()=>{
    const handleOnlineStatusChange = () =>{
      setOnline(navigator.onLine);
    };

    window.addEventListener('online',handleOnlineStatusChange);
    window.addEventListener('offline',handleOnlineStatusChange);
    setOnline(navigator.onLine);
    return () =>{
      window.removeEventListener('online' ,handleOnlineStatusChange);
      window.removeEventListener('offline',handleOnlineStatusChange);
    }

  },[]);



  const handleSideAll = () => {
    if (sideAll === 'active') {
      setSideAll('')
      props.sideAllOpened(true)
    }
    else {
      setSideAll('active')
      props.sideAllOpened(false)
    }

  }

  const handleAcPop = () => {
    setAcPop(acPop => !acPop);
  }

  const handleSmsearch = () => {
    setSmSearch(smSearch => !smSearch);
  }

  const fetchSearches = async (search) => {
    if (search !== '') {
      const response = await fetch('/api/results/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: search, start: 0, limit: 10 }),
      });
      const data = await response.json()
      if (data[0]) {
        setSearches(data)
      }
    }
  }

  const handleSearch = (search) => {
    setSearchd(search)
    fetchSearches(search)
  }

  const handlegetSecrhed = () => {
    router.push(`/results?results=${searchd}`)
  }

  //evenement pour  cacher le box d'account en cliquant n'importe où dans le DOM
  const cacher_composant = (event) => {
    if (compoRef.current && !compoRef.current.contains(event.target)) {
      setAcPop(false);
    }
  };

  //evenement pour  cacher siderbar et floue en cliquant n'importe où dans le DOM
  const cacher_sideBarAll = (event) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      setSideAll('active');
      props.sideAllOpened(false);
    }
  };

  //evenement pour  cacher composant des notifications en cliquant n'importe où dans le DOM
  const cacher_Notifications = (event) => {
    if (notifRef.current && !notifRef.current.contains(event.target)) {
      setIsNotificationOpen(false);
    }
  };
  useEffect(() => {
    if(!online){
      const fetchLogos = async () => {
        try {
          const cache1 = await caches.open('mon-site-logo');
          const cache2 = await caches.open('mon-site-logo');
          const resp1 = await cache1.match('/logo/TeramaFlixpic.png');
          const resp2 =await cache2.match('/logo/TeramaFlixnam.png');
          const blob1 = await resp1.blob();
          const blob2 = await resp2.blob();
          setLogo1(URL.createObjectURL(blob1))
          setLogo2(URL.createObjectURL(blob2))
        } catch (error) {
          console.error('Error fetching video:', error);
        }
      };
      fetchLogos()

    }
    const fetchProfile = async (photo) => {
      try {
        if (photo && !online) {
          const cache = await caches.open('mon-site-logo')
          const response = await cache.match(`/Thumbnails/${photo}`);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setProfBlobUrl(blobUrl);
        } else {
          const cache = await caches.open('mon-site-logo');
          const response =await cache.match('/img/logo.png');
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setProfBlobUrl(blobUrl);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    if (auto.session) {
      fetchProfile(auto.session.Photo)
    }
  
  }, [auto,online])


  useEffect(() => {
    if(online){
      const available_notifications = async () => {
        try {
          const response = await fetch(`/api/notifications/${auto.session.ID}`);
          if (response.ok) {
            const data = await response.json();
            setliste(data);
            setNotifCounter(data.length);
          }
        } catch (error) {
          console.log("Error => " + error);
        }
      };
      available_notifications();
      const interval = setInterval(() => {
        available_notifications();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [auto,online]);

  //useEffect pour cacher le box d'account en cliquant n'importe où dans le DOM
  useEffect(() => {
    document.addEventListener('click', cacher_composant);

    return () => {
      document.removeEventListener('click', cacher_composant);
    };
  }, []);
  //useEffect pour  cacher siderbar et floue en cliquant n'importe où dans le DOM
  useEffect(() => {
    document.addEventListener('click', cacher_sideBarAll);

    return () => {
      document.removeEventListener('click', cacher_sideBarAll);
    };
  }, []);

  //useEffect pour  pour  cacher composant des notifications en cliquant n'importe où dans le DOM
  useEffect(() => {
    document.addEventListener('click', cacher_Notifications);

    return () => {
      document.removeEventListener('click', cacher_Notifications);
    };
  }, []);

  const viewed_notification = async () => {
    try {
      await fetch(`/api/notifications/viewed`);
    } catch (error) {
      console.log("Error => " + error);
    }
  };

  const handleNotificationClick = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
    } else {
      setIsNotificationOpen(true);
      viewed_notification()
    }
  };

  return (
    <>
      <header className=" relative h-[60px] z-1" >
        <div className="dark:bg-medium headercontainer shadow-lg  lg:pl-2  w-[100%] bg-white fixed right-0 lef-0 top-0 z-20 ">
          <LinearIndeterminate />
          <nav className="flex sm:flex-row  max-h-16 sm:sticky sm:top-0 flex-row sm:items-center sm:justify-between items-center justify-between     pb-2   ">
            <div className="flex   flex-row justify-center items-center  w-[40%] md:w-[30%] lg:w-[20%] relative  overflow-hidden ">
              <div ref={sideBarRef} onClick={handleSideAll} className="menuCloser cursor-pointer z-50 abso/lute lef/t-0 sm:static absolute left-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 md:w-10 md:h-10 font-bold text-purple-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>

              <div className="logo ml-4 flex-initial flex flex-col sm:flex-row sm:items-center sm:justify-start w-10 h-11 sm:w-64 sm:h-full items-center justify-center sm:static ml-/10 ">
                <Link href="/"> <Image width={500} height={500} src={online || !logo1 ? '/logo/TeramaFlixpic.png': logo1 } className=" w-8 h-8 sm:w-[2.8rem] sm:h-[2.8rem] my-1" alt="logo" /></Link>
                <Link href="/"> <Image width={500} height={500} src={online || !logo2 ? '/logo/TeramaFlixnam.png' : logo2} alt="logo" className=" hidden sm:block w-[4rem] h-[1rem] sm:w-[8rem] sm:h-[1rem] " /></Link>
              </div>
            </div>
            <div className="searche-here searchDiv sm:flex flex-1  sm:justify-center sm:items-center lg:w-64 lg:h-full max-w-max items-center justify-center mr-0 lg:mr-6 p-0">
              <input id="search" type="search"
                className=" min-w-min h-9 border-none ring-2 ring-blue-500  rounded-l-full pl-3 pr-5 hidden md:block focus:outline-none "
                placeholder="Search here..."
                name="search"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchd} />
              <button id="searchBtn" className=" md:bg-blue-500 h-10 md:hover:bg-blue-900 duration-1000  md:px-4 md:py-2   font-semibold   md:rounded-r-full md:rounded-l-none text-black md:text-white items-center justify-center hidden md:block ">
                <svg onClick={handlegetSecrhed} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path strokeLinejoin="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div> 
            {!auto.session || auto.session === "unlogged" ?
            <>
               
              <div className="flex justify-end mr-8 mt-2 gap-x-[0.7rem] xs:gap-x-[0.5rem] sm:gap-x-[0.9rem] md:gap-x-[1rem] lg:gap-x-[1.5rem] w-[24rem] sm:w-[19.9rem] md:w-[18.5rem] h-[3rem] lg:w-[20.5rem] lg:h-[3rem] py-1">
                <div>
                <LightMode/>
                </div>
                <Link href='/login' className="bg-blue-500 text-white text-sm md:font-medium rounded-md  md:px-3 px-2 md:py-2 py-1 flex items-center justify-center hover:bg-blue-600">Login</Link>
              </div>
              </>
              :
              <div className="flex mt-2 gap-x-[0.7rem] xs:gap-x-[0.5rem] sm:gap-x-[0.9rem] md:gap-x-[1rem] lg:gap-x-[1.5rem] w-[24rem] sm:w-[19.9rem] md:w-[18.5rem] h-[3rem] lg:w-[20.5rem] lg:h-[3rem] ">
                <button onClick={handleSmsearch} id="searchBtn" className="dark:hover:bg-slate-600 hover:bg-gray-200 rounded-full w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[2.8rem] lg:h-[2.8rem] visible md:invisible">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1c64f2" className="mx-auto w-[1.5rem] h-[1.5rem] md:w-[2.3rem] md:h-[2.3rem] lg:w-[2rem] lg:h-[2rem] dark:stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>  
                <LightMode/>        
                <Link href='/upload'>
                  <button id="image" className="dark:hover:bg-slate-600 w-[2.5rem]  h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[2.8rem] lg:h-[2.8rem] hover:bg-gray-200 rounded-full items-center">
                      <svg  className="mx-auto dark:bg-transparent dark:hover:bg-slate-600 w-[1.5rem] h-[1.5rem]  md:w-[2rem] md:h-[2rem] lg:w-[1.9rem] lg:h-[1.9rem]" viewBox="0 0 519 383" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M172.9 119.609V175.609H119.87C111.308 175.609 107.545 186.275 106.734 191.609C106.734 202.009 115.492 206.942 119.87 208.109H172.9V265.109C176.793 274.709 185.874 277.442 189.928 277.609C201.605 278.009 205.173 269.442 205.497 265.109V208.109H259.5C270.009 205.709 272.636 196.109 272.636 191.609C272.636 182.409 263.879 177.109 259.5 175.609H205.497V119.609C204.329 112.009 194.631 108.109 189.928 107.109C179.809 105.909 174.36 114.942 172.9 119.609Z" className='dark:fill-white' fill="#1E74F3" stroke="#1E74F3"/>
                        <path d="M63.7479 25.73C33.1521 30.9264 25.1677 58.8737 25 72.1978L29.0258 320.026C28.2206 341.611 56.8705 354.336 71.2961 358H322.906C341.827 353.203 355.615 332.684 360.144 323.024V235.085L467.833 355.002C487.156 363.796 493.329 349.339 494 341.012V41.7189C485.949 17.3358 470.852 24.8973 464.31 31.7259L360.144 142.149V63.2041C349.677 34.8237 327.938 26.3962 318.377 25.73H63.7479Z" className='dark:stroke-white' stroke="#1E74F3" strokeWidth="40"/>
                      </svg>   
                  </button>
                </Link>
                <button ref={notifRef} className="dark:hover:bg-slate-600 w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[2.8rem] lg:h-[2.8rem] hover:bg-gray-300 rounded-full text-blue-700 relative">
                    <svg onClick={handleNotificationClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#1c64f2" className="dark:bg-transparent dark:stroke-white mx-auto w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem] lg:w-[2rem] lg:h-[2rem]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    {notifCounter > 0 && (
                      <span className="absolute top-2 right-[8%] flex justify-center items-center   bg-red-500 text-white w-fit p-1 h-4  rounded-full text-[80%]">
                        {notifCounter}
                      </span>
                    )}
                </button>
                <button ref={compoRef} id="image" className="p-0 w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[2.8rem] lg:h-[2.8rem] rounded-full ">
                  {auto.session.Photo ?
                    <Image width={500} height={500} className="w-full h-full rounded-full" title={`${auto.session.PageName}`}
                      src={online || !profBlobUrl ? `${process.env.NEXT_PUBLIC_URL}/Thumbnails/${auto.session.Photo}`:profBlobUrl} alt='profile' onClick={() => handleAcPop()} />
                    :
                    <Image width={500} height={500} className="-full h-full rounded-full" title={`${auto.session.PageName}`}
                      src={online || !profBlobUrl ? "/img/logo.png":profBlobUrl} alt='profile' onClick={() => handleAcPop()} />
                  }
                </button>
              </div>
            }

          </nav>
        </div>
      </header>
      {isNotificationOpen && (
        <div
          id="setNotification"
          className="dark:bg-slate-700 absolute right-4 lg:fixed top-10 z-10 mt-4 w-[14rem] h-[16rem] sm:w-[18rem]  lg:h-[27rem]  overflow-y-auto origin-top-right rounded-md bg-white sm:right-12 lg:right-12"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div className="notificationList w-full  grid grid-cols-1">
            {liste_notification.map((notification) => (
              <div key={notification.id} className=''>
                <Link href="" >
                  <div className="flex justify-center space-x-1  hover:bg-gray-300 mx-1 mt-4 rounded-sm">
                    <div className="w-[2.5rem] h-[2.5] sm:w-[3.5rem] sm:h-[3.5rem] mt-2 rounded-full">
                      {
                        notification.photo ?
                          <Image width={500} height={500}
                            className="w-[2.5rem] h-[2.5] sm:w-[3.5rem] sm:h-[3.5rem] rounded-full"
                            src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${notification.photo}`}
                            alt='notice' />
                          :
                          <Image width={500} height={500}
                            className="w-[2.5rem] h-[2.5] sm:w-[3.5rem] sm:h-[3.5rem] rounded-full"
                            src={`/logo/player.jpg`}
                            alt='notice' />
                      }
                    </div>
                    <div className="flex-col w-[11rem] sm:w-[14rem] max-h-[6.8rem] ">
                      {
                        notification.typenotif === "subscribe" &&
                        <p className="text-sm font-medium text-gray-900 line-clamp-3 p-1">
                          <span className='dark:text-white text-md font-bold mx-1'>{notification.Prenom} </span>
                          subscribed to your channel
                        </p>
                      }
                      {
                        notification.typenotif === "like" &&
                        <Link href={`/Watch?v=${notification.uniid}`}>
                          <p className="text-sm font-medium text-gray-900 line-clamp-3 p-1">
                            <span className='dark:text-white text-md font-bold mx-1'>{notification.Prenom} </span>
                            liked  your video {notification.title}
                          </p>
                        </Link>
                      }
                      {
                        notification.typenotif === "comment" &&
                        <Link href={`/Watch?v=${notification.uniid}`}>
                          <p className="dark:text-white text-sm font-medium text-gray-900 line-clamp-3 p-1">
                            <span className='dark:text-white text-md font-bold mx-1'>{notification.Prenom} </span>
                            commented  your video <span className='dark:text-white text-xs p-1 font-bold'>{notification.title}</span>
                          </p>
                        </Link>
                      }
                      <span className='dark:text-white text-md p-1 font-bold'>{formatDistanceToNow(parseISO(notification.delay))} ago</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {smSearch ?
        <div className="searche-here Searchinput2 transition-all bg-blue-500 px-2 top-14 left-9  sm:top-16 sm:left-[4.5rem]  md:top-14 md:hidden  z-50 fixed w-[80%] rounded-md h-12 flex flex-row space-x-2 items-center  overflow-hidden">
          <input type="search"
            className=" w-full h-full border-none ring-2 focus:outline-none ring-blue-500  pl-3 pr-5"
            placeholder="search here ..."
            onChange={(e) => handleSearch(e.target.value)}
            value={searchd}
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>

        </div> : null
      }
      <div id="setNotification" className="absolute right-0 lg:fixed top-10 z-30 mt-4 hidden w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:right-0 lg:right-0" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
        <div className="notificationList py-1 w-full" role="none">
          <div className="flex flex-row items-center hover:bg-gray-300 hover:border-1 hover:border-gray-400 justify-start px-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
            </svg>
            <Link href={`/results?results=${searchd}`} className="block px-2 py-2 text-sm text-gray-700" id="menu-item-1">Settings & Leonce </Link>
          </div>
        </div>
      </div>

      <div id="searchedprop" className="z-20 left-[40%] mt-14 w-[20%] sm:top-0 fixed  h-auto  overflow-hide bg-blue-100 rounded-md"></div>
      <div id="setting" style={{ display: "flex", marginRight: 70 + "px", background: "black" }}>
      </div>

      <Sidebar sideAll={sideAll} />
      {acPop ? <AcountPop auto={auto.session} /> : null}
      {searchd == "" ? null :
        <>
          <SearchDrop searches={searches} searched={searchd} />
          <SmDrop searches={searches} searched={searchd} />
        </>
      }
    </>
  )
}
export default Navbar



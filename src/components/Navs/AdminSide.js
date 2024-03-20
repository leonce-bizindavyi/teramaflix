import Link from 'next/link'
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

function AdminSide({active}) {
    const router = useRouter()
    const [video,setVideo]=useState([])

    const toHome = () =>{
        router.push('/dashboard')
    }
    const LastPost = async ()=>{
        const response = await fetch(`/api/videos/lastVideo`)
        const data =await response.json()
        setVideo(data[0])
    }
    useEffect(()=>{
        LastPost()
    },[active])
  return (
    <>
        <div  className={`asideadm ${active} bg-white h-full  md:flex flex-col`} >
            <div onClick={toHome} className="logo md:w-[250px] w-[200px] md:h-[150px] h-[100px] flex flex-col justify-center  items-center overflow-hidden ">
                <div  className="logopic w-11 h-11"><Image src="/logo/TeramaFlixpic.png" alt="logo" width={100} height={100}  className=""/></div>
                <Image src="/logo/TeramaFlixnam.png"  alt="nameLogo" width={100} height={100}  className="logoname w-40 h-5 "/>
            </div>
            <div  className="links">
                <Link href="/dashboard">
                    <div  className="h">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6 ">
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        <span >Dashboard</span>
                    </div>
                </Link>
                <Link href="/dashboard/categories">
                    <div  className="h " >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                        </svg>
                        <span>Categories</span>
                    </div>
                </Link>
                {video ?
                    <Link href={`/dashboard/video?w=${video.uniid}`}>
                    <div  className="h">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6">
                            <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                        </svg>
                        <span >Video</span>                    
                    </div>
                    </Link> :
                    <div  className="h">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6">
                            <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                        </svg>
                        <span >Video</span>                    
                    </div>
                }
                  
                <Link href="/dashboard/users">
                    <div  className="h">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                        <span >Users</span>                     
                    </div>
                </Link> 
                <Link href="/dashboard/sms">
                    <div  className="h">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6">
                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                        <span >Inbox</span>   
                    </div>
                </Link>                   
            </div>
            <div  className="menuCloser X sm:hidden rounded-full"><span>x</span></div>
         </div>
    </>
  )
}

export default AdminSide
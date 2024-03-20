import React from 'react'
import { usePeriod } from '../Hooks/usePeriod'
import styles from '@/styles/Home.module.css'
function FirstVideo({video}) {
  const videoSrc = `/api/stream?videoId=${video.Video}`;

  return (
    <>
     <div id="items" className={`${styles.filmcontainer} flex w-full mt-3`} >
        <div className="flex flex-col md:flex-row space-x-10 space-y-2 w-full justify-center items-center mt-2">
            <div id ="content " className="h-[12rem] md:w-[40%] w-[90%] flex " >
            <video src={videoSrc} className=" h-[100%] w-[100%] rounded-lg cursor-pointer "  controls autoPlay></video>            
            </div>
            <div className=" overflow-hidden">
            <div className="sm:w-50 lg:w-100 details text-gray-700 relative bottom-2  flex flex-col rounded-b-xl ">
                <div className="flex justify-start"><h3 className="dark:text-white h-8 overflow-hidden py-2 text-base "><b>{video.Title}</b> </h3></div>
                <p className='dark:text-white'>{video.Body}</p>
                <div className="gap-2">
                <span className="dark:text-white text-xs ">{video.Views} Views </span>
                <span className="dark:text-white text-xs" > {usePeriod(video.Created_at)} </span>
                </div>
            </div> 
            </div>
        </div>
        </div>
    </>
  )
}

export default FirstVideo
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { usePeriod } from '../Hooks/usePeriod'
import Image from 'next/image'
import ImageComp from '../ImageComp'

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function OtherVideo({video}) {
    const period = usePeriod(video.Created_at)
  return (
    <>
        <div id="items " className="w-full flex flex-col">
            <div className="dark:border-2 dark:border-slate-700  imag w-full md:h-[170px]  h-[200px] rounded  overflow-hidden">
            {
              video.Image == 1 ?
              <Link href={`/short`}> 
                <ImageComp src={video.Image} w={800} h={800} a={'video'} />
              </Link>
              :
              <Link href={`/Watch?v=${video.uniid}`}>
                  <ImageComp src={video.Image} w={800} h={800} a={'video'} />
              </Link>
             }    
            </div>
            <div className="ggg dark:bg-medium dark:border-2 dark:border-slate-700 sm:w-45 lg:w-53 details bg-gray-200 text-gray-700 relative bottom-2  flex flex-col rounded-b-xl">
                <div className="dark:text-white flex justify-center"><h3 className=" h-8 overflow-hidden py-2 text-base " title={video.Title} >{truncateText(video.Title,25)}</h3></div>
                <div className="dark:text-white flex flex-row justify-between p-1 px-4 pb-3">
                    <span className="dark:text-white  text-xs ">{video.Views} vues</span>
                        <span className="dark:text-white  text-xs" >{period}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default OtherVideo
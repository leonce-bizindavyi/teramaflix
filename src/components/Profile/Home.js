import React,{useState,useEffect} from 'react'
import FirstVideo from './FirstVideo'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import OtherVideos from './OtherVideos'

function Home() {
  const router = useRouter()
  const [video, setVideo] = useState(null)
  const [videos, setVideos] = useState([])
  const [novideo, setNovideo] = useState(true)
  const fetchVideo = async (unid) =>{
    if(unid){
      const response = await fetch(`/api/posts/allVideos/${unid}/0/16`)
      const data = await response.json()
      if(data.length !== 0){
        setVideo(data[0])
        setVideos(data.slice(1))
        setNovideo(false)
      }
      
    }
    
  }
  
  useEffect(() => {
    if(router.query.c) {
      fetchVideo(router.query.c);
    }
  
  }, [router])
  
  return (
    <>
      {
        novideo ?
        <>
          <div id="load_data" className={`${styles.filmcontainer} mt-3  gap-[1rem] `}>

          </div>
        </>
        :
        <>
        <div className="w-full h-[15rem] ">
            {video && (<FirstVideo video={video} />)}
                 <h1 className="dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white mb-3 bg-gray-300 w-20 p-1 cursor-pointer hover:bg-gray-500  rounded-2">Videos</h1>
                <div className="">
                {videos.length > 0 && <OtherVideos videos={videos} />}
                </div>
        </div> 
        </>
      }
    </>
  )
}

export default Home
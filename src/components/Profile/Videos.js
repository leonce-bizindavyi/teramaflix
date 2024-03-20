import React,{useState,useEffect} from 'react'
import OtherVideo from './OtherVideo'
import styles from '@/styles/Home.module.css'
import Title from '../Title'
import { useRouter } from 'next/router'

function Videos() {
  const router = useRouter()
  const [videos, setVideos] = useState([])
  const fetchVideo = async (unid) =>{
    if(unid){
      const response = await fetch(`/api/posts/allVideos/${unid}/0/20`)
      const data = await response.json()
      setVideos(data)
    }
    
  }
  
  useEffect(() => {
    if(router.query.c){
      fetchVideo(router.query.c);
    }
  
  }, [router])

  return (
    <>
      <Title title={`Videos - TeramaFlix`} />
      <div id="load_data" className={`${styles.filmcontainer} mt-3 gap-[1rem] `}>
        {
          videos?.map(video=>{
            return <OtherVideo key={video.ID} video={video} />
          })
        }      
      </div>  
    </>
  )
}

export default Videos
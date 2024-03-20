import Result from '@/components/Results/Result'
import React,{useState,useEffect}  from 'react'
import Upload from './Upload'

function Uploads() {
    const [videos, setVideos] = useState([])
    const fetchVideos = async () =>{
        const response = await fetch('/api/posts/2/0/5')
        const data = await response.json()
        setVideos(data)
    }
    useEffect(() => {
        fetchVideos()
    }, [])
  return (
    <>
        <div  className="Uploads flex flex-col mt-5 w-full h-[300px] md:h-[500px] bg-white rounded-3xl">
            <h1  className="font-bold text-lg md:text-xl p-4 md:p-6">Recent Uploads</h1>
            <div  className=" uploadsContainer w-full h-full pt-6 overflow-y-auto ">
            {
                videos?.map(video=>{
                return <Upload key={video.ID} video={video} />
                })
            }
            </div>
        </div>  
    </>
  )
}

export default Uploads
import React,{useContext} from 'react'
import Watching from './Watching'
import { VideoContext } from '../context/video'
import { SessionContext } from '../context/Auth'
import Describe from './Describe'
import MyVideos from './MyVideos'
import UnDescribe from './UnDescribe'
import { LoadContext } from '../context/loading'

function PlayVideo() {
  const auto = useContext(SessionContext)
  const {setLoad} = useContext(LoadContext)
  const {video} = useContext(VideoContext)
  if(!video){
    setLoad(true)
    return null;
  }
  return (
    <>
      <div id="played" className="dark:bg-medium video lg:w-[65%] w-full ">
       <><Watching videoprops={video} /> 
       {!auto.session || auto.session === "unlogged" ? <UnDescribe  video={video}/> : <Describe video={video}/>} </> 
       <MyVideos />
    </div>  
    </>
  )
}

export default PlayVideo
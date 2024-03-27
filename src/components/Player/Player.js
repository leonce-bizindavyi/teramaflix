import React from 'react'
import PlayVideo from './PlayVideo'
import { VideoProvider } from '../context/video'
import Aside from './Aside'
function Player({fqdn}) {
  return (
    <>
      <div className="video mt-[0px] lg:p-4 flex lg:flex-row flex-col lg:space-y-0 space-y-5 ">
       <VideoProvider>
        <>
          <PlayVideo fqdn={fqdn}/>
          <Aside />
          </>
       </VideoProvider>
      </div> 
    </>
  )
}

export default Player
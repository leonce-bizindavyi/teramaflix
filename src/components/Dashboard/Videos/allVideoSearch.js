import React, { useContext } from "react";
import MyContext from './Context';
import OneVideoSearch from "./oneVideoSearch";

function AllVideo({searches,handleAsides}){
const {handleLinkClick} = useContext(MyContext)

const handleClick = async (videoId) => {
    await handleLinkClick();
    handleAsides(videoId);
  };
return(
    <>
   <div className="filmcontainer flex flex-wrap mt-3 gap-[1rem]" >
            {
                searches?.map(video=>{
                 return <OneVideoSearch key={video.ID} video = {video} handleClick = {handleClick} />
                })   
           }   
        </div>    
    </>
)
}
export default AllVideo;
import React, { useContext } from "react";
import MyContext from './Context';
import OneVideo from './oneVideo';

function AllVideo({handleAsides}){
const {handleLinkClick,video} = useContext(MyContext)
const handleClick = async (videoId) => {
    await handleLinkClick();
    handleAsides(videoId);
  };
  
return(
    <>
         <div className="filmcontainer flex flex-wrap mt-3 gap-[1rem]" >
            {
                video?.map(video=>{  
                    return < OneVideo key={video.ID} video = {video} handleClick = {handleClick} />
                })   
           }   
        </div>    
    </>
)
}
export default AllVideo;
import PopAddVideo from "./PopAddVideo"
import EditVideo from "./EditVideo"
import React, { useState } from 'react'

function UploadManager({ handleaddvid, handleUpload,isDragged,addvid,video }) {
    return (
        <>
        {
            addvid && (
                <PopAddVideo handleaddvid={handleaddvid} handleUpload={handleUpload}/>
            )
        }
        {/* <>
            {
                isDragged ?
                    <div className="z-40">
                        <EditVideo video={video} handleaddvid={handleaddvid} />
                    </div>
                    :
                    
            }
        </> */}
        </>

    )



}
export default UploadManager
import React from 'react'

function SubBtn({handleSub,abonne}) {
  return (
    <>
    {
        abonne ? 
        <div onClick={()=>handleSub(false)} className="sabonner hover:bg-blue-700 duration-300 bg-blue-800 h-[45px] px-[10px] flex justify-center items-center rounded cursor-pointer text-white">
            <span>Subscribed</span>
        </div>
        :
        <div onClick={()=>handleSub(true)} className="sabonner hover:bg-blue-700 duration-300 bg-blue-500 h-[45px] px-[10px] flex justify-center items-center rounded cursor-pointer text-white">
            <span>Subscribe</span>
        </div>
    }
        
    </>
  )
}

export default SubBtn
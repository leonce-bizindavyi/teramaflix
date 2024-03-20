import React from 'react'

function SentDiscuss({body}) {
  return (
    <>
        <div  className="space-y-3 text-left">
          <div  className="dark:bg-slate-600 bg-blue-500 text-white p-3 text-base rounded-l-lg rounded-b-2xl inline-block h-auto max-w"> 
            {body}
          </div>
        </div> 
    </>
  )
}

export default SentDiscuss
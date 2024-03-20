import React from 'react'

function InboxDiscuss({body}) {
  return (
    <>
        <div  className="flex flex-col space-y-3 text-left">
          <div>
            <span  className="dark:bg-slate-800 bg-blue-700 text-white p-3 text-base rounded-r-lg rounded-b-2xl rounded-tr-xl flex h-auto max-w dark:text-white dark:bg-gray-800"> 
              {body}
            </span>
          </div>
        </div>
    </>
  )
}

export default InboxDiscuss
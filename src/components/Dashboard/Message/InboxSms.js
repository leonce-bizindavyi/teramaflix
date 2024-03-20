import React from 'react'

function InboxSms({body}) {
  return (
    <>
        <div  className="flex flex-col  space-y-2">
            <div  className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white max-w-[500px]">
            {body}
        </div>
        </div>
    </>
  )
}

export default InboxSms
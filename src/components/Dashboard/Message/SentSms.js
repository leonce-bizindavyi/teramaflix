import React from 'react'

function SentSms({body}) {
  return (
    <>
        <div  className="flex flex-col  space-y-2">
            <div
                className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-[500px]">
                  {body}
            </div>
        </div>
    </>
  )
}

export default SentSms
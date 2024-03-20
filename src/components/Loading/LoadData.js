import React from 'react'
import Data from './Data'

function LoadData() {
  return (
    <>
    <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3  gap-1'>
      <div className={`mx-auto w-[100%]`}>
        <Data />
      </div>
      <div className={` mx-auto w-[100%]`}>
        <Data />
      </div>
      <div className={`mx-auto w-[100%]`}>
        <Data />
      </div>
      <div className={`mx-auto w-[100%]`}>
        <Data />
      </div>
    </div>
        
    </>
  )
}

export default LoadData
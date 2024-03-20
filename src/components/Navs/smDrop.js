import React from 'react'
import Search from './Search'

function SmDrop({searches,searched}) {
  return (
    <>
        <div id="searchedprop" className=" z-20 left-[0] top-[7%] mt-14 w-[100%] sm:hidden fixed  h-auto  overflow-hide  bg-slate-100 rounded-md">
        
        {
          searches?.map(search=>{
            return <Search key={search.ID} search={search.Title} />
          })
        } 
    </div>
    </>
  )
}

export default SmDrop
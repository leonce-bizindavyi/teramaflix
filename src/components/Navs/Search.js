import Link from 'next/link'
import React from 'react'

function Search({search}) {
  return (
    <>
        <Link href={`/results?results=${search}`}>
            <div className="cursor-pointer py-2 px-4 hover:bg-gray-200 rounded-md">
            <p className="searched text-sm font-semibold text-slate-800">{search} </p>
            </div> 
        </Link>
    </>
  )
}

export default Search
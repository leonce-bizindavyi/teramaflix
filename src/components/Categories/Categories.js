import React from 'react'
import Categorie from './Categorie'
function Categories() {
  return (
    <>
      <div className="dashContainer mt-14 flex flex-col space-y-5 md:space-y-10 ">
        <div className="dashCategories bg-white rounded-3xl">
            <Categorie cat ="Films" />
            <Categorie cat ="Music" />
            <Categorie cat ="Comedie" />
            <Categorie cat ="Saison" />
        </div>
      </div>
    </>
  )
}

export default Categories
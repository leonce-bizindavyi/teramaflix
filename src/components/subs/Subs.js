import React, { useState, useEffect } from 'react'
import Sub from './Sub'
import ViewAll from './ViewAll'
import Link from 'next/link'
function Subs() {
  const [musics, setMusics] = useState([])
  const [series, setseries] = useState([])
  const [films, setFilms] = useState([])
  const [comd, setComd] = useState([])
  const [others, setOthers] = useState([])
  useEffect(() => {
    // get sms detail in database
    async function fetchpages(cat) {
      const response = await fetch(`/api/subs/${cat}/0/6`);
      const data = await response.json();
      if (data[0]) {
        if (cat === 1) setOthers(data)
        else if (cat === 2) setseries(data)
        else if (cat === 3) setFilms(data)
        else if (cat === 4) setComd(data)
        else if (cat === 5) setMusics(data)
      }
    }
    fetchpages(1)
    fetchpages(2)
    fetchpages(3)
    fetchpages(4)
    fetchpages(5)
  }, [])
  return (
    <>
      <div>
        <div className="" id="principal_cat">
        <iframe data-aa='2309751' src='//ad.a-ads.com/2309751?size=728x90' style={{width:728+'px', height:90+'px', border:0+'px', padding:0, overflow:'hidden', backgroundColor: 'transparent'}}></iframe>
          {musics.length > 0 && (<>
            <div className="">
              <div className="mt-8 ml-6">
                <label className="dark:text-white text-blue-600 text-lg  font-semibold  md:font-bold">Music</label>
              </div>
              <div className="grid place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-y-12 md:mx-6  lg:grid-cols-4 lg:gap-y-12 lg:ml-10 xl:grid-cols-5 xl:ml-10 xl:gap-y-12">
                {
                  musics?.map(music => {
                    return <Sub key={music.ID} page={music} />
                  })
                }
                <Link href='Sub/music'>
                  <ViewAll />
                </Link>
              </div>
            </div>
            <hr className="h-px my-4 bg-blue-200 border-0 dark:bg-gray-700" />
          </>)}
          {
            series.length > 0 && (<>
              <div className="">
                <div className="mt-8 ml-6">
                  <label className="dark:text-white text-blue-600 text-lg  font-semibold  md:font-bold">Series</label>
                </div>
                <div className="grid place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-y-12 md:mx-6  lg:grid-cols-4 lg:gap-y-12 lg:ml-10 xl:grid-cols-5 xl:ml-10 xl:gap-y-12">
                  {
                    series?.map(serie => {
                      return <Sub key={serie.ID} page={serie} />
                    })
                  }
                  {series.length > 4 && (
                    <Link href='Sub/series'>
                    <ViewAll />
                  </Link>
                  )
                  }
                  
                </div>
              </div>
              <hr className="h-px my-4 bg-blue-200 border-0 dark:bg-gray-700" />
            </>)}
          {
            comd.length > 0 && (
              <>
                <div className="">
                  <div className="mt-8 ml-6">
                    <label className="dark:text-white text-blue-600 text-lg  font-semibold  md:font-bold">Comedies</label>
                  </div>
                  <div className="grid place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-y-12 md:mx-6  lg:grid-cols-4 lg:gap-y-12 lg:ml-10 xl:grid-cols-5 xl:ml-10 xl:gap-y-12">
                    {
                      comd?.map(cod => {
                        return <Sub key={cod.ID} page={cod} />
                      })
                    }
                    {comd.length > 4 &&(
                      <Link href='Sub/comedie'>
                      <ViewAll />
                    </Link>
                    )
                    }
                    
                  </div>
                </div>
                <hr className="h-px my-4 bg-blue-200 border-0 dark:bg-gray-700" />
              </>)}
          {
            films.length > 0 && (
              <>
                <div className="">
                  <div className="mt-8 ml-6">
                    <label className="dark:text-white text-blue-600 text-lg  font-semibold  md:font-bold">Films</label>
                  </div>
                  <div className="grid place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-y-12 md:mx-6  lg:grid-cols-4 lg:gap-y-12 lg:ml-10 xl:grid-cols-5 xl:ml-10 xl:gap-y-12">
                    {
                      films?.map(film => {
                        return <Sub key={film.ID} page={film} />
                      })
                    }
                    {films.length > 4 && (
                    <Link href='Sub/films'>
                      <ViewAll />
                    </Link>
                    )
                    }
                  </div>
                </div>
                <hr className="h-px my-4 bg-blue-200 border-0 dark:bg-gray-700" />
              </>
            )
          }
          {
            others.length > 0 && (
              <>
                <div className="">
                  <div className="mt-8 ml-6">
                    <label className="dark:text-white text-blue-600 text-lg  font-semibold  md:font-bold">Others</label>
                  </div>
                  <div className="grid place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-y-12 md:mx-6  lg:grid-cols-4 lg:gap-y-12 lg:ml-10 xl:grid-cols-5 xl:ml-10 xl:gap-y-12">
                    {
                      others?.map(other => {
                        return <Sub key={other.ID} page={other} />
                      })
                    }
                    {others.length > 4 &&(
                    <Link href='Sub/others'>
                      <ViewAll />
                    </Link>
                    )
                    }
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Subs
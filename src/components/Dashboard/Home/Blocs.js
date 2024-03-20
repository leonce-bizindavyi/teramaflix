import React,{useState,useEffect} from 'react'

function Blocs() {
  const [blocs, setBlocs] = useState({})
  useEffect(() => {
    // get all sms  in database
  async function fetchAllBlocs() {
    const response = await fetch(`/api/dash/blocs`);
    const data = await response.json();
    if(data[0]) {
      setBlocs(data[0])
    }
  }
  fetchAllBlocs()
  }, [])
  return (
    <>
      <div  className="blokcontainer flex  justify-center md:flex md:flex-row space-x-2 space-y-2 md:space-x-4 h-[200px]  ">
                    <div  className="blok w-[45%] md:w-[25%] flex flex-col justify-center items-center rounded-3xl bg-white">
                        <div  className="flex flex-row space-x-2  items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-7 h-7 md:w-10 md:h-10 ">
                                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                              </svg>


                              
                              <span  className="text-lg md:text-xl font-bold text-[#3378FF]"> {blocs.Posts} </span>
                        </div>
                        <h2  className="text-base md:text-lg font-bold text-[#3378FF]">Videos</h2>
                    </div>
                    <div  className="blok w-[45%]  md:w-[25%] flex flex-col justify-center items-center rounded-3xl bg-white">
                        <div  className="flex flex-row space-x-2  items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6">
                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                              </svg>
                              
                              <span  className="text-lg md:text-xl font-bold text-[#3378FF]">{blocs.Messages}</span>
                        </div>
                        <h2  className="text-base md:text-lg font-bold text-[#3378FF]">Messages</h2>
                    </div>
                    <div  className="blok w-[45%] md:w-[25%] flex flex-col justify-center items-center rounded-3xl bg-white">
                        <div  className="flex flex-row space-x-2  items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                              </svg>
                              
                              <span  className="text-lg md:text-xl font-bold text-[#3378FF]">{blocs.Users}</span>
                        </div>
                        <h2  className="text-base md:text-lg font-bold text-[#3378FF]">Users</h2>
                    </div>
                    
                    <div  className="blok w-[45%] md:w-[25%] flex flex-col justify-center items-center rounded-3xl bg-white">
                        <div  className="flex flex-row space-x-2  items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-10 h-10 ">
                                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                              </svg>
                              <span  className="text-lg md:text-xl font-bold text-[#3378FF]">{blocs.Pages}</span>
                              
                        </div>
                        <h2  className="text-base md:text-lg font-bold text-[#3378FF]">Pages</h2>
                    </div>
                </div>  
    </>
  )
}

export default Blocs
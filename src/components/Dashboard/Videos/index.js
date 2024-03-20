import React from 'react'
import LastVideo from './lastVideo';
import AllVideo from './allVideo'
import AllVideoSearch from './allVideoSearch';
import { useState,useEffect} from 'react';
import MyContext from './Context';
import Title from '@/components/Title';

function Videos(props){
    const [isDeleted, setDeleted] = useState(false);
    const [video,setVideo]=useState([])
    const [uniid, setUniid] = useState(props.uniid)
    const [searchd, setSearchd] = useState("")
    const [searches, setSearches] = useState([])

    const handleAsides = (uuid) =>{
      setUniid(uuid)
    }
    function handleLinkClick() {
        setDeleted(false);
      }

    
  useEffect(() => {
      const AllPosts = async ()=>{
        const response = await fetch(`/api/videos/allVideo/${uniid}`)
        const data =await response.json()
        setVideo(data)
    };
    AllPosts()
  }, [uniid])

    const handledelete = async () =>{
        try{
            const response = await fetch(`/api/deletePost/${uniid}`)
            if(response.ok){
              const data = await response.json();
              if (data.affectedRows == 1) {
                setDeleted(true)
              } else {
                console.error('Failed to delete');
              }
            }
            else{
              console.log('Error of deleting')
            }
        }
        catch(error){
             console.error(error)
        }
      }
      const handleSearch = (search) =>{
        setSearchd(search)
        fetchSearches(search)
    }
      const fetchSearches = async (search) =>{
        if(search !== ''){
          const response = await fetch(`/api/results/${search}/0/100`)
          const data = await response.json()
          if(data[0]){
              setSearches(data)
          }
        }
      }
return(
<>
<Title title='Videos' />
  <div className="dashContainer mt-5 flex flex-col space-y-5 md:space-y-10 ">
    <div className="dashVideo  bg-white rounded-3xl">
        <div className="flex justify-center">
            <div >
                <div className="flex flex-col items-center">
                    <div className="VideoH flex flex-row  items-center  mb-6 cursor-pointer py-4 px-2  border-b-2 border-blue-500">
                        <div className="flex flex-row space-x-3">
                            <div className="">
                               <input id="search" type="search" 
                                            placeholder="Search" className="focus:outline-none  focus:border-blue-500 py-2 px-8 text-sm sm:text-lg sm:px-48 border-2 border-gray-200 rounded-2xl w-full"
                                            name="search"
                                            onChange={(e)=>handleSearch(e.target.value) }
                                            value={searchd}
                                            />
                            </div>
                            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-2xl border border-blue-500 hover:bg-blue-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>                                 
                            </button>
                        
                        </div>
                    </div>
                </div>
                <MyContext.Provider value={{handledelete,isDeleted}}>
                <LastVideo uniid={uniid}/>
                </MyContext.Provider>
            </div>
        </div>  
        {searchd == "" ? 
        <MyContext.Provider value={{handleLinkClick,video}}>
        <AllVideo handleAsides={handleAsides} /> 
        </MyContext.Provider>
        :
        <MyContext.Provider value={{handleLinkClick}}>
        <AllVideoSearch searches={searches}  searched={searchd}  handleAsides={handleAsides} /> 
        </MyContext.Provider>
        }          
    </div>
  </div>
</>
)
}
export default Videos;
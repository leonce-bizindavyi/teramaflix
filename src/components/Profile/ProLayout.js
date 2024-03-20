import React,{useState} from 'react'
import ProfileHeader from './ProfileHeader'
import Layout from './Layout'

function ProLayout() {
  const [page, setPage] = useState(1)
  const handleSetPage = (stat)=>{
    setPage(stat)
  }
  return (
    <>
        {/* <div className="container max-w-full mt-[1rem] min-h-screen  bg-white   ease-in-out  "> */}
            <div className="dark:bg-medium scrollbar  lg:max-w-[100%] max-w-[100%] lg:ml-[2rem]"> 
                <div id="channel">
                    <ProfileHeader handleSetPage={handleSetPage} page={page} />
                    <Layout page={page}/>
                </div>
            </div>
        {/* </div> */}
    </>
  )
}

export default ProLayout
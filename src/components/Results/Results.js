import React, {useState,useEffect} from 'react'
import Result from './Result'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
function Results() {
  const router = useRouter()
  const search = router.query.results
  const [videos, setVideos] = useState([])
  const [hasMore,setHasMore]=useState(true)
  
  const getMoreResults=async()=>{
    const res = await fetch('/api/results/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: search, start: videos.length, limit: 5 }),
    });
    const newVideos = await res.json()
    if(newVideos.length===0) setHasMore(false)
      setVideos(videos=>[...videos, ...newVideos])
  }
  useEffect(() => {
    if (search) {
      const fetchResults = async (search) =>{
      const response = await fetch('/api/results/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: search, start: 0, limit: 10 }),
      });
      const data = await response.json()
      if (data[0]) {
        setVideos(data)
      }
    }
    fetchResults(search)
    }
  }, [search])
  
  return (
    <>
    <InfiniteScroll
    dataLength={videos.length}
    next={getMoreResults}
    hasMore={hasMore}
    loader={<h4 className='dark:text-white'>Loading...</h4>}
    endMessage={
      <p className='dark:text-white' style={{textAlign:"center"}}><b >You have seen it all</b></p>
    }>
        <div className="Uploads flex flex-col  w-full h-full  bg-white rounded-3xl ">
            <div className=" uploadsContainer w-full h-full pt-6 overflow-y-auto   ">
              {
                videos?.map(video=>{
                  return <Result key={video.ID} video={video} />
                })
              }
            </div>
        </div>
        </InfiniteScroll>
    </>
  )
}

export default Results
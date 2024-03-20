import React,{useState,useEffect,useContext} from 'react'
import Result from '../Results/Result'
import { SessionContext } from '../context/Auth'
import InfiniteScroll from 'react-infinite-scroll-component'

function Histories() {
  const auto = useContext(SessionContext)
  const [videos, setVideos] = useState([])
  const [hasMore,setHasMore]=useState(true)
  let previousDate = null;
  const getMoreVideos=async()=>{
    const user = auto.session
    if(user === 'unlogged'){
    const res=await fetch(`/api/posts/histories/${0}/${videos.length}/6`)
    const newVideos = await res.json()
    if(newVideos.length==0)setHasMore(false)
      setVideos(videos=>[...videos, ...newVideos])
    }else{
      const res=await fetch(`/api/posts/histories/${user.ID}/${videos.length}/6`)
      const newVideos = await res.json()
      if(newVideos.length==0)setHasMore(false)
        setVideos(videos=>[...videos, ...newVideos])
    }
  }
  useEffect(() => {
    if(!auto.session || auto.session === 'unlogged'){
      const fetchVideos = async () =>{
        const response = await fetch(`/api/posts/histories/${0}/0/8`)
        const data = await response.json()
        setVideos(data)
    }
    fetchVideos()
    }else{
      const fetchVideosU = async () =>{
        const user = auto.session
        const response = await fetch(`/api/posts/histories/${user.ID}/0/8`)
        const data = await response.json()
        setVideos(data)
    }
    fetchVideosU()
    }
  }, [auto])

  if(auto.session === 'unlogged') return null
  return (
    <>
    <InfiniteScroll
    dataLength={videos.length}
    next={getMoreVideos}
    hasMore={hasMore}
    loader={<h4 className='dark:text-white'>Loading...</h4>}
    endMessage={
      <p style={{textAlign:"center"}} className='p-2 dark:text-white'><b>You have seen it all</b></p>
    }>
      <div className="dark:bg-medium Uploads flex flex-col w-full h-full bg-white rounded-3xl">
        <div className="dark:bg-medium uploadsContainer w-full h-full pt-6 overflow-y-auto">
          {videos.map((video, index) => {
            const currentDate = video.DateView.substring(0, 10); // Obtenir la date actuelle de la vidéo
            const showTitleAndLine = currentDate !== previousDate;

            // Mettre à jour la date précédente
            previousDate = currentDate;

            return (
              <React.Fragment key={video.ID}>
                {showTitleAndLine && (
                  <>
                    <h2 className='dark:text-white' >{currentDate}</h2>
                    <hr className="mb-5" />
                  </>
                )}
                <Result key={video.ID} video={video} />
                {index === videos.length - 1 && <hr className="mb-5" />} {/* Ajouter une ligne de séparation après la dernière vidéo */}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      </InfiniteScroll>
    </>
  )
}

export default Histories
import React,{useState,useEffect,useContext} from 'react'
import { useRouter } from 'next/router'
import { SessionContext } from '../context/Auth'
import Video from './Video'
import InfiniteScroll from 'react-infinite-scroll-component'

function Videos() {
  const auto = useContext(SessionContext)
  const router = useRouter()
  const [videos, setVideos] = useState([]);
  const [hasMore,setHasMore]=useState(true)
  const [online, setOnline] = useState(true);

  useEffect(()=>{
    const handleOnlineStatusChange = () =>{
      setOnline(navigator.onLine);
    };
    window.addEventListener('online',handleOnlineStatusChange);
    window.addEventListener('offline',handleOnlineStatusChange);
    setOnline(navigator.onLine);
    return () =>{
      window.removeEventListener('online' ,handleOnlineStatusChange);
      window.removeEventListener('offline',handleOnlineStatusChange);
    }

  },[]);
  const getMoreVideos=async()=>{
    const post = router.query.v
    const user = auto.session
    if(user === 'unlogged'){
      const res=await fetch(`/api/posts/videos/${post}/${videos.length}/6/${0}`)
      const newVideos = await res.json()
      if(newVideos.length==0)setHasMore(false)
        setVideos(videos=>[...videos, ...newVideos])
    }else{
      const res=await fetch(`/api/posts/videos/${post}/${videos.length}/6/${user.ID}`)
      const newVideos = await res.json()
      if(newVideos.length==0)setHasMore(false)
        setVideos(videos=>[...videos, ...newVideos])
    }
    
  }
  useEffect(() => {
    if(online){
      const fetchVideos = async (post,user) => {
        const response = await fetch(`/api/posts/videos/${post}/0/7/${user} `);
        const data = await response.json();
        if(data.length !== 0){
          setVideos(data);
        }
      };
      if(router.query.v && auto.session){
        if(auto.session === 'unlogged'){
          fetchVideos(router.query.v,0)
        }else{
          fetchVideos(router.query.v,auto.session.ID)
        }
        
      }
    }else{
      const cacheName = 'downloaded-videos-cache';
      const getCachedVideos= async () => {
        try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        const videoUrls = Array.from(keys).filter((key) =>key.url.endsWith('_data'));
        const videos = await Promise.all(videoUrls.map(async (url) => {
          const response = await cache.match(url);
          const videoInfo = JSON.parse(await response.text());
          return videoInfo
        }));
        setVideos([...videos].reverse())
      } catch (error) {
          console.error('Error loading cached videos:', error);
        }
      }
      getCachedVideos()
    }
  }, [router,auto,online])
  if(videos.length === undefined) return null
  return (
    <>
    <InfiniteScroll
    dataLength={videos.length}
    next={online && getMoreVideos}
    hasMore={hasMore}
    loader={online && <h4>Loading...</h4>}
    endMessage={
      <p style={{textAlign:"center"}}><b>You have seen it all</b></p>
    }>      
      <div className="moreVideo flex flex-col space-y-2 rounded pt-16 lg:pt-12  overflow-y-hidden  ">
      
        {
          videos?.map(video=>{
            if(video.Short === 0 && video.Visible === 1 && video.Image){
              return <Video key={video.ID} video={video} />
            }
          })
        }
      </div>
      </InfiniteScroll>
    </>
  )
}

export default Videos

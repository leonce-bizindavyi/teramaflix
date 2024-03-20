import React, { useState, useEffect, useContext } from 'react'
import Video from './Video'
import InfiniteScroll from "react-infinite-scroll-component";
import styles from '@/styles/Home.module.css'
import { SessionContext } from '../context/Auth';
import Adsense from '../Adsense/Adsense';
import { LoadContext } from '../context/loading';
import LoadData from '../Loading/LoadData';

function Videos() {
  const auto = useContext(SessionContext)
  const { setLoad } = useContext(LoadContext)
  const [videos, setVideos] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (auto.session) {
      if (auto.session === 'unlogged') {
        fetchVideos(0)
      } else {
        fetchVideos(auto.session.ID)
      }
    }
  }, [auto])
  const fetchVideos = async (user) => {
    const response = await fetch(`/api/posts/${user}/0/6`)
    const data = await response.json()
    if (data[0]) setVideos(data)
    if (data) setLoad(true)
  }

  if (videos == null) {
    setLoad(false)
    return (<LoadData />)
  }

  const getMoreVideos = async () => {
    if (auto.session === 'unlogged') {
      const res = await fetch(`/api/posts/${0}/${videos.length}/6`)
      const newVideos = await res.json()
      if (newVideos.length == 0) setHasMore(false)
      setVideos(videos => [...videos, ...newVideos])
    } else {
      const res = await fetch(`/api/posts/${auto.session.ID}/${videos.length}/6`)
      const newVideos = await res.json()
      if (newVideos.length == 0) setHasMore(false)
      setVideos(videos => [...videos, ...newVideos])
    }
  }
  return (
    <>
      <InfiniteScroll
        dataLength={videos.length}
        next={getMoreVideos}
        hasMore={hasMore}
        loader={<LoadData />}
        endMessage={
          <p style={{ textAlign: "center" }} className='p-2 dark:text-white'><b>You have seen it all</b></p>
        }>
        <div id="load_data" className={`dark:bg-medium dark:border-medium dark:border-t-white border-4 border-t-blue-500  border-white pt-[30px] grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3  gap-3 `}>
          {/* <div className={styles.videocontainer}>
          <Adsense />
          </div> */}
          {
            videos?.map(video => {
              if (video.Short === 0 && video.Visible === 1 && video.Image !== 'NULL') {
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
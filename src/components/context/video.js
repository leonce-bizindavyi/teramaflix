import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from './Auth';
const VideoContext = React.createContext();

function VideoProvider(props) {
  const auto = useContext(SessionContext)
  const router = useRouter()
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchData(post, user) {
      const response = await fetch(`/api/posts/watch/${post}/0/${user}`);
      const data = await response.json();
      if (data[0]) setVideo(data[0]);
    }
    if (router.query.v && auto.session) {
      if(auto.session === 'unlogged'){
        fetchData(router.query.v, 0)
      }else{
        fetchData(router.query.v, auto.session.ID)
      }
    }
  }, [router.query.v,auto]); // Ajout des dépendances router.query.v et auto.session

  return (
    <VideoContext.Provider
      value={{
        video,
      }}>
      {props.children}
    </VideoContext.Provider>
  );
}

export { VideoProvider, VideoContext };
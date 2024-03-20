import Player from '@/components/Player/Player'
import Title from '@/components/Title'
import React,{useEffect} from 'react'
function WatchPage() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          })
          .catch(err => {
            console.log('Service Worker registration failed: ', err);
          });
      });
    }
  }, []);
  return (
    <>
      <Title title='Watch - TeramaFlix' />
      <Player />
    </>
  )
}

export default WatchPage
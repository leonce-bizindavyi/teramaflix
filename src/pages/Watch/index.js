import Player from '@/components/Player/Player'
import Title from '@/components/Title'
import React,{useEffect} from 'react'
function WatchPage({fqdn}) {
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
      <Player fqdn={fqdn}/>
    </>
  )
}

export default WatchPage

export async function getServerSideProps(context) {
  const { req } = context;
  
  // Récupérer le nom de domaine à partir de l'en-tête Host de la requête
  const hostname = req.headers.host;
  
  // Maintenant, hostname contient le FQDN
  
  // Vous pouvez transmettre le FQDN comme une prop à votre composant React
  return {
    props: {
      fqdn: hostname,
    }
  };
}
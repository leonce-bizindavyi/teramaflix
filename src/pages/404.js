// Importez les composants nécessaires
import Title from '@/components/Title';
import Link from 'next/link';
import React,{useEffect,useState} from 'react';

function NotFound() {
    const [logo, setLogo] = useState('/logo/TeramaFlixpic.png')
    useEffect(() => {
        const fetchLogos = async () => {
          try {
              const resp = await fetch('/logo/TeramaFlixpic.png');
              const blob = await resp.blob();
              setLogo(URL.createObjectURL(blob))
          } catch (error) {
            console.error('Error fetching video:', error);
          }
        };
        fetchLogos()
      }, [])
  return (
    <>
      <Title title="404 Not Found" />
      <div className="bg-gradient-to-br from-teal-500 via-indigo-500 to-purple-500 text-white h-screen flex items-center justify-center">
        <div className="text-center p-8 rounded-md  ">
          <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="Play Icon" className="mr-2 h-24" />
            <h1 className="text-6xl font-bold text-indigo-800">404</h1>
          </div>
          <p className="text-lg mt-4 text-black">Oops! It seems like you &apos; ve entered a wrong galaxy.</p>
          <Link href="/" >
            <div className='flex items-center justify-center'>
                <span className="text-white block mt-6 bg-blue-500 p-3 rounded-md hover:bg-blue-700">Go Home</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;

NotFound.getLayout = function pageLayout(page){
    return (
        <>
        {page}
        </>
    )
}

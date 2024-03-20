import {React,useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';

function Waitingpage() {
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
       <div className='flex justify-center mt-[4rem]'>
            <div className='flex flex-col space-y-5 justify-center h-auto w-[22rem] md:w-[24rem] lg:w-[24rem] shadow-md shadow-indigo-400 bg-blue-600 rounded-tl-3xl rounded-br-3xl rounded-tr-xl'>
                 <div className='grid grid-cols-1 mx-2 mt-[1rem]'>
                      <h1 className='flex justify-center text-md lg:text-lg text-white font-semibold'>An activation code has been sent to your email adress</h1>
                 </div>
                 <div  className="flex justify-center space-x-6">
                    <h1 className='text-md text-white'>return to Login</h1>  
                    <Link href="/login">
                      <div className='shadow-[0_0_12px_gray] hover:bg-gray-700 bg-gray-600 mb-6 rounded-md h-[1.5rem] w-[3.5rem]'>
                         <h1 className='text-white text-md font-semibold flex justify-center'>Log in</h1>
                      </div> 
                    </Link>
                 </div>
            </div>
       </div>
    </>
  )
}

export default Waitingpage 
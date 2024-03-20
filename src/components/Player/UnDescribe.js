import Link from 'next/link'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import SubBtn from '../subs/SubBtn'
import { usePeriod } from '../Hooks/usePeriod'
import { SessionContext } from '../context/Auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CommentBloc from './CommentBloc'

function UnDescribe({ video }) {
  const router = useRouter()
  const auto = useContext(SessionContext)
  const period = usePeriod(video.Created_at)
  const [liked, setLiked] = useState(2)
  const [likes, setLikes] = useState()
  const [abonne, setAbonne] = useState(null)
  const [yesColor, setYesColor] = useState('bg-gray-200')
  const [noColor, setNoColor] = useState('bg-gray-200')

  const [buttonAimeColor, setButtonAimeColor] = useState('');
  const [buttonAimepasColor, setButtonAimepasColor] = useState('');
  // like the video begin


  // test if liked api endpoint
  const fetchLikesReactions = useCallback(async (id) => {
    const user = auto.session;
    const response = await fetch(`/api/reactions/likes/${id}/${user.ID}`);
    const data = await response.json();
    if (data[0] == undefined) {
      setYesColor('bg-gray-200');
      setNoColor('bg-gray-200');
      setLiked(2);
    } else {
      if (data[0].Etat == 0) {
        setNoColor('bg-blue-700');
        setYesColor('bg-gray-200');
        setLiked(0);
        setLikes(data[0]);
      } else {
        setNoColor('bg-gray-200');
        setYesColor('bg-blue-700');
        setLiked(1);
        setLikes(data[0]);
      }
    }
  }, [auto.session]);

  // channel sub begin
  const fetchSubReactions = useCallback(async (user) => {
    const sub = auto.session;
    const response = await fetch(`/api/reactions/subs/${user}/${sub.ID}`);
    const data = await response.json();
    if (data[0] == undefined) {
      setAbonne(false);
    } else {
      setAbonne(true);
    }
  }, [auto.session]);

  useEffect(() => {
    fetchLikesReactions(video.ID);
    fetchSubReactions(video.User);
  }, [auto, video, fetchLikesReactions, fetchSubReactions]);

  //channel sub end
  useEffect(() => {
    fetchLikesReactions(video.ID)
    fetchSubReactions(video.User)
  }, [auto, video, fetchLikesReactions, fetchSubReactions])
  //couleur boutton j'aime
  useEffect(() => {
    const storedColorAime = localStorage.getItem('buttonAimeColor');
    if (storedColorAime) {
      setButtonAimeColor(storedColorAime);
    }
  }, []);
  //couleur boutton j'aime pas
  useEffect(() => {
    const storedColorAimepas = localStorage.getItem('buttonAimepasColor');
    if (storedColorAimepas) {
      setButtonAimepasColor(storedColorAimepas);
    }
  }, []);

  const handleSub = async () => {

  }

  //fonction couleur boutton j'aime
  const handleButtonAimeClick = () => {
    if (buttonAimeColor === '#2563eb') {
      // Si la couleur actuelle est bleue, rétablir la couleur initiale rouge
      setButtonAimeColor('');
      localStorage.removeItem('buttonAimeColor');
    } else {
      // Sinon, changer la couleur en bleu
      setButtonAimeColor('#2563eb');
      localStorage.setItem('buttonAimeColor', '#2563eb');
    }
  };

  //fonction couleur boutton j'aime pas
  const handleButtonAimepasClick = () => {
    if (buttonAimepasColor === '#2563eb') {
      // Si la couleur actuelle est bleue, rétablir la couleur initiale rouge
      setButtonAimepasColor('');
      localStorage.removeItem('buttonAimepasColor');
    } else {
      // Sinon, changer la couleur en bleu
      setButtonAimepasColor('#2563eb');
      localStorage.setItem('buttonAimepasColor', '#2563eb');
    }
  };
  return (
    <>
      <div id="description">
        <div className="description  pb-4 px-[3%] lg:px-0 w-full border-b-[2px] ">
          <div className="p-[2%] pl-0 lg:text-[22px] text-[18px] font-semibold">{video.Title}</div>
          <div className="reaction flex flex-col justify-between  space-y-2  text-white">
            <div className="vuesAndDate flex flex-row space-x-2">
              <div className="vues  text-black space-x-1 lg:text-base text-[13px] flex flex-row justify-center">
              </div>
            </div>
            <div className="vuesAndDate flex flex-row space-x-2">
              <div className="vues  text-black space-x-1 lg:text-base text-[13px] flex flex-row justify-center">
                <div className="nbrVues ">{video.Views}</div>
                <div className="">vues</div>
              </div>
              <div className="dateSortie  text-black lg:text-base text-[13px]">
                <span className="date lg:text-base text-[13px]">{period}</span>
              </div>
            </div>
            <div className="reaction flex flex-row space-x-4 bg-gray-200 w-max px-2 rounded-lg">
              <div className={`jaime hover:text-blue-500  cursor-pointer   p-2 rounded-3xl h-[45px] text-black flex lg:flex-row flex-col justify-center items-center lg:space-x-2 lg:text-[18px] font-semibold lg:text-base text-[13px]`}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleButtonAimeClick} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ color: buttonAimeColor }} className={` ${yesColor}  lg:w-6 lg:h-6 w-4 h-4 cursor-pointer `}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
              </div>
              <div className={`jaimepas hover:text-blue-500  cursor-pointer  p-2 rounded-3xl h-[45px] text-black flex lg:flex-row justify-center items-center  lg:space-x-2 lg:text-[18px] lg:text-base text-[13px] font-semibold flex-col`}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleButtonAimepasClick} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ color: buttonAimepasColor }} className={`${noColor} lg:w-6 lg:h-6 w-4 h-4 cursor-pointer`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                </svg>
              </div>
              <div title='Share' className="partager hover:text-blue-500 cursor-pointer  bg-gray-200 p-2 rounded-3xl h-[45px] text-black flex lg:flex-row justify-center items-center lg:space-x-2 text-[18px] font-semibold flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hover:text-blue-500  lg:w-6 lg:h-6 w-4 h-4 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </div>
              <div title='Download' className="telecharger p-3 h-[45px] text-white bg-blue-500 hover:bg-blue-700 rounded-[50%] lg:text-base text-[13px] duration-300 " >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
            </div>
          </div>

          <div className='relative min-h-full py-2  lg:hidden'>

            <CommentBloc video={video} />
            <div className='h-14'></div>
          </div>

        </div>


        <div className="profil  flex flex-row justify-between lg:px-0 px-[3%] items-center  ">
          <Link href="/profile">
            <div className="profilChannel  flex justify-start items-center space-x-2 w-12 h-12 my-1 cursor-pointer ">
              {
                video.Photo ?
                  <Image width={500} height={500} alt='profile'
                    className=" w-10  h-10 my-1 ml-15 rounded-full "
                    src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Photo}`}
                    priority={true} placeholder='blur'
                    blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                  :
                  <Image width={500} height={500} alt='profile'
                    className=" w-10  h-10 my-1 ml-15 rounded-full "
                    src={`/img/logo.png`}
                    priority={true} placeholder='blur'
                    blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
              }
              <h1 className="font-bold text-[20px] cursor-pointer">{video.PageName}</h1>
            </div>
          </Link>
          {
            video.User === auto.ID ? null : <SubBtn handleSub={handleSub} abonne={abonne} />
          }

        </div>

      </div>
    </>
  )
}

export default UnDescribe
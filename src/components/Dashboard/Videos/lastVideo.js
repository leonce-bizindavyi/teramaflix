import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MyContext from './Context';
import Title from '@/components/Title';
import { usePeriod } from '@/components/Hooks/usePeriod';
import Image from 'next/image';

function TimeAgo(Created) {
  const period = usePeriod(Created)
  return period
}
let videoId
function LastPost({ uniid, setallMessage }) {
  const [video, setVideo] = useState(null);
  const router = useRouter();
  videoId = router.query.w;
  useEffect(() => {
    async function fetchLastPost(id) {
      const response = await fetch(`/api/videos/${id}`);
      const data = await response.json();
      const result = data[0];
      setVideo(result);
      setallMessage([]);
    }
    if (uniid) {
      fetchLastPost(uniid);
    } else if (videoId) {
      fetchLastPost(videoId);
    }
  }, [uniid, setallMessage]);
  return video;
}

function LastVideo({ uniid }) {
  const { handledelete, isDeleted } = useContext(MyContext);
  const [message, setMessage] = useState('');
  const [allMessage, setallMessage] = useState([]);
  let video = LastPost({ uniid, setallMessage });
  const [videoBlobUrl, setVideoBlobUrl] = useState('');
  const [profBlobUrl, setProfBlobUrl] = useState('/img/logo.png');

  const handleClick = async () => {
    await handledelete();
  }

  if (!video) {
    return <div>Loading...</div>;
  }
  const period = TimeAgo(video.Created_at)

  const handleChangeVisibility = async (event) => {
    const val = event.target.value
    const boolValue = val === "1" ? true : false;
    try {
      const response = await fetch('/api/visibility', {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json'
        },

        body: JSON.stringify({
          value: boolValue,
          uniid: videoId
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.affectedRows == 1) {
          const button = document.getElementById('visible')
          if (val === "1") {
            button.innerHTML = "Hide"
            button.value = "0";
          }
          else {
            button.innerHTML = "Show"
            button.value = "1";
          }
        } else {
          console.error('Failed to update visibility.');
        }
      }
      else {
        console.log('error')
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }
  const handleSendMessage = async (event) => {
    if (message == '') {
      console.log("Vous essayez d'envoyer un message vide!")
    }
    else {
      const response = await fetch('/api/SendMail', {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          mail: video.Mail
        })
      });
      if (response) {
        console.log('yes')
        setallMessage([...allMessage, message]);
        setMessage('')
      }
      else {
        console.log('errk')
      }
    }

  }
  const videoSrc = `/api/stream?videoId=${video.Video}`;
  return (
    <>
      <Title title={`${video.Title} - Dashboard`} />
      {
        isDeleted ?
          <div>The movie has been deleted !!</div>
          :
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 h-[400] md:h-[250px] items-center border-b-2 border-blue-500">
            <div className="w-64 sm:w-80 md:w-72 lg:w-96 h-48 lg:h-52">
              <video id="playing" src={videoSrc} className="w-full h-full" controls autoPlay> </video>
            </div>
            <div className="flex flex-row space-x-4">
              <div>
                <div className="text-lg sm:text-base lg:text-lg"><span>Title</span> : <span>{video.Title}</span></div>
                <div className="text-lg sm:text-base lg:text-lg"><span>Description</span> : <span>{video.Body}</span></div>
                <div className="text-lg sm:text-base lg:text-lg"><span>Date</span> : <span>{period}</span></div>
                <div className="text-lg sm:text-base lg:text-lg"><span>Views Status</span> : <span>{video.Views}</span></div>
                <div className="text-lg sm:text-base lg:text-lg"><span>Likes</span> : <span>{video.Likes}</span></div>
                <br />
                <div>
                  <button id="visible" onClick={handleChangeVisibility} value={video.Visible} className="btnStatu text-base sm:text-sm lg:text-base  xl:text-xl font-semibold cursor-pointer bg-[#3378FF] text-white shadow-xl p-1 xl:p-2 rounded-full">
                    {video.Visible === 1 ? "Show" : "Hide"}</button>

                  <button id="" onClick={handleClick} value={video.uniid} className="ml-2 text-base sm:text-sm lg:text-base xl:text-xl font-semibold cursor-pointer bg-[#3378FF] text-white shadow-xl p-1 xl:p-2 rounded-full">Delete</button>
                </div>
              </div>
              <div className=" w-10 h-10 xl:w-14 xl:h-14 rounded-full overflow-hidden">
                {
                  video.Photo ?
                    <Image width={100} height={100}
                      src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Photo}`}
                      priority={true} placeholder='blur'
                      blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                      className="w-full h-full" alt="profil" />
                    :
                    <Image width={100} height={100} src={`/img/logo.png`}
                      priority={true} placeholder='blur'
                      blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                      className="w-full h-full" alt="profil" />
                }
              </div>
              <div className="border border-blue-300 rounded-3xl">
                <div className="w-full  px-5 flex flex-col h-[210px] justify-between">
                  <div className="flex flex-col mt-5  overflow-y-auto">
                    <div className="flex justify-end mb-4 ">
                      <div className="flex flex-col  space-y-2">
                        {
                          allMessage.map((msg, index) => (
                            <div key={index} className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white md:max-w-[200px]">
                              {msg}
                            </div>
                          ))
                        }

                      </div>
                    </div>
                  </div>
                  <div className="flex py-1">
                    <input className="w-full bg-gray-300 py-2 px-2 rounded-xl focus:outline-none focus:border border-blue-500" onChange={(event) => setMessage(event.target.value)} value={message} onKeyDown={handleKeyDown} name="message" type="text" placeholder="type your message" />
                    <button className="" onClick={handleSendMessage}>
                      <Image width={100} height={100} src="/imag.png" className="object-cover h-8 w-8 rounded-full" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}
export default LastVideo;
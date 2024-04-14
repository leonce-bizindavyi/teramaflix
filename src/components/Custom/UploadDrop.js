import React, { useState, useContext, useEffect } from 'react'
import Video from './Video'
import Upload from './Uploads';
import { SessionContext } from '../context/Auth';
import UploadManager from './UploadManager';
import { v4 as uuidv4 } from 'uuid';
import PopAddVideo from './PopAddVideo';
import EditVideo from './EditVideo';

function UploadDrop() {
  const auth = useContext(SessionContext)
  const [addvid, setAddvid] = useState(false)
  const [auto, setAuto] = useState(12);
  const [isEmpty, setEmpty] = useState(true)
  const [videos, setVideos] = useState([])
  const [uploads, setUploads] = useState([])
  const [isDragged, setDrag] = useState(false)
  const [video, setVideo] = useState({})

  const handleaddvid = (stat) => {
    setAddvid(stat)
  }
  const fetchUploads = async () => {
    const user = auth.session;
    const response = await fetch(`/api/posts/hidePosts/${user.ID}`);
    const data = await response.json();

    if (data.length === 0) {
      // Handle case where data is empty if needed
    } else {
      setUploads(data);
    }
  };

  useEffect(() => {
    if (auth.session) {
      setAuto(auth.session)
      fetchUploads()
      const fetchVideos = async () => {
        const user = auth.session
        const response = await fetch(`/api/posts/allPost/${user.ID}/0/25`)
        const data = await response.json()
        if (data.length == 0) {
          setEmpty(true)
        }
        else {
          setEmpty(false)
          setVideos(data)
        }
      }
      fetchVideos()
    }
  }, [auth])
  const handleUpload = async (videos) => {
    const initialVideo = { Title: videos[0].name, ID: 0, percent: 0, Success: false, Video: null, User: auto.ID };
    setVideo(initialVideo);
    setAddvid(false)
    for (let i = 0; i < videos.length; i++) {
      const file = videos[i];
      const uniVideo = uuidv4() + i + '.mp4';
      const formData = new FormData();
      formData.append('User', auto.ID);
      formData.append('Video', uniVideo)
      formData.append('videos', file);
      setVideo(prevVideo => (prevVideo.ID === i ? { ...prevVideo, Video: uniVideo } : prevVideo));
      const xhr = new XMLHttpRequest();
      const video = { Title: file.name, ID: i, percent: 0, Success: false, Video: uniVideo, User: auto.ID };
      setUploads(prevUploads => [...prevUploads, video]);

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          // Update the percent attribute of the corresponding video
          setUploads(prevUploads =>
            prevUploads.map(upload =>
              upload.ID === i ? { ...upload, percent: percentage } : upload
            )
          );

          // Update the setVideo state with the progress of the first video
          setVideo(prevVideo => (prevVideo.ID === i ? { ...prevVideo, percent: percentage } : prevVideo));
        }
      });

      xhr.open('POST', `${process.env.NEXT_PUBLIC_URL}/apis/upload`, true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const responseData = JSON.parse(xhr.responseText);
          if (responseData.Success) {
            // Update the Success attribute of the corresponding video to true
            setUploads(prevUploads =>
              prevUploads.map(upload =>
                upload.ID === i ? { ...upload, Success: true } : upload
              )
            );

            // Update the Success attribute of the setVideo state for the first video
            setVideo(prevVideo => (prevVideo.ID === i ? { ...prevVideo, Success: true, Image: responseData.Image } : prevVideo));
          }
          // Upload completed
        } else {
          console.error('Error uploading videos');
        }
      };
      xhr.onerror = () => {
        console.error('Network error during the request');
      };
      xhr.send(formData);
    };
  }

  const handleEdit = (video) => {
    if (video.Success || video.uniid) {
      setVideo(video)
      setDrag(true)
      setAddvid(false)
    }
  }

  const handleRemoveVideo = (videoId) => {
    const newVideos = videos.filter(item => item.ID !== videoId)
    setVideos(newVideos)
  }
  const handleRemoveUpload = (videoId) => {
    const newUploads = uploads.filter(item => item.ID !== videoId)
    setUploads(newUploads)
  }
  if (uploads.length > 0) {
  }
  return (
    <>
      <div className="vidManager flex flex-row justify-between">
        <h2 className="dark:text-white text-[1.5rem] font-semibold">Video Manager</h2>
        <button onClick={() => handleaddvid(true)} className="dark:bg-slate-700 dark:hover:bg-slate-600 addVid flex flex-row justify-center items-center bg-blue-500 h-10 hover:bg-blue-900 duration-1000  px-4 md:py-2 md:mr-6 mt-2 text-sm md:text-base font-semibold   rounded-l-full rounded-r-none  text-white  ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path strokeLinejoin="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          <span className="btn-add-video ">Add video</span>
        </button>
      </div>

      <div className="  w-full flex flex-col relative min-h-[500px]">

        {
          addvid ?
            <>
              <div className="filmcontainer flex flex-wrap  blur mt-3 gap-[1rem] w-full">
                {isEmpty ? <h2 className="dark:text-white text-[1.5rem] font-semibold">Upload Videos Here !! </h2> : null}
                {
                  videos?.map(video => {
                    if (video.Visible === 1) {
                     return  <Video key={video.ID} video={video} handleRemoveVideo={handleRemoveVideo} />
                  }
                })
                }
              </div>

            </>

            :
            <div className="filmcontainer flex flex-wrap mt-3 gap-[1rem]">
              {isEmpty ? <h2 className="dark:text-white text-[1.5rem] font-semibold">Upload Videos Here !! </h2> : null}
              {
                videos?.map(video => {
                  return <Video key={video.ID} video={video} handleRemoveVideo={handleRemoveVideo} />
                })
              }
            </div>
        }

        <div>
          {
            addvid && !isDragged && (<PopAddVideo handleaddvid={handleaddvid} handleUpload={handleUpload} />)
          }

        </div>
        {!addvid && isDragged && (
          <div className="z-40">
            <EditVideo setDrag={setDrag} video={video} />
          </div>
        )}
        {
          uploads.length > 0 ?
            <Upload videos={uploads} handleEdit={handleEdit} handleRemoveUpload={handleRemoveUpload} />
            :
            null
        }

      </div>
    </>
  )
}

export default UploadDrop
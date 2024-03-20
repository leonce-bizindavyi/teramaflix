import React, { useState, useContext, useRef } from 'react'
import Link from 'next/link';
import { SessionContext } from '../context/Auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function EditVideo({ uuid, video, handleaddvid }) {
  const router = useRouter()
  const videoRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [photo, setPhoto] = useState(null)
  const [annulation_recadrage, setAnnulation_recadrage] = useState(false);
  const [short, setShort] = useState(0)
  const [image, setImage] = useState(null)
  const [clickedNext, setClickedNext] = useState(false)
  const auth = useContext(SessionContext)
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(video)
  }, [video])

  const handleNext = () => {
    if (videoRef.current && formData.Body) {
      if (videoRef.current.duration < 80 && videoRef.current.videoWidth < videoRef.current.videoHeight) {
        setShort(1)
      } else {
        setShort(0)
      }
      setClickedNext(true)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setAnnulation_recadrage(true)
    }
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleCrop = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL('image/png');
      setCroppedImage(croppedImageUrl);
      setAnnulation_recadrage(!annulation_recadrage)
      const byteString = atob(croppedImageUrl.split(',')[1]);
      const mimeString = croppedImageUrl.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      setPhoto(blob)
    }
  };

  const handleSubmit = async () => {
    const form = new FormData()
    form.append('title', formData.Title)
    form.append('desc', formData.Body)
    form.append('cat', formData.Categorie)
    form.append('user', formData.User)
    form.append('image', photo)
    form.append('short', short)
    form.append('video', formData.Video)
    const response = await fetch('/api/upload/edit', {
      method: 'POST',
      body: form
    });
    if (response.ok) {
      router.reload()
    } 
  }
  let videoSrc = ''
  if (video.Video) {
    videoSrc = `/api/stream?videoId=${video.Video}`;
  }
  if (clickedNext) {
    return (
      <div className='absolute rounded-md flex flex-col  justify-center items-center space-y-4  right-0 top-5 lg:w-[80%] w-full h-max bg-gray-200 p-4 py-10 '>
        <div class="  w-[300px] h-[170px] rounded  overflow-hidden">
          {croppedImage && (
            <div class="imag w-[100%] h-[170px]  ">
              <Image width={500} height={500}
                src={croppedImage}
                className="w-[100%] h-[100%] object-cover"
                alt="thumb"
              />
            </div>
          )}
        </div>
        <div class="detail-details flex flex-col  space-y-2 ">
          <span className='font-semibold text-md'>Title : <span className='font-normal ' title={`${formData.Title}`}> {truncateText(formData.Title, 40)}</span></span>
          <span className='font-semibold text-md'>Date : <span className='font-normal '>{formData.Created_at}</span> </span>
          <div>
            <span className='font-semibold text-md w-[80%]'>Description</span>
            <p title={`${formData.Body}`} >{truncateText(formData.Body, 255)}</p>
          </div>
        </div>
        <div className='flex flex-row space-x-6'>
          <button className='border-none p-2 flex flex-row space-x-1 items-center text-blue-500 bg-white rounded-lg' onClick={e => setClickedNext(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>

            <span>back</span>

          </button>
          <button onClick={() => {
            handleSubmit()
          }} className="bg-blue-500 p-3 text-white rounded font-semibold ">Upload</button>
        </div>
        <button className="btn-addvid-closer absolute top-1 right-4" onClick={() => handleaddvid(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="drop-video-closer w-6 h-6 text-blue-500 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )

  }
  else {
    return (
      <>
        <div className='absolute rounded-md  right-0 top-5 lg:w-[80%] w-full bg-gray-200 p-4  '>
          <div className=" p-4   h-max flex flex-col md:flex-row md:space-x-4 justify-center  space-y-4 md:space-y-0 ">
            <div className="description flex  flex-col md:w-[50%]   space-y-4">
              <label htmlFor="title" className='font-semibold text-slate-800'>Title</label>
              <input type="text" id="title"
                onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                value={formData.Title}
                className=" border-2 border-white h-10 rounded focus:outline-none" />
              <label htmlFor="textarea" className='font-semibold text-slate-800'>Description</label>
              <textarea id="textarea" cols="30" rows="5"
                onChange={(e) => setFormData({ ...formData, Body: e.target.value })}
                value={formData.Body}
                className="border-2 border-white  rounded focus:outline-none "></textarea>
              <label htmlFor="Categorie" className='font-semibold text-slate-800'>Categories</label>
              <select
                id="Categorie"
                value={formData.Categorie}
                onChange={(e) => setFormData({ ...formData, Categorie: e.target.value })}
                className="border-2 border-white h-10 rounded focus:outline-none"
              >
                <option value="">-- Select Category --</option>
                <option value="ct1">Music</option>
                <option value="ct2">Films</option>
                <option value="ct3">Comedie</option>
                <option value="ct4">Saison</option>
              </select>
              <div className="flex flex-col space-y-4 space-x-4 md:max-w-[100%]">
                <div className="flex flex-row space-x-4">
                  <h2 className='font-semibold text-slate-800'>Thumbnails</h2>
                  <label htmlFor="thumnail">
                    <span className="bg-blue-500 p-2 text-white rounded text-base ">Add Thumbnail</span>
                  </label>
                </div>

                <input className='hidden' accept="image/*"
                  onChange={(e) => { handleImageChange(e) }} type="file" id="thumnail" />
                {croppedImage && (
                  <div className="imag w-[100%] h-[170px] rounded overflow-hidden">
                    <Image width={500} height={500}
                      src={croppedImage}
                      className="w-[100%] h-[100%] object-cover"
                      alt="thumb"
                    />
                  </div>
                )}
                {
                  image && annulation_recadrage && (
                    <div className='flex items-center justify-center'>
                      <div className='absolute mb-[9rem] bg-gray-200 border-2 border-blue-500 rounded-md'>
                        <AvatarEditor
                          ref={(editorInstance) => setEditor(editorInstance)}
                          image={image}
                          width={455}
                          height={270}
                          border={80}
                          color={[245, 245, 245, 0.6]} // Couleur de fond (blanc transparent)
                          scale={scale}
                          rotate={0}
                        />
                        <div className='grid grid-cols-1 gap-y-0'>
                          <div className='flex justify-center space-x-4' >
                            <label className='font-semibold'>Échelle :</label>
                            <input
                              type="range"
                              min="1"
                              max="2"
                              step="0.01"
                              value={scale}
                              onChange={handleScaleChange}
                            />
                            <span>{scale}</span>
                          </div>
                          <div className='flex justify-between px-5 items-center'>
                            <button className='hover:bg-blue-700 text-white  w-[4.5rem] h-[1.7rem] bg-blue-600 rounded-sm ' onClick={handleCrop}>
                              Recadrer
                            </button>
                            <button onClick={() => setAnnulation_recadrage(!annulation_recadrage)} className='mb-4 hover:bg-red-700 text-white w-[4.5rem] h-[1.7rem] mt-3 bg-red-600 rounded-sm'>
                              annuler
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>



            </div>
            <div className="detail md:w-[40%] flex flex-col space-y-6 items-center">
              <div className="  h-[170px]">
                <div className="imag w-[100%] h-[170px] rounded  overflow-hidden">
                  <video ref={videoRef} src={videoSrc} className="w-[100%]  h-[100%] object-cover" alt="" controls autoPlay />
                </div>
              </div>
              <div className="detail-details flex flex-col  space-y-2 ">
                <span className='font-semibold text-slate-800' >Link : <Link title={`${process.env.NEXT_PUBLIC_URL}Watch/${uuid}`} className='text-blue-500 font-normal hover:underline underline-offset-4' href={`/Watch?v=${uuid}`}>{process.env.NEXT_PUBLIC_URL}Watc...</Link></span>
              </div>
              <div className='uploading... flex flex-row items-center space-x-2'>
                {video.Success || video.uniid ?
                  <>
                    <span>uploaded</span>
                    <span>100%</span>
                  </>
                  :
                  <>
                    <div class="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
                    {video.percent === 100 && (<span>Processing...</span>)}
                    {video.percent === 0 ?
                      <span>Waiting...</span>
                      :
                      <>
                        {video.percent < 100 && (
                          <>
                            <span>uploading...</span>
                            <span>{video.percent}%</span>
                          </>
                        )}
                      </>
                    }
                  </>
                }
              </div>
            </div>
          </div>
          <div className='w-full flex justify-center'>
            <button className='border-none p-3 flex flex-row space-x-1 text-blue-500 bg-white rounded-lg' onClick={() => { handleNext() }}  >
              <span>Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>

            </button>
          </div>
          <button className="btn-addvid-closer absolute top-3 right-4" onClick={() => handleaddvid(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="drop-video-closer w-6 h-6 text-blue-500 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


      </>
    )
  }

}

export default EditVideo
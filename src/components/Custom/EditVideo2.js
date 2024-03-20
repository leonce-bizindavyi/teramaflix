import React, { useState, useEffect, useContext, useRef } from 'react'
import Link from 'next/link';
import { SessionContext } from '../context/Auth';
import Upload from './Uploads';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AvatarEditor from 'react-avatar-editor';

function EditVideo({ uuid }) {
  const router = useRouter()
  const [image, setImage] = useState(null)
  const [scale, setScale] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [photo, setPhoto] = useState(null)
  const [annulation_recadrage, setAnnulation_recadrage] = useState(false);
  const videoRef = useRef(null);
  const auth = useContext(SessionContext)
  const [videos, setVideos] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    cat: "",
    user: "",
    id: "",
    image: null,
    video: "",
    oldimage: ""
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file })
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

  useEffect(() => {
    if (auth.session) {
      const fetchVideos = async () => {
        const response = await fetch(`/api/posts/editPost/${uuid}`);
        const data = await response.json();
        if (data) {
          setFormData((prevFormData) => ({
            title: data.Title,
            desc: data.Body,
            cat: data.CatId,
            user: data.User,
            id: data.ID,
            oldimage: data.Image,
            video: data.Video,
          }));
        }
      };
      const fetchUploads = async () => {
        const user = await auth;
        const response = await fetch(`/api/posts/hidePosts/${user.ID}`);
        const data = await response.json();
        if (data.length === 0) {
          // Faites quelque chose si les données sont videos
        } else {
          setVideos(data);
        }
      };

      fetchVideos();
      fetchUploads();
    }
  }, [auth, uuid]);

  const handleSubmit = async () => {
    if (videoRef.current) {
      const form = new FormData()
      form.append('title', formData.title)
      form.append('desc', formData.desc)
      form.append('cat', formData.cat)
      form.append('user', formData.user)
      form.append('id', formData.id)
      form.append('image', photo)
      form.append('oldimage', formData.oldimage)
      if (!isNaN(videoRef.current.duration)) {
        if (videoRef.current.duration > 80 && videoRef.current.videoWidth < videoRef.current.videoHeight) {
          form.append('short', 1)
        } else {
          form.append('short', 0)
        }
        if (formData.cat, formData.title) {
          const response = await fetch('/api/posts/addPost', {
            method: 'POST',
            body: form
          });
          // Vérifier si la création de l'utilisateur a réussi
          if (response.ok) {
            const post = await response.json();
            if (post.Success) {
              //router.push('/upload')
              console.log(post)
            }
            // Réinitialiser le formulaire
            setFormData({
              ...formData,
              title: ""
            })
            setFormData({ ...formData, desc: "" })
            setFormData({ ...formData, cat: "" })
            setFormData({ ...formData, image: null }) 
          } else {
            console.error(`Failed to create user: ${response.status} ${response.statusText}`);
          }
        }
        // Envoyer les données à l'API pour les insérer dans la base de données


          
      }

    }
  }

  const videoSrc = `/api/stream?videoId=${formData.video}`;


  return (
    <>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 ">
        <div className="description flex  flex-col md:w-[50%]  space-y-4">
          <label htmlFor="title">Title</label>
          <input type="text" id="title"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title}
            className=" border-2 border-blue-500 h-10 rounded" />
          <label htmlFor="textarea">Description</label>
          <textarea id="textarea" cols="30" rows="5"
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            value={formData.desc}
            className="border-2 border-blue-500  rounded"></textarea>
          <label htmlFor="Categorie">Categories</label>
          <select
            id="Categorie"
            value={formData.Categorie}
            onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
            className="border-2 border-blue-500 h-10 rounded"
          >
            <option value="">-- Select Category --</option>
            <option value="ct1">Music</option>
            <option value="ct2">Films</option>
            <option value="ct3">Comedie</option>
            <option value="ct4">Saison</option>
          </select>
          <div className="flex flex-row space-x-4 md:max-w-[100%]">
            <div className="flex flex-row space-x-4">
              <h2>Thumbnails</h2>
              <label htmlFor="thumnail">
                <span className="bg-blue-500 p-2 text-white rounded text-base ">upload</span>
              </label>
            </div>

            <input className='hidden'
              onChange={(e) => handleImageChange(e)} type="file" id="thumnail" />
            {croppedImage ?
              <div className="imag w-[100%] h-[170px] rounded overflow-hidden">
                <Image width={260} height={170}
                  src={croppedImage}
                  className="w-[100%] h-[100%] object-content"
                  alt="thumb"
                />
              </div>
              :
              <>
                {formData.oldimage && (
                  <div className="imag w-[100%] h-[170px] rounded overflow-hidden">
                    <Image src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${formData.oldimage}`}
                      width={800} height={800} alt='video'
                      className="video w-[100%]  h-[100%] object-fit"
                      priority={true} placeholder='blur'
                      blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                  </div>
                )}
              </>
            }

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

          <button onClick={handleSubmit} className="bg-blue-500 w-[5rem] p-2 text-white rounded mr-5">save</button>

        </div>
        <div className="detail md:w-[50%] flex flex-col space-y-6 items-center">
          <div className="  h-[170px]">
            <div className="imag w-[100%] h-[170px] rounded  overflow-hidden">
              <video ref={videoRef} src={videoSrc} className="w-[100%]  h-[100%] object-cover" alt="" controls />
            </div>
          </div>
          <div className="detail-details flex flex-col  space-y-2 ">
            <span>Title : Brave</span>
            <span >Link : <Link title={`${process.env.NEXT_PUBLIC_URL}Watch/${uuid}`} className='text-blue-500 hover:underline underline-offset-4' href={`/Watch?v=${uuid}`}>{process.env.NEXT_PUBLIC_URL}Watc...</Link></span>
          </div>
        </div>
      </div>

      {
        videos ? <Upload videos={videos} /> : null}
    </>
  )
}

export default EditVideo
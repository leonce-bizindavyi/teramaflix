import React, { useRef, useState, useEffect, useContext } from 'react'
import { SessionContext } from '../context/Auth';
import { useRouter } from 'next/router'
import Image from 'next/image';
import AvatarEditor from 'react-avatar-editor';

const CreateChannel = ({ role }) => {
  const auto = useContext(SessionContext)
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState('')
  const [photo, setPhoto] = useState(null)
  const [thumb, setThumb] = useState(null)
  const [descriptio, setDescriptio] = useState('')
  const [category, setCategory] = useState('')
  const [pageName, setPageName] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [annulation_recadrage, setAnnulation_recadrage] = useState(false);

  // crop image 
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (auto.session && role === 'edit') {
      setPageName(auto.session.PageName)
      setDescriptio(auto.session.description)
      setCategory(auto.session.categorie)
      setThumb(auto.session.Photo)
    }
  }, [role, auto])


  const handleGetpic = (datas) => {
    setSelectedImage(URL.createObjectURL(datas[0]))
    setPhoto(datas[0])
  }
  const handleSavePage = async () => {
    if (!photo && !pageName && !category && !descriptio) setError('All fields Are empty')
    /* else if(!photo)setError('photo field is obligatory ') */
    else if (!pageName) setError('pageName field is obligatory ')
    else if (!category) setError('category field is obligatory ')
    else if (!descriptio) setError('Description field is obligatory ')
    else {
      const user = await auto
      const formData = new FormData()
      formData.append("pageName", pageName)
      formData.append("descriptio", descriptio)
      formData.append("category", category)
      formData.append("userId", user.session.User)
      formData.append("photo", photo)
      formData.append("user", auto.session.ID)

      if (role === 'edit') {
        formData.append("image", auto.session.Photo)
        const res = await fetch(`/api/createChannel/edit`, { method: "POST", body: formData })
        const response = await res.json();
        if (response.message == 'Success') {
          localStorage.setItem('token', response.token)
          setSuccess('Success')
          router.reload()
        }
        else {
          setError(response.message)
          return
        }
      } else {

        const res = await fetch(`/api/createChannel`, { method: "POST", body: formData })
        const response = await res.json();
        if (response.message == 'Success') {
          localStorage.setItem('token', response.token)
          setSuccess('Success')
          router.push(`/profile?c=${response.uniid}`)
        }
        else {
          setError(response.message)
          return
        }
      }
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setAnnulation_recadrage(true)
      setCroppedImage(null);
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
  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <div className="header-profil flex flex-col justify-center items-center space-y-2">
          <div className="profil-pic rounded-full overflow-hidden">
            {croppedImage ? <Image src={croppedImage} width={500} height={500} alt="profil" className="w-36 h-36" /> :
              <>
                {
                  thumb ?
                    <Image src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${thumb}`} width={500} height={500} alt="profil" className="w-36 h-36" />
                    :
                    <Image
                      src={`/img/logo.png`} width={500} height={500} alt="profil" className="w-36 h-36" />
                }
              </>
            }
          </div>
          <label htmlFor='changePic' className="dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-white bg-blue-500 hover:bg-blue-600 cursor-pointer p-1 text-white rounded   ">change profil
          </label>
          {error ? <span className='dark:text-red-600 text-red-600'>{error}</span> : <span className='dark:text-white text-blue-600'>{success}</span>}

          <input type='file' onChange={handleImageChange} id='changePic' className='hidden' />
          <h1 className="dark:text-white font-semibold text-[1.2rem] text-[rgb(100,116,139)]">Information of my page</h1>
          {image &&
            <>
              {
                annulation_recadrage && (
                  <div className='flex items-center justify-center'>
                    <div className='dark:bg-medium absolute bg-white h-[26.5rem] border-2 border-gray-500 rounded-md'>
                      <AvatarEditor
                        ref={(editorInstance) => setEditor(editorInstance)}
                        image={image}
                        width={200}
                        height={200}
                        border={50}
                        borderRadius={100}
                        color={[245, 245, 245, 0.6]} // Couleur de fond (blanc transparent)
                        scale={scale}
                        rotate={0}
                      />
                      <div className='grid grid-cols-1 gap-y-6 mt-2 mb-2'>
                        <div style={{ marginTop: '10px' }} className='flex justify-center space-x-4' >
                          <label className='dark:text-white font-semibold'>Échelle :</label>
                          <input
                            type="range"
                            min="1"
                            max="2"
                            step="0.01"
                            value={scale}
                            onChange={handleScaleChange}
                          />
                        </div>
                        <div className='flex justify-center space-x-[4rem]'>
                          <button style={{ marginTop: '10px' }} className='dark:bg-slate-600 dark:hover:bg-slate-700 mb-4 hover:bg-blue-700 text-white  w-[4.5rem] h-[1.7rem] bg-blue-600 rounded-sm ' onClick={handleCrop}>
                            Recadrer
                          </button>
                          <button onClick={() => setAnnulation_recadrage(!annulation_recadrage)} className='dark:bg-slate-600 dark:hover:bg-slate-700 hover:bg-red-700 text-white w-[4.5rem] h-[1.7rem] mt-3 bg-red-600 rounded-sm'>
                            annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </>
          }

        </div>
        <div className="container-channel flex flex-col justify-center mt-4 md:w-[380px] space-y-3">
          <label className='dark:text-white' htmlFor="title">Name of channel</label>
          <input type="text" value={pageName} id="title" onChange={(e) => { setPageName(e.target.value) }} className="dark:border-2 dark:border-slate-700 border-2 border-blue-500 focus:outline-none h-10 rounded" />
          <label className='dark:text-white' htmlFor="Categorie">Type of channel</label>
          <select id="Categorie" value={category} onChange={(e) => { setCategory(e.target.value) }} className="dark:border-2 dark:border-slate-700 border-2 border-blue-500 h-10 rounded">
            <option value="2">Series</option>
            <option value="3" >Film</option>
            <option value="4">Comédie</option>
            <option value="5">Music</option>
            <option value="1">Other</option>
          </select>
          <label className='dark:text-white' htmlFor="textarea">Description</label>
          <textarea id="textarea" value={descriptio} onChange={(e) => { setDescriptio(e.target.value) }} cols="30" rows="3" className="dark:border-2 dark:border-slate-700 border-2 border-blue-500 focus:outline-none rounded"></textarea>
          <button onClick={handleSavePage} className="dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-white bg-blue-500 hover:bg-blue-600 p-2 text-white rounded ">save</button>
        </div>
      </div>
    </>
  )
}
export default CreateChannel
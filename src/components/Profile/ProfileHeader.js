import React, { useState, useEffect, useContext } from 'react'
import SubBtn from '../subs/SubBtn'
import { useRouter } from 'next/router'
import Title from '../Title'
import { SessionContext } from '../context/Auth'
import Image from 'next/image'

function ProfileHeader({ handleSetPage, page }) {
  const auth = useContext(SessionContext)
  const [abonne, setAbonne] = useState(false)
  const [cover, setCover] = useState(null)
  const [auto, setAuto] = useState({})
  const [user, setUser] = useState([])
  const router = useRouter()
  const [coverBlobUrl, setCoverBlobUrl] = useState('/img/cover.jpg');
  const [profBlobUrl, setProfBlobUrl] = useState('/img/logo.png');
  //user profile

  const handleSub = async (status) => {
    if (status === true) {
      addSub(user.ID, auto.ID)
    } else {
      deleteSub(user.ID, auto.ID)
    }

  }
  const handleEditChannel = () => {
    router.push('/channel/edit')
  }
  const handleDetailChannel = () => {
    router.push('/details/channel')
  }
  const addSub = async (user, sub) => {
    const response = await fetch(`/api/reactions/addSubs/${user}/${sub}`)
    const data = await response.json()
    if (data.affectedRows === 1) {
      setAbonne(true)
    }
  }
  const deleteSub = async (user, sub) => {
    const response = await fetch(`/api/reactions/deleteSub/${user}/${sub}`)
    const data = await response.json()
    if (data.affectedRows === 1) {
      setAbonne(false)
    }
  }
  const handleAddCover = async (image) => {
    const form = new FormData()
    form.append('cover', image)
    form.append('user', user.ID)
    form.append('oldCover', user.Cover)
    // Envoyer les données à l'API pour les insérer dans la base de données
    const response = await fetch('/api/users/cover', {
      method: 'POST',
      body: form
    });
  }
  useEffect(() => {
    if (router.query.c && auth.session) {
      setAuto(auth.session)
      const fetchUsers = async () => {
        const response = await fetch(`/api/users/getUser/${router.query.c}`)
        const data = await response.json()
        if (data.length > 0) {
          fetchSubReactions(data[0].ID)
          setUser(data[0])
        }
      }
      const fetchSubReactions = async (user) => {
        const sub = auth.session
        const response = await fetch(`/api/reactions/subs/${user}/${sub.ID}`)
        const data = await response.json()
        if (data[0] == undefined) {
          setAbonne(false)
        } else {
          setAbonne(true)
        }

      }
      fetchUsers()
    }
  }, [router, auth])
  return (
    <>
      {user.PageName ?
        <Title title={`${user.PageName} - TeramaFlix`} />
        :
        <Title title={`Profile - TeramaFlix`} />
      }
      <div className=" px-12 py-1 z-0">
        <div className="relative md:h-40 h-30 w-full rounded-md overflow-hidden ">
          {cover ?
            <Image width={500} height={500} src={URL.createObjectURL(cover)} alt="cover" className=" w-full  rounded-md" />
            :
            <>
              {user.Cover && (<Image width={800} height={800} src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${user.Cover}`} alt="cover" className="  w-full  rounded-md" />)}
            </>
          }

          {auto.ID === user.ID && (
            <>
              <input type='file' onChange={(e) => { setCover(e.target.files[0]), handleAddCover(e.target.files[0]) }} id='cover' className='hidden' />
              <label htmlFor='cover'><span className='dark:bg-slate-700 dark:hover:bg-slate-600 absolute bottom-3 sm:bottom-2 sm:right-6 right-1 bg-gray-300 text-white  p-1 sm:p-2 rounded-md cursor-pointer hover:bg-blue-500'>
                Change Cover
              </span>
              </label>
            </>
          )}
        </div>
      </div>
      <div className=" relative bottom-9 flex md:flex-row flex-col items-center justify-center  z-0  space-x-12 ">
        <div className="  relative flex justify-center items-center w-[4rem] h-[4rem] sm:h-[6.5rem] sm:w-[6.5rem] md:w-[6rem] md:h-[6rem]  lg:h-36 lg:w-36 rounded-full border border-gray-100 bg-white ">
          <div className='w-[90%] h-[90%]  rounded-full overflow-hidden'>
            {
              user.Photo ?
                <Image width={500} height={500} alt='profile'
                  className="w-full h-full"
                  src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${user.Photo}`}
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                :
                <Image width={500} height={500} alt='profile'
                  className="w-full h-full"
                  src={`/img/logo.png`}
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
            }
          </div>

        </div>
        <div className=''>
          <div className="  break:relative break:bottom-12 flex  px-4 justify-start sm:flex-col md:flex-row lg:flex-row flex-col  ">

            {
              user.ID && (
                <div className="flex space-x-3">
                  <span className="dark:text-white mt-1 text-xl font-semibold sm:-mt-[1rem] md:mt-[2rem] sm:text-2xl md:text-3xl sm:font-normal text-blue-600 ">{user.PageName} </span>
                  {auto.ID === user.ID ? null : <SubBtn handleSub={handleSub} abonne={abonne} />}
                </div>
              )
            }
          </div>
          <div className="flex justify-center -ml-5 mx-3 md:ml-0 px-7 pt-2 space-x-6">
            <span className="dark:text-white text-sm font-semibold text-blue-600"> {user.Posts} Posts</span>
            <span className="dark:text-white text-sm font-semibold text-blue-600"> {user.Abonnes} Abonnés</span>
            <span className="dark:text-white text-sm font-semibold text-blue-600 "> {user.Likes} Likes </span>
          </div>
          {
            auto.ID === user.ID ? (
              <div className='buttons absolute space-x-4 sm:ml-0 md:ml-[1.7rem] mt-4 sm:space-x-6'>
                <button onClick={handleEditChannel} className='dark:bg-slate-700 dark:hover:bg-slate-600 p-2 bg-gray-400 hover:bg-blue-500 text-white rounded-md'>Edit Channel</button>
                <button onClick={handleDetailChannel} className='dark:bg-slate-700 dark:hover:bg-slate-600 p-2 bg-gray-400 hover:bg-blue-500 text-white rounded-md'>Detail Channel</button>
              </div>
            ) : null
          }

        </div>
      </div>
      <div className="flex items-center  justify-center mt-[2.5rem] sm:mt-[3.5rem] md:mt-[2rem] lg:mt-[2rem]">
        <div className="flex flex-row  xl:space-x-[6rem]  break:space-x-4 space-x-[2rem] sm:space-x-[4rem] justify-center    text-xs">
          {page === 1 ?
            <span className="dark:bg-slate-700 dark:hover:bg-slate-600 flex justify-self-center  text-white font-semibold p-2  rounded-lg transform ease-in-out bg-blue-600 hover:rounded-lg  cursor-default lg:w-20 justify-center" > HOME </span>
            :
            <span onClick={() => handleSetPage(1)} className="dark:bg-slate-700 dark:hover:bg-slate-600 flex justify-self-center  bg-gray-500  text-white   font-semibold p-2  rounded-lg transform translate-y-1 hover:translate-y-0 duration-500 ease-in-out hover:bg-blue-600 hover:rounded-lg hover:text-white cursor-pointer lg:w-20 justify-center" > HOME </span>
          }
          {page === 2 ?
            <span className="dark:bg-slate-700 dark:hover:bg-slate-600 flex justify-self-center  text-white font-semibold p-2  rounded-lg transform ease-in-out bg-blue-600 hover:rounded-lg  cursor-default lg:w-20 justify-center"  >  VIDEOS</span>
            :
            <span onClick={() => handleSetPage(2)} className="dark:bg-slate-700 dark:hover:bg-slate-600 flex justify-self-center  bg-gray-500  text-white   font-semibold p-2  rounded-lg transform translate-y-1 hover:translate-y-0 duration-500 ease-in-out hover:bg-blue-600 hover:rounded-lg hover:text-white cursor-pointer lg:w-20 justify-center "  >  VIDEOS</span>
          }
          {page === 3 ?
            <span className="dark:bg-slate-700 dark:hover:bg-slate-600 flex justify-self-center  text-white font-semibold p-2  rounded-lg transform ease-in-out bg-blue-600 hover:rounded-lg  cursor-default lg:w-20 justify-center"  >  ABOUT</span>
            :
            <span onClick={() => handleSetPage(3)} className="dark:bg-slate-700 dark:hover:bg-slate-600 flex justify-self-center  bg-gray-500  text-white   font-semibold p-2  rounded-lg transform translate-y-1 hover:translate-y-0 duration-500 ease-in-out hover:bg-blue-600 hover:rounded-lg hover:text-white cursor-pointer lg:w-20 justify-center "  >  ABOUT</span>
          }
          {/* <span className="flex justify-self-center  text-white cursor-progress  font-semibold p-2  rounded-lg transform ease-in-out bg-blue-600 hover:rounded-lg  cursor-default lg:w-20 justify-center" >  VIDEOS </span> */}


        </div>
      </div>
    </>
  )
}

export default ProfileHeader
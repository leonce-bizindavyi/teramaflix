import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}


function Video({ video, handleRemoveVideo }) {
  const deletePost = async (id, video, image) => {
    const response = await fetch(`/api/posts/deletePost/${id}/${video}/${image}`)
    const data = await response.json()
    if (data.success) {
      handleRemoveVideo(id)
    }
  }
  
  return (
    <>
      {
        video.Image && (
          <div className=" videocontainer w-[230px] h-[230px]  ">
            <div className="imag w-[100%] h-[70%] rounded  overflow-hidden">
              <Link href={`/details/post?v=${video.uniid}`}>
                <Image src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Image}`}
                  width={800} height={800} alt='video'
                  className="video w-[100%]  h-[100%] object-fit"
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
              </Link>
            </div>
            <Link href="">
              <div className="flex space-x-1 justify-start mb-0">
                <div className="right-1">
                  <p className="dark:text-white text-sm font-medium" title={video.Title} > {truncateText(video.Title, 25)}</p><br />
                </div>
              </div>
            </Link>
            <div className="btn-remove-edit flex justify-between">
              <button onClick={() => deletePost(video.ID, video.Video, video.Image)} className="searchBtn bg-red-500 h-10 hover:bg-red-900 duration-1000  px-3 md:py-2 md:mr-6 text-sm md:text-base    rounded  text-white   ">
                remove
              </button>
              <Link href={`/editvideo/${video.uniid}`}>
                <button className="searchBtn bg-blue-500 h-10 hover:bg-blue-900 duration-1000  px-3 md:py-2 md:mr-6  text-sm md:text-base   rounded  text-white   ">
                  edit
                </button>
              </Link>
            </div>
          </div>
        )
      }

    </>
  )
}

export default Video
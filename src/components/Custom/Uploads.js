import React from 'react';
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function Upload({ videos, handleEdit, handleRemoveUpload }) {
  const deletePost = async (id, video, image) => {
    const response = await fetch(`/api/posts/deletePost/${id}/${video}/${image}`)
    const data = await response.json()
    if (data.success) {
      handleRemoveUpload(id)
    }
  }
  return (
    <>
      <div className="video-list absolute z-0 right-0 bottom-12 max-h-[250px] min-w-[40%] max-w-[100%] bg-gray-100 p-4 overflow-auto space-y-2">
        {
          videos?.map(video => {
            return (
              <>
                <div key={video.ID} className="video1  flex flex-row justify-between items-center space-x-4 hover:bg-gray-400 bg-gray-300 p-3 rounded">
                  <div onClick={() => handleEdit(video)} className='flex flex-row justify-between items-center space-x-4 cursor-pointer' >
                    <div className="flex flex-row items-end ">
                      <span className="text-[1.2rem] font-semibold" style={{ whiteSpace: 'nowrap' }}>
                        {truncateText(video.Title, 25)}
                      </span>
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
                          {video.percent === 100 && (
                            <span>Processing...</span>
                          )}
                          <>
                            {video.percent === 0 ?
                              <span>Waiting...</span>
                              :
                              <>
                                {true && (
                                  <>
                                    <span>uploading...</span>
                                    <span>{video.percent}%</span>
                                  </>
                                )}
                              </>
                            }
                          </>
                        </>
                      }

                    </div>
                  </div>
                  <svg onClick={() => deletePost(video.ID, video.video, video.Image)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="remove-video hover:text-red-700 rounded-full w-5 h-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </>
            )
          })
        }
      </div>

    </>
  )
}
export default Upload
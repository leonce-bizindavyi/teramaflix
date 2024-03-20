import React from 'react'
import { useRouter } from 'next/router';
import Title from '@/components/Title';
import EditVideo from '@/components/Custom/EditVideo2';
function EditVideoPage() {
  const router = useRouter()
  const videoId = router.query.videoId

  return (
    <>
      <Title title='Edit Video' />
        { videoId ?
            <EditVideo uuid={videoId} /> 
          :
          null
        }      
    </>
  )
}

export default EditVideoPage
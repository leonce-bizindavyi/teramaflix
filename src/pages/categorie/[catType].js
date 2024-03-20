import React from 'react'
import { useRouter } from 'next/router'
import DetailCat from '@/components/Categories/DetailCat'
import Title from '@/components/Title'
function CatType() {
    const router = useRouter()
    const catType = router.query.catType
  return (
    <>
        <Title title={`${catType} Subscribers - TeramaFlix`} />
        <DetailCat catType={catType} />
    </>
  )
}

export default CatType
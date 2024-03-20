import React from 'react'
import { useRouter } from 'next/router'
import SubDetail from '@/components/subs/SubDetail'
import Title from '@/components/Title'
function SubType() {
    const router = useRouter()
    const subTpe = router.query.subType
  return (
    <>
    <Title title={`${subTpe} Subscribers - TeramaFlix`} />
      <SubDetail subType={subTpe} />
    </>
  )
}

export default SubType
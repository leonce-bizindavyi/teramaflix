import Title from '@/components/Title'
import Actvate from '@/components/authentification/Actvate'
import React from 'react'
import { useRouter } from 'next/router'

function ActivatePage() {
  const router=useRouter()
  const id=router.query.uniid
  return (
    <>
    <Title title='Activation !!' />
    <Actvate id={id}/>
    </>
  )
}

export default ActivatePage
ActivatePage.getLayout = function pageLayout(page){
    return (
        <>
        {page}
        </>
    )
  }
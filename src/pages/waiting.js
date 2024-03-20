import Title from '@/components/Title'
import Wait from '@/components/authentification/Waitingpage'
import React from 'react'
import { useRouter } from 'next/router'

function ResetPage() {
  const router=useRouter()
  const mail=router.query.mail
  return (
    <>
        <Title title='Waiting...' />
        <Wait/>
    </>
  )
}

export default ResetPage
ResetPage.getLayout = function pageLayout(page){
    return (
        <>
        {page}
        </>
    )
  }
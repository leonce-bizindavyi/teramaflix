import Title from '@/components/Title'
import ResetPass from '@/components/authentification/ResetPass'
import React from 'react'
import { useRouter } from 'next/router'

function ResetPage() {
  const router=useRouter()
  const mail=router.query.mail
  return (
    <>
        <Title title='Reset Your PassWord' />
        <ResetPass mail={mail}/>
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
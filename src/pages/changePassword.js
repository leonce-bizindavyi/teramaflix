import Title from '@/components/Title'
import ChangePass from '@/components/authentification/ChangePass'
import React from 'react'

function ChangePassPage() {
  return (
    <>
        <Title title='Change Your Password' />
        <ChangePass />
    </>
  )
}

export default ChangePassPage
ChangePassPage.getLayout = function pageLayout(page){
    return (
        <>
        {page}
        </>
    )
  }
import Title from '@/components/Title'
import Login from '@/components/authentification/Login'
import React from 'react'

function LoginPage() {
  return (
    <>
      <Title title='Login' />
      <Login />
    </>
  )
}

export default LoginPage
LoginPage.getLayout = function pageLayout(page){
  return (
      <>
      {page}
      </>
  )
}
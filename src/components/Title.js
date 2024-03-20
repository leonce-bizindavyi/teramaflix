import Head from 'next/head'
import React from 'react'

function Title({title}) {
  return (
    <>
    <Head>
        <title>{title}</title>
    </Head>
    </>
  )
}

export default Title
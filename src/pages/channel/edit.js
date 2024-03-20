import CreateChannel from '@/components/Channel/createChannel'
import Title from '@/components/Title'
import React from 'react'

function ChannelPage() {
  return (
    <>
    <Title title='Create New Channel' />
        <CreateChannel role='edit' />
    </>
  )
}

export default ChannelPage

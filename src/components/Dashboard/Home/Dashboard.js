import React from 'react'
import Blocs from './Blocs'
import Stats from './Stats'
import Emails from './Emails'
import Users from './Users'
import Uploads from './Uploads'
import Title from '@/components/Title'

function Dashboard() {
  return (
    <>
    <Title title="Dashboard - TeramaFlix" />
      <div  className="dashContainer mt-5 flex flex-col space-y-5 md:space-y-10 ">
                <Blocs />
                <Stats />
                <div  className="emails-Users md:h-[400px] mb-24 flex flex-col md:flex-row justify-between space-y-5">
                    <Emails />
                    <Users />  
                </div>  
                </div>
                <Uploads />
                <div  className="footer">
                    <span  className="font-bold"><center>Admin Dashboard all right reserved teramaflix@2022</center> </span>
                </div>
    </>
  )
}

export default Dashboard
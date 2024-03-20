import LineChart from '@/components/Charts/LineChart'
import React,{useState,useEffect} from 'react'

import PieChart from '@/components/Charts/PieChart'

function Stats({users}) {
  const [catStat, setCatStat] = useState(null)
  const [userData, setUserData] = useState()
  const userStat = async (user) =>{
    const response = await fetch(`/api/users/user/${user}`)
    const datas = await response.json()
    //console.log(datas)
     setUserData({
        labels: datas[0].map((data)=>data.Year+':'+ data.Month),
        datasets: [{
          label: "Posts",
          data: datas[0].map((data) => data.PostCount),
          backgroundColor: "purple",
          borderColor: "purple",
          borderWidth: 1,
        },{
            label: "Likes",
            data: datas[1].map((data) => data.LikeCount),
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 1,
          },{
            label: "Views",
            data: datas[2].map((data) => data.ViewCount),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
          }]
      }) 
}
const catSubStat = async (user) =>{
    const response = await fetch(`/api/users/cat/${user}`)
    const resp = await response.json()
    const datas = resp[1]
    
    if(resp[0][0].SubCount !== 0){
        setCatStat({
        labels: datas.map((data)=>data.Category),
        datasets: [{
          label: "Categories",
          data: datas.map((data) => data.SubscriberCount),
          backgroundColor: ["purple","red","gray","green","blue"],
          borderColor: ["purple","red","gray","green","blue"],
          borderWidth: 1,
        }]
      })
    } 
}
useEffect(() => {
  if(users){
    catSubStat(users.ID)
    userStat(users.ID)
  }

}, [users])

  return (
    <>
    <div  className="stat flex flex-wrap space-y-2 mt-5 md:flex-row md:justify-between md:h-[350px]  bg-white rounded-3xl">
            {userData && (<LineChart chartData={userData} />) }  
           
            {catStat && (<PieChart chartData={catStat} />)}
        </div>
    </>
  )
}

export default Stats
import LineChart from '@/components/Charts/LineChart'
import React,{useState,useEffect} from 'react'

function Stats() {
  const [userData, setUserData] = useState({
    labels: '2022-01',
    datasets: [{
      label: "Posts",
      data: 0,
      backgroundColor: "blue"
    }]
  })
  const [count, setCount] = useState(0)
  useEffect(() => {
    // get all sms  in database
  async function fetchAllStats() {
    const response = await fetch(`/api/dash/stats`);
    const data = await response.json();
    if(data.count[0]) {
      setCount(data.count[0])
      setUserData({
        labels: data.stats[1].map((data)=>data.MoisCreation),
        datasets: [{
          label: "Posts",
          data: data.stats[1].map((data) => data.CountPosts),
          backgroundColor: "purple",
          borderColor: "purple",
          borderWidth: 3,
        },{
          label: "Users",
          data: data.stats[2].map((data) => data.CountUsers),
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 2,
        },{
          label: "Pages",
          data: data.stats[3].map((data) => data.CountPages),
          backgroundColor: "green",
          borderColor: "green",
          borderWidth: 1,
        }]
      })
    }
  }
  fetchAllStats()
  }, [])
  return (
    <>
        <div  className="stat flex flex-col space-y-2 px-4 md:flex-row md:justify-between md:h-[350px] ">
            <div  className="nbr w-[50%] md:w-[30%] h-[100px] md:h-[250px] bg-white rounded-3xl flex justify-center items-center px-10">
                <p  className="font-bold text-white text-[1rem] md:text-[1.5rem]">{count.Users}  USERS FROM MONTH</p>
            </div>
            <LineChart chartData={userData} />
        </div>  
    </>
  )
}

export default Stats
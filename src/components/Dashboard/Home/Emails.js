import React,{useState,useEffect} from 'react'
import Sms from '../Message/Sms'

function Emails() {
  const [allsms, setAllSms] = useState(null)
  useEffect(() => {
    // get all sms  in database
  async function fetchAllSms() {
    const response = await fetch(`/api/dash/sms`);
    const data = await response.json();
    if(data[0]) {
      setAllSms(data[0])
    }
  }
fetchAllSms()
  }, [])
  return (
    <>
        <div  className="sectionEmails flex flex-col  md:w-[65%] h-[400px] md:h-full bg-white rounded-3xl">
            <h1  className="font-bold text-lg md:text-xl p-4 md:p-6">Recent Emails</h1>
            <div  className=" emailsContainer w-full h-full pt-6 overflow-y-auto ">
            {
              allsms?.map(sm=>{
                  return <Sms key={sm.ID} sms={sm}/>
              })
            }
            </div>
        </div>
    </>
  )
}

export default Emails
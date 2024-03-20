import React,{useState,useEffect} from 'react'
import User from '../users/User'

function Users() {
  const [users, setUsers] = useState([])
  const fetchUsers = async () =>{
      const response = await fetch('/api/dash/users')
      const data = await response.json()
      setUsers(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <>
        <div  className=" sectionUsers md:w-[30%] h-[300px] md:h-full flex flex-col bg-white rounded-3xl">
            <h1  className="font-bold text-lg md:text-xl p-4 md:p-6">Recent Users</h1>
            <div  className="usersContainer w-full h-full pt-6 overflow-y-auto">
              {
                users?.map(user=>{
                  return <User key={user.ID} user={user} />
                })
              }
            </div>
        </div>
    </>
  )
}

export default Users
import React,{useState,useEffect} from 'react'
import User from './User'

function Users() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const fetchUsers = async () =>{
      const response = await fetch('/api/dash/users')
      const data = await response.json()
      setUsers(data)
    }
    const searchUsers = async (searchd) =>{
      setSearch(searchd)
      if(searchd!=''){
        const response = await fetch(`/api/dash/users/search/${searchd} `)
        const data = await response.json()
        setUsers(data)
      }else{
        const response = await fetch('/api/dash/users')
        const data = await response.json()
        setUsers(data)
      }
  }
    useEffect(() => {
        fetchUsers()
    }, [])
  return (
    <>
        <div  className=" sectionUser xl:w-[40%] h-[500px] xl:h-full flex flex-col bg-white rounded-3xl">
            <h1  className="font-bold text-lg xl:text-xl p-4 xl:p-6">Users</h1>
            <div  className="px-6">
                    <input onChange={(e)=>searchUsers(e.target.value)} value={search}
                    type="text" placeholder="search user"
                        className="py-2 px-2  bg-gray-300 rounded-2xl w-full"
                    id="searchText"
                    />
                </div>
            <div  className="usersContainer w-full h-[460px] pt-6 overflow-y-auto">
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
import React,{useState,useEffect} from 'react'
import Title from '../../Title'
import Users from './Users'
import Details from './Details'
import Stats from './Stats'
import { useRouter } from 'next/router' 

function UsersBloc() {
  const router = useRouter() 
  const [user, setUser]=useState(null)
  const [users, setUsers] = useState(null)
  
  useEffect(() => {
    
    // get users to in database
    if (router.query.user) {
      const user = router.query.user
      setUser(router.query.user)
      async function fetchUsers() {
      const response = await fetch(`/api/dash/users/${user}`);
      const data = await response.json();
      if (data[0]) {
        setUsers(data[0])
      }
    }
    fetchUsers()
    }
    
    
  }, [router]);
  const handleActive = async (status,user)=>{
    const response = await fetch(`/api/dash/users/active/${status}/${user}`);
    const data = await response.json();
      console.log(data)
  }
  return (
    <>
        <Title title='Users Dashboard' />
        <div  className="dashContainer mt-5 flex flex-col-reverse xl:flex-row  xl:space-x-5 ">
          <Users />
          {user ? <Details handleActive={handleActive} users={users} /> : null }
        </div>
        {user ? <Stats  users={users}/> : null }
                
    </>
  )
}

export default UsersBloc
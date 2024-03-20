import React,{useState,useEffect,useContext} from 'react'
import { SessionContext } from '../context/Auth'

function Sub({user}) {
    const auth = useContext(SessionContext)
    const [abonne, setAbonne] = useState(false)
    useEffect(() => {
    if(auth.session){
        const fetchSubReactions = async () =>{
            const sub =  auth.session
            const response = await fetch(`/api/reactions/subs/${user}/${sub.ID}`)
            const data = await response.json()
            if(data[0]==undefined){
                setAbonne(false)
            }else{
                setAbonne(true)
            }
        }
        fetchSubReactions()
    }
    }, [auth,user])
    const addSub = async () =>{
        setAbonne(true)
        const sub =  auth.session
        const response = await fetch(`/api/reactions/addSubs/${user}/${sub.ID}`)
        const data = await response.json()
        if(data.affectedRows === 1){
          setAbonne(true)
        }
      }
      const deleteSub = async () =>{
        setAbonne(false)
        const sub =  auth.session
        const response = await fetch(`/api/reactions/deleteSub/${user}/${sub.ID}`)
        const data = await response.json()
        if(data.affectedRows === 1){
          setAbonne(false)
        }
      }
  return (
    <>
        {
            abonne ?
            <span onClick={deleteSub} className="bg-[rgba(255,255,255,0.4)] hover:bg-blue-600 hover:text-white p-1 rounded-md cursor-pointer">Subscribed</span>
            :
            <span onClick={addSub} className="bg-[rgba(255,255,255,0.4)] hover:bg-blue-600 hover:text-white p-1 rounded-md cursor-pointer">Subscribe</span>
        }
    </>
  )
}

export default Sub
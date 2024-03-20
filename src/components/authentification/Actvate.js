import {React,useState} from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'


function Actvate(id) {
  const [res,setRes]=useState('')
  const [err,setError]=useState('')
  const router=useRouter()

  async function active(){
    console.log('ido',id)
    const updateData={
      method:'PUT',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        id
      })
    }
    const res=await fetch(`api/activate`,updateData)
    const response=await res.json()
    const data=response
    console.log(data)
    
    if(data.response.res=='updated'){
        setRes(data.response.message)
      
      router.push('/login')
    }
    else{
        setError(data.response.message)
      return;
    }
  }
  return (
    <>
     <div  className="h-screen w-screen bg-green-100 py-8 flex items-center">
        <div  className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
            <div  className="px-6 py-4">
                <div  className="text-3xl font-semibold text-center mb-4 bg-lime-100">{res}</div>
                <p  className="text-gray-700 text-center mb-6">Welcome to TeramaFlix.</p>
                <span className='text-red-600'>{err}</span>
                <div  className="flex justify-center">
                    <Link href="" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                     <button onClick={active}>Click to Activate and Back to login page</button> 
                      { res ? res :''}
                    </Link>
            </div>
                
            </div>
        </div>
</div>
    </>
  )
}

export default Actvate  
import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { SessionContext } from '../context/Auth';
import Image from 'next/image';

function Notify() {
  const auth = useContext(SessionContext);
  const [subscriber, setSubscriber] = useState(false)
  const [message, setMessage] = useState(false)
  const [post, setPost] = useState(false)
  const [comment, setComment] = useState(false)
  const [likes, setLikes] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(auth.session.ID!=" "){
          handleNotify();
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    fetchUser();
  
    async function handleNotify() {
      const response = await fetch(`/api/notification/${auth.session.ID}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const result = data.results[0];
          setSubscriber(result.subscriber);
          setMessage(result.message);
          setPost(result.post);
          setComment(result.comment);
          setLikes(result.likes);
        } else {
          console.log('No data to display !!');
        }
      } else {
        console.log('Erreur in your request');
      }
    }
  }, [auth.session]);
  
  const handleCheckboxChange = async (event) => {
    const { name, checked } = event.target;
    if(name=='subscriber'){
      setSubscriber(checked)
    }
    if(name=='message'){
      setMessage(checked)
    }
    if(name=='post'){
      setPost(checked)
    }
    if(name=='comment'){
      setComment(checked)
    } if(name=='likes'){
      setLikes(checked)
    }
    try {
      const response = await fetch('/api/updatenotif', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: auth.session.ID,
          columnName: name,
          value: checked,
        }),
      });
      if (response) {
        
      } else {
        console.log('Erreur de mise à jour');
      }
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <>
       <div  className="w-full pr-[18rem] mb-[2rem] mt-[13.5rem] sm:ml-64 sm:mt-[20rem] sm:mb-[8.5rem] " id="containernotifications">{/* <!--debut contenu notifications--> */}       
            <div   className="dark:bg-slate-700 dark:shadow-slate-700 dark:shadow-lg dark:ring-1 dark:ring-slate-700 dark:border-2 dark:border-slate-600 space-y-8 w-72 ml-[50%]   shadow-blue-500 shadow-lg bg-white sm:ml-[2rem] md:ml-[6rem] xl:ml-80 xl:w-96 2xl:ml-96 mr-96 py-5 rounded-md -mt-[15rem] sm:-mt-[18rem] md:-mt-[17.5rem] lg:-mt-[19rem] pt-96 ring-1 ring-blue-500 lg:right-36">
              <div  className="-mt-96  flex items-center justify-center">
                  <Image src="/logo/TeramaFlixpic.png"  width={100} height={100} className="w-8 h-8 sm:w-[4rem] sm:h-[4rem] my-1   " alt="logo"/>
              </div>           
              <div  className="mr-28 -mt-80 flex justify-center">
                   <div  className="ml-32 mr-4 flex form-check">
                     <input  id='subscribe' className="dark:shadow-lg dark:shadow-slate-700 shadow-lg shadow-blue-500  checked:bg-blue-400 form-check-input h-6 w-6 border rounded-sm cursor-pointer"  name="subscriber" checked={subscriber} onChange={handleCheckboxChange} type="checkbox"/>
                     <label htmlFor="subscribe"   className="dark:text-white font-bold ml-6  text-purple-700 font-serif ">Subscriber</label>
                   </div>
              </div>
              <div  className="mr-28 flex justify-center">
                <div  className="ml-28 mr-2  flex form-check">
                  <input  id='message' className="dark:shadow-lg dark:shadow-slate-700 shadow-lg shadow-blue-500  checked:bg-blue-400 form-check-input h-6 w-6 border rounded-sm cursor-pointer" name="message" checked={message} onChange={handleCheckboxChange} type="checkbox"/>
                  <label htmlFor="message"  className="dark:text-white font-bold ml-6  text-purple-700 font-serif ">Messages</label>
                </div>
              </div>
              <div  className="mr-28 flex justify-center">
                <div  className="ml-28 mr-12 flex form-check">
                  <input id='post' className="dark:shadow-lg dark:shadow-slate-700 shadow-lg shadow-blue-500  checked:bg-blue-400 form-check-input h-6 w-6 border rounded-sm cursor-pointer" name="post" checked={post} onChange={handleCheckboxChange} type="checkbox"/>
                  <label htmlFor="post"  className="dark:text-white font-bold ml-6  text-purple-700 font-serif ">Post</label>
                </div>
              </div>
              <div  className="mr-28 flex justify-center">
                <div  className="ml-32 mr-4 flex form-check">
                  <input id='comment' className="dark:shadow-lg dark:shadow-slate-700 shadow-lg shadow-blue-500 checked:bg-blue-400 form-check-input h-6 w-6 border rounded-sm cursor-pointer"name="comment"  checked={comment} onChange={handleCheckboxChange} type="checkbox"/>
                  <label htmlFor="comment"  className="dark:text-white font-bold ml-6  text-purple-700 font-serif ">Comments</label>
                </div>
              </div>
              <div  className="mr-28 flex justify-center">
                <div  className="ml-28 mr-10 flex form-check">
                  <input id='like' className="dark:shadow-lg dark:shadow-slate-700 shadow-lg shadow-blue-500  checked:bg-blue-400 form-check-input h-6 w-6 border rounded-sm cursor-pointer" name="likes" checked={likes} onChange={handleCheckboxChange} type="checkbox"/>
                  <label htmlFor="like"  className="dark:text-white font-bold ml-6  text-purple-700 font-serif ">Likes</label>
                </div>
              </div>
        </div>
       </div>
    </>
  )
}

export default Notify
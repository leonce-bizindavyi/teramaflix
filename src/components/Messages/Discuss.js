import React,{useState,useEffect,useContext} from 'react'
import SentDiscuss from './SentDiscuss'
import InboxDiscuss from './InboxDiscuss';
import { SessionContext } from '../context/Auth';
import Image from 'next/image';

function Discuss({handlePopsms}) {
  const auto = useContext(SessionContext)
  let previousUserId = null;
  const [sms, setSms] = useState(null)
  const [body, setBody] = useState("")
  const handleSubmit = async ()=>{
    // Envoyer les données à l'API pour les insérer dans la base de données
    if(body !== ""){
      
    console.log(body)
      const user = auto.session
      const response = await fetch('/api/dash/sms/send', {
        method:'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({body:body,user:user.ID,sent:1})
      });
      setBody("")
      fetchOtherSms()
    }
   }
   const fetchOtherSms = async() =>{
    const user = auto.session
    const response = await fetch(`/api/dash/sms/${user.uniid}/${sms.length}/20`);
    const data = await response.json();
    setBody("")
    if(data[0]) {
      setSms(previousSms=>[...previousSms,...data])
    }
  }
   useEffect(() => {
    // get sms detail in database
   async function fetchSms() {
      const user = auto.session
      const response = await fetch(`/api/dash/sms/${user.uniid}/0/20`);
      const data = await response.json();
      if(data[0]) {
        setSms(data)
      }
    }
        fetchSms()
  }, [auto]); 
  return (
    <>
    <div className='popup-message h-[470px] z-20 right-2 w-[350px] rounded-md bg-blue-500 fixed sm:right-5 bottom-5 flex flex-col  '>
      <h1 className='text-white font-semibold w-full flex items-center justify-center p-2'>TeramaFlix help center</h1>
      <div className='messages w-full h-[80%] '>
        <div  className="relative w-full h-[100%] ">
          <div id="toutmessage"  className="dark:bg-slate-700 flex-1 p-2 h-full overflow-y-scroll  bg-gray-100 space-y-5">
                
          {
            sms?.map((sm, index) => {
              const currentUserId = sm.Sent;
              const showPhoto = currentUserId !== previousUserId;

              // Mettre à jour l'ID de l'utilisateur précédent
              previousUserId = currentUserId;

              if (sm.Sent === 0) {
                return (
                  <div className="flex justify-start" key={sm.ID}>
                    {showPhoto && (
                      <div className="w-8 mr-5">
                        <Image width={80} height={80} alt='profile' className="rounded-full w-full mr-2" src="/logo/TeramaFlixpic.png" />
                      </div>
                    )}
                    <InboxDiscuss body={sm.Body} />
                  </div>
                );
              } else {
                return (
                  <div className="flex justify-end" key={sm.ID}>
                    <SentDiscuss body={sm.Body} />
                    {showPhoto && (
                      <div className="w-8 ml-3">
                        <Image width={80} height={80} alt='profile' className="rounded-full w-full mr-2" src="/img/logo.png" />
                      </div>
                    )}
                  </div>
                );
              }
            })
          }
            </div>
          </div>
        </div>
        <div  className="relative w-full h-[15%] flex justify-center items-center space-x-2">
          <input type="text" placeholder="Begin your message"  
          value={body}
          onChange={(e)=>setBody(e.target.value)}
          className="dark:bg-slate-700 dark:text-white dark:placeholder-white w-[80%] h-10 focus:outline-none focus:placeholder-gray-300 text-gray-600 placeholder-gray-400 pl-2 bg-white rounded-full "/>
          
            <button onClick={handleSubmit} className="dark:bg-slate-700 dark:hover:bg-medium inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
              <svg fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="w-8 h-8">
                <path  strokeLinecap="round"  strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
              </svg>
            </button>
          
        </div>
        <div  className="absolute top-0 right-2">
          <div onClick={()=>handlePopsms(false)} className="cursor-pointer hover:text-white py-1 mr-1" id="quitter_ecrire_message">
            <svg fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="w-6 h-6">
              <path  strokeLinecap="round"  strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default Discuss
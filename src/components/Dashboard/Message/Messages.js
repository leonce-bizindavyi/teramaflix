import React,{useState,useEffect, useContext} from 'react'
import Sms from './Sms'
import Title from '@/components/Title'
import SentSms from './SentSms'
import InboxSms from './InboxSms'
import Image from 'next/image' 
import Router, { useRouter } from 'next/router'
import { SessionContext } from '@/components/context/Auth'

function Message() { 
    const router = useRouter()
    const auth = useContext(SessionContext)
    let previousUserId = null;
    const user = router.query.user
    const [sms, setSms] = useState([])
    const [auto, setAuto] = useState([])
    const [smsUser, setSmsUser] = useState(null)
    const [allsms, setAllSms] = useState(null)
    const [profBlobUrl, setProfBlobUrl] = useState('/img/logo.png');
    const [fom, setFom] = useState({
        body: "",
        sent: "0",
    })
    const handleSubmit = async (user)=>{
    // Envoyer les données à l'API pour les insérer dans la base de données 
    if(fom.body !== ""){
        const response = await fetch('/api/dash/sms/send', {
            method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body:fom.body,user:user,sent:fom.sent})
            });
            setFom({...fom,body:""})
            fetchOtherSms()
    }
   }
   const fetchOtherSms = async() =>{
      const response = await fetch(`/api/dash/sms/${user}/${sms.length}/20`);
      const data = await response.json();
      if(data[0]) {
        setSms(previousSms=>[...previousSms,...data])

    }
   
  }

  useEffect(() => {
    // get sms detail in database
    async function fetchSms() {
        const response = await fetch(`/api/dash/sms/${user}/${sms.length}/20`);
        const data = await response.json();
        if(data[0]) {
            setSms(data)
        }
    }
    // get sms user detail in database
    async function fetchUser() {
        const response = await fetch(`/api/dash/users/${user}`);
        const data = await response.json();
        if (data[0]) {
            setSmsUser(data[0])
        }
    }
    // get all sms  in database
    async function fetchAllSms() {
        const response = await fetch(`/api/dash/sms`);
        const data = await response.json();
        if(data[0]) {
            setAllSms(data[0])
        }
      }
        if(user){
        fetchSms()
        fetchUser() 
        }
        fetchAllSms()
    
  }, [user]);

  useEffect(() => {
    async function fetchData() {
        const user = await auth;
        if(user){
             setAuto(user);
            const fetchProfile = async (photo) => {
            try {
                if(photo){
                const response = await fetch(`/Thumbnails/${photo}`);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                setProfBlobUrl(blobUrl);
                }else{
                const response = await fetch(`/img/logo.png`);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                setProfBlobUrl(blobUrl);
                }
            } catch (error) {
                console.error('Error fetching video:', error);
            }
            };
            fetchProfile(user.session.Photo)
        }
    }
    fetchData();
}, [auth]);
  return (
    <>
    <Title title='Message - Dashboard' />
        <div  className="dashContainer mt-5 flex flex-col xl:flex-row   xl:space-x-5 ">
            <div  className=" sectionUsers xl:w-[40%] h-[550px] overflow-hidden     flex flex-col mb-5 bg-white rounded-3xl">
                <br/>
                <div  className="user flex flex-row justify-between items-center px-6 mb-6 cursor-pointer ">
                    <div  className="flex flex-row space-x-3">
                        <div className=" w-10 h-10 xl:w-12 xl:h-12 rounded-full overflow-hidden">
                            {
                                auto.Photo ?
                                <Image width={100} height={100} title={`${auto.PageName}`} 
                                src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${auto.Photo}`} 
                                priority={true} placeholder='blur' 
                                blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                                className="" alt="profil"/>
                                :
                                <Image width={100} height={100} src={`/img/logo.png`} 
                                priority={true} placeholder='blur' 
                                blurDataURL="data:image/png;base64,...(base64-encoded image data)"
                                 className="w-full h-full" alt="profil"/>
                            }
                        </div>
                        <div  className="flex flex-col justify-center">
                            <h1  className="font-semibold">{auto.PageName}</h1>
                        </div>
                    </div>
                </div>
                <div  className="px-6">
                    <input  type="text" placeholder="search user" className="py-2 px-2  bg-gray-300 rounded-2xl w-full"
                    />
                </div>
                <div  className="usersContainer w-full h-full pt-6 overflow-y-auto ">
                    <div  className=" emailsContainer w-full h-full pt-6 overflow-y-auto ">
                       {
                        allsms?.map(sm=>{
                            return <Sms key={sm.ID} sms={sm}/>
                        })
                       }
                    </div>
                </div>
            </div>
            {sms.length !== 0 ? 
            
            <div  className="userChat xl:w-[60%] h-[550px]    bg-white xl:full flex flex-col  rounded-3xl " id="chat">
                
                {
                    smsUser ?
                    <div  className="user1 flex flex-row bg-blue-300 rounded-3xl justify-between items-center  mb-6 cursor-pointer border-b-2 py-4 px-2">
                        <div  className="flex flex-row space-x-3">
                            <div  className=" w-10 h-10 xl:w-12 xl:h-12 rounded-full overflow-hidden">
                            {smsUser.Photo ?
                            <Image width={100} height={100} src={`/Thumbnails/${smsUser.Photo}`}  className="" alt="profil"/>
                            :
                            <Image width={100} height={100} src="/img/logo.png"  className="" alt="profil"/>
                            }
                                
                            </div>
                            <div  className="flex flex-col justify-center">
                                <h1  className="font-semibold">{smsUser.PageName}</h1>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }

                <div  className="w-full px-5 flex flex-col h-[450px] justify-between ">
                    <div  className="smsContainer flex flex-col   overflow-y-auto">
                    {
                        sms?.map((mess, index) => {
                            const currentUserId = mess.Sent;
                            const showPhoto = currentUserId !== previousUserId;
                            //console.log(index,currentUserId,previousUserId,showPhoto)
                            // Mettre à jour l'ID de l'utilisateur précédent
                            previousUserId = currentUserId;
                            if (mess.Sent === 0) {
                            return (
                                <div className="sendUser flex justify-end mb-4" key={mess.ID}>
                                <SentSms body={mess.Body} />
                                {showPhoto && (
                                    <Image width={100} height={100}src="/logo/TeramaFlixpic.png" className="object-cover h-8 w-8 rounded-full" alt="" />
                                )}
                                </div>
                            );
                            } else {
                            return (
                                <div className="respondUser flex justify-start mb-4" key={mess.ID}>
                                {showPhoto &&(
                                    <React.Fragment>
                                        {
                                            mess.Photo ? (
                                                <Image width={100} height={100}src={`/Thumbnails/${mess.Photo}`} className="object-cover h-8 w-8 rounded-full" alt="" />
                                            ):
                                                <Image width={100} height={100}src="/img/logo.png" className="object-cover h-8 w-8 rounded-full" alt="" />
                                        }
                                    </React.Fragment>
                                    
                                ) }
                                <InboxSms body={mess.Body} />
                                </div>
                            );
                            }
                        })
                        }
                    </div>
                    <div  className="flex justify-center pb-5 py-1 space-x-2">
                        <textarea id="smsText" cols="30" rows="1" 
                            className="w-full bg-gray-300 py-2 px-3 rounded-xl"
                        placeholder="type your message here..."
                    onChange={(e)=>setFom({...fom,body:e.target.value})}
                    value={fom.body}></textarea>
                        <button  className="">
                            <Image width={100} height={100} src="/img/imag.png" onClick={()=> handleSubmit(sms[0].User) }  className="object-cover sendSms h-8 w-8 rounded-full" alt=""/>
                        </button>
                    </div>
                </div>
            </div>
            :null
            }
            
        </div>
    </>
  )
}

export default Message
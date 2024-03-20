import React,{useState,useEffect,useContext} from 'react' 
import BarChart from '../Charts/BarChart'
import LineChart from '../Charts/LineChart'
import PieChart from '../Charts/PieChart'
import Title from '../Title'
import { SessionContext } from '../context/Auth'
import Image from 'next/image'

function DetailChannel() {
    const auth = useContext(SessionContext)
    const [auto, setAuto] = useState([])
    const [user, setUser] = useState([])
    const [catStat, setCatStat] = useState(null)
    const [userData, setUserData] = useState(null)
    const [profBlobUrl, setProfBlobUrl] = useState('/img/logo.png');
    const [hours, setHours] = useState(0)
     
      useEffect(() => {
        if(auth.session){
            setAuto(auth.session)
            const fetchUsers = async () =>{
                const use = auth.session
                const response = await fetch(`/api/users/getUser/${use.uniid}/`)
                const data = await response.json();
                setUser(data[0])
                setHours(data[0].Hours.toFixed(2))
                fetchProfile(data[0].Photo)
            }
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
            const userStat = async () =>{
                const use = auth.session
                const response = await fetch(`/api/users/user/${use.ID}`)
                const datas = await response.json()
                setUserData({
                    labels: datas[0].map((data)=>data.Year+':'+ data.Month),
                    datasets: [{
                      label: "Posts",
                      data: datas[0].map((data) => data.PostCount),
                      backgroundColor: "purple",
                      borderColor: "purple",
                      borderWidth: 1,
                    },{
                        label: "Likes",
                        data: datas[1].map((data) => data.LikeCount),
                        backgroundColor: "blue",
                        borderColor: "blue",
                        borderWidth: 1,
                      },{
                        label: "Views",
                        data: datas[2].map((data) => data.ViewCount),
                        backgroundColor: "red",
                        borderColor: "red",
                        borderWidth: 1,
                      }]
                  })
            }
            const catSubStat = async () =>{
                const use = auth.session
                const response = await fetch(`/api/users/cat/${use.ID}`)
                const resp = await response.json()
                const datas = resp[1]
                
                if(resp[0][0].SubCount !== 0){
                    setCatStat({
                    labels: datas.map((data)=>data.Category),
                    datasets: [{
                      label: "Categories",
                      data: datas.map((data) => data.SubscriberCount),
                      backgroundColor: ["purple","red","yellow","green","blue"],
                      borderColor: ["purple","red","yellow","green","blue"],
                      borderWidth: 1,
                    }]
                  })
                }
            }
            fetchUsers()
            catSubStat()
            userStat()
        }
        
      }, [auth])
      
  return (
    <>
    <Title title={auto.PageName} />
    <div className=" flex flex-col justify-center ">
        <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1  lg:grid-cols-2 ">
            <div className="lg:-ml-6 p-4 w-full lg:w-[60rem]">
                <div className="flex justify-center lg:justify-start lg:ml-8">
                <div className="-mt-0 grid grid-cols-1 lg:grid-cols-2 flex items-center gap-x-2">
                    <div className="">
                        <Image width={80} height={80} src={profBlobUrl} className="rounded-full w-24 h-24" alt="image_professionnel" />
                    </div>
                    <div className="">
                    <h2 className="font-bold font-serif text-purple-700">{auto.PageName}</h2>
                    </div>
                </div>
                </div>
                <div className="flex justify-center">
                <div className="grid grid-cols-1 mt-[2em] gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:grid-cols-4 lg:gap-x-6 lg:-ml-8">
                {/* <!--debut total membres--> */}
                <div className="w-48 h-26 bg-blue-700 rounded-lg">
                    <h2 className="text-white font-bold flex justify-center p-1">Total Posts</h2>
                    <div className="flex justify-center">
                    <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="w-14 h-14 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
                        </svg>
                    </div>
                    <div className="flex justify-center p-1">
                    <h2 className="text-white font-bold">{user.Posts} Posts</h2>
                    </div>
                </div>
                {/* <!--fin total Members-->
                <!--debut total subscribers--> */}
                <div className="w-48 h-26  bg-blue-700 rounded-lg ">
                    <h2 className="text-white font-bold flex justify-center p-1">Total subscribers</h2>
                    <div className="flex justify-center">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-14 h-14 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
                            </svg>
                    </div>
                    <div className="flex justify-center p-1">
                        <h2 className="text-white font-bold">{user.Abonnes} Subscribers</h2>
                    </div>
                    </div>
                    {/* <!--fin total Subscribers-->
                    <!--debut total views--> */}
                    <div className="w-48 h-26  bg-blue-700 rounded-lg">
                    <h2 className="text-white font-bold flex justify-center p-1">Total Views</h2>
                    <div className="flex justify-center">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-14 h-14 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                    </div>
                    <div className="flex justify-center p-1">
                        <h2 className="text-white font-bold">{user.Views} Views</h2>
                    </div>
                    </div>
                    {/* <!--fin total Views-->
                    <!--debut total Hours--> */}
                    <div className="w-48 h-26  bg-blue-700 rounded-lg">
                    <h2 className="text-white font-bold flex justify-center p-1">Total Hours</h2>
                    <div className="flex justify-center">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-14 h-14 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className="flex justify-center p-1">
                        <h2 className="text-white font-bold">{hours} Hours</h2>
                    </div>
                    </div>
                    {/* <!--fin total Hours--> */}
                </div>
                </div>
                <div className="mt-6 flex justify-center lg:justify-start lg:ml-8">
                <h2 className="font-bold font-serif text-purple-700">Channel Scalability:</h2>
                </div>
                {/* <!--debut charts channel--> */}
                { userData && (<><BarChart chartData={userData} />
                <LineChart chartData={userData} /></>)} 
            {/* <!--fin charts channel--> */}
            </div>
            <div className="p-4 w-full lg:w-1/2 lg:ml-[20.5rem]">
                <div className="flex justify-center -mt-3">
                <h2 className="font-bold font-serif text-purple-700">Actor details:</h2>
                </div>
                <div className="flex flex-col justify-center">
                <div className="mt-6 border-4 rounded-md shadow-lg shadow-blue-600 border-blue-700 w-[20rem] h-[26rem] lg:w-[17rem] lg:h-[26rem]">
                    <div className="mt-16 flex justify-center">
                    <div className="grid grid-cols-2 gap-x-10">
                        <div className="grid grid-cols-1 gap-y-8">
                        <label className="font-bold font-serif text-purple-700 whitespace-nowrap">Name</label>
                        <label className="font-bold font-serif text-purple-700 whitespace-nowrap">Category</label>
                        <label className="font-bold font-serif text-purple-700 whitespace-nowrap">Page</label>
                        </div>
                        <div className="grid grid-cols-1 gap-y-8">
                        <label className=" font-serif text-purple-700 whitespace-nowrap">{auto.PageName} </label>
                        <label className="font-serif text-purple-700 whitespace-nowrap">{user.Cat}</label>
                        <label className=" font-serif text-purple-700 whitespace-nowrap">{user.PageName}</label>
                        </div>
                    </div>
                    </div>
                    <div className="ml-6 mr-6 flex justify-center mt-6">
                    <select defaultValue={user.Categorie} id="countries" className="bg-white font-bold border border-purple-700 text-purple-700 font-serif text-sm rounded-lg focus:ring-purple-700 focus:outline-none block w-[15em] h-[3em] p-2.5 ">
                        <option value='1'  className="text-purple-700 font-serif font-bold">{user.PageName}</option>
                    </select>
                    </div>
                </div>
                </div>{/* <!--bora--> */}
                <div className = "w-[15rem] h-[15rem] mt-12">
                {catStat && (<PieChart chartData={catStat} />) }
                </div>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default DetailChannel
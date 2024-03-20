import React, { useState, useEffect, useContext } from 'react';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';
import { useRouter } from 'next/router';
import Title from '../Title';
import { usePeriod } from '../Hooks/usePeriod';
import { SessionContext } from '../context/Auth';
import Image from 'next/image';

function TimeAgo(Created) {
  const period = usePeriod(Created)
  return period
}
function DetailVideo() {
  const auth = useContext(SessionContext)
  const [period, setPeriod] = useState()
  const [all, setAll] = useState(false);
  const router = useRouter();
  const [video, setVideo] = useState(1);
  const [userData, setUserData] = useState(null);
  const [catstat, setCatstat] = useState(null);

  useEffect(() => {
    if (router.query.v && auth.session) {
      const getPost = async (uuid) => {
        const user = auth.session;
        const response = await fetch(`/api/posts/watch/${uuid}/0/${user.ID}`);
        const data = await response.json();
        if (data.length > 0) {
          setPeriod(TimeAgo(data[0].Created_at))
          setVideo(data[0]);
        }
      };

      const getPostStatic = async (uuid) => {
        const response = await fetch(`/api/statics/post/${uuid}`)
        const datas = await response.json()
        if (datas.length > 0) {
          setUserData({
            labels: datas.map((data) => data.mois + ':' + data.YearMonth),
            datasets: [{
              label: "Views",
              data: datas.map((data) => data.ViewCount),
              backgroundColor: "green",
              borderColor: "green",
              borderWidth: 1
            }, {
              label: "Hours",
              data: datas.map((data) => data.HourCount),
              backgroundColor: "blue",
              borderColor: "blue",
              borderWidth: 1
            }]
          });
        }
      }


      const getCatStatic = async (uuid) => {
        const response = await fetch(`/api/statics/cat/${uuid}`)
        const datas = await response.json()
        const hours = datas[0]
        const views = datas[1]
        if (views[0] && hours[0]) {
          setCatstat({
            labels: views.map((data) => data.Category),
            datasets: [
              {
                label: "Views",
                data: views.map((data) => data.view_count),
                backgroundColor: ["purple", "red", "yellow", "green", "blue"],
                borderColor: ["purple", "red", "yellow", "green", "blue"],
                borderWidth: 1,
              },
              {
                label: "Hours",
                data: hours.map((data) => data.hour_count),
                backgroundColor: ["purple", "red", "yellow", "green", "blue"],
                borderColor: "white",
                borderWidth: 1,
              },
            ],
          })
        }
      }
      getPost(router.query.v)
      getPostStatic(router.query.v)
      getCatStatic(router.query.v)
    }
  }, [router, auth])
  if (!video) return (<div>Loading...</div>)
  
  const videoSrc = `/api/stream?videoId=${video.Video}`;
  return (
    <>
      <Title title={video.Title} />
      <div className="flex justify-center w-full  mt-8 lg:w-full lg:h-screen lg:mt-16">
        <span className="absolute flex justify-center right-auto ml-6 truncate overflow-hidden left-auto -mt-6 text-blue-600 lg:-mt-6 lg:left-60 font-bold">{video.Title}</span>
        <div className="w-3/4 h-60 letf-auto right-auto ml-6 gap-y-10 grid grid-cols-1 lg:grid-cols-2 lg:w-full lg:h-screen lg:ml-24">
          {/* <!--debut video et courbes--> */}
          <div className="max-w-full space-y-4">
            {/* <!--video--> */}
            <div className="flex justify-center lg:w-full max-h-96">

              <video className="w-full h-96  object-fill"
                src={videoSrc} controls></video>
            </div>
            {/* <!--video--> */}
            {/* <!--courbes--> */}
            <div className="flex justify-center lg:w-full">
              <div className="w-full">
                {userData && (<><BarChart chartData={userData} /> <LineChart chartData={userData} /></>)
                }
              </div>
            </div>
            {/* <!--courbes-->  */}
          </div>
          {/* <!--fin video et courbes-->
      <!--debut details video--> */}
          <div className="flex justify-center h-[40em] lg:h-screen">
            <div className="relative  w-72 h-3/4">
              <div id="toutmessage" className=" ">
                {/* <!--debut description video--> */}
                <div className="flex justify-center">
                  <div className="mt-2 space-y-1">
                    <h1 className="text-purple-600 font-bold">{video.Title}</h1>
                    <h1 className="text-blue-600 font-bold absolute ml-24 ">{period}</h1>
                    <h1 className="text-blue-600 font-semibold">Created at:</h1>
                    <h1 className="text-blue-600 font-semibold">Music</h1>
                    <h1 className="text-blue-600 font-semibold">Description:</h1>
                    <div className="">
                      {
                        all ?
                          <>
                            <p className="extra font-serif"> {video.Body} </p>
                            <span onClick={() => setAll(false)} className='cursor-pointer hover:underline hover:bg-gray-200 p-1 rounded-md '>moins</span>
                          </>
                          :
                          <>
                            <p className="original font-serif">  {video.Body}...</p>
                            <span onClick={() => setAll(true)} className='cursor-pointer hover:underline hover:bg-gray-200 p-1 rounded-md '>plus</span>
                          </>
                      }
                    </div>
                    <div className=" bottom-32  -ml-3 bg-blue-700 w-62 h-12 rounded-lg ">
                      <h3 className="font-semibold text-white p-3">Vues : {video.Views} Views</h3>
                      <h3 className="font-semibold text-white ml-36 mx-3 -mt-9">Hours : {video.Hours} Hours</h3>
                    </div>
                    {/* <!--photo profile--> */}
                    <div className=" bottom-1 ml-20">
                      <Image src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Image}`}
                        width={800} height={800} alt='video'
                        className="video w-[100%]  h-[100%] object-fit"
                        priority={true} placeholder='blur'
                        blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                      <div className="flex -ml-5">
                      </div>
                      {catstat && (<PieChart chartData={catstat} />)}
                    </div>
                    {/* <!--photo profile--> */}
                  </div>
                </div>
                {/* <!--fin description video--> */}
              </div>
            </div>
          </div>
          {/* <!--details videso-->  */}
        </div>
      </div>
    </>
  )
}

export default DetailVideo
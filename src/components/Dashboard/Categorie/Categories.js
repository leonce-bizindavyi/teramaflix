import React,{useState,useEffect} from 'react'

import LineChart from '@/components/Charts/LineChart'
import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'
import Title from '@/components/Title'
function Categories() {
  const [ Data, setUserData] = useState({})
  const [lostData, setLostData] = useState({})
  const [catStats, setCatStats] = useState()
  const [catUser , setCatUser] = useState()
  useEffect(() => {
    const categoryColors = {
      Music: "green",
      Films: "orange",
      Comedie: "blue",
      Saison: "red",
      // Ajoutez ici d'autres catégories et leurs couleurs correspondantes
    };
    const categoryUsColors = {
      Other: "green",
      Comédie: "orange",
      Series: "blue",
      Music: "red",
      Film: "purple",
      // Ajoutez ici d'autres catégories et leurs couleurs correspondantes
    };
    
    async function fetchAllStats() {
      const response = await fetch(`/api/dash/cat/stats`);
      const resp = await response.json();
      const datas = resp[0];
      const  users = resp[1];
      const categories = new Set(datas.map((data) => data.Category));
    
      const catStatsData = Array.from(categories).map((category) => {
        const categoryData = datas.filter((data) => data.Category === category);
        return {
          label: category,
          data: categoryData.map((data) => data.NombrePosts),
          backgroundColor: categoryColors[category],
          borderColor: categoryColors[category],
          borderWidth: 2,
        };
      });
      setCatStats({
        labels: datas.map((data) => data.MoisCreation),
        datasets: catStatsData,
      });
      const uscategories = new Set(users.map((data) => data.Category));
      const catStatsUser  = Array.from(uscategories).map((category) => {
        const categoryData =  users.filter((data) => data.Category === category);
        return {
          label: category,
          data: categoryData.map((data) => data.NombrePages),
          backgroundColor: categoryUsColors[category],
          borderColor: categoryUsColors[category],
          borderWidth: 2,
        };
      });
      setCatUser({
        labels: users.map((data) => data.MoisCreation),
        datasets: catStatsUser,
      });
    }
  fetchAllStats()
  }, [])
  return (
    <>
    <Title title='Categoies - TeramaFlix' />
      <div  className="dashContainer mt-5 flex flex-col space-y-5 md:space-y-10 ">
        <div  className="stat flex flex-col space-y-2 px-4 md:flex-row md:justify-center md:h-[350px] ">
          {catStats && <LineChart chartData={catStats} />}
        </div>
        <div  className="stat flex flex-col space-y-2 px-1 md:flex-row md:justify-center md:h-[350px] ">
          {catUser && <LineChart chartData={catUser} />} 
        </div>
      </div>
      <div  className="footer">
        <span  className="font-bold"><center>Admin Dashboard all right reserved teramaflix@2022</center> </span>
      </div> 
  </>
  )
}

export default Categories
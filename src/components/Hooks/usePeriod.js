export const usePeriod = (Created_at)=>{
        const today   = new Date();
        const createDate = new Date(Created_at);
        const nombre = (today-createDate)/(1000)
        let number = 0
        switch (true){
          case nombre<60:
            number = nombre.toFixed(0)+' secondes ago'
            break
          case nombre>=60 && nombre<3600:
            number = (nombre /60).toFixed(0) +' munites ago'
            break
          case nombre>=3600 && nombre<(3600*24):
            number = (nombre /(3600)).toFixed(0) +' hours ago'
            break
          case nombre>=(3600*24) && nombre<(3600*24*7):
            number = (nombre /(3600*24)).toFixed(0) +' days ago'
            break
          case nombre>(3600*24*7) && nombre<(3600*24*30):
            number = (nombre /(3600*24*7)).toFixed(0) +' weeks ago'
            break
          case nombre>=(3600*24*30) && nombre<(3600*24*30*12):
            number = (nombre /(3600*24*30)).toFixed(0) +' months ago'
            break
          default:
            number = (nombre /(3600*24*30*12)).toFixed(0) +' years ago'
            break
      }
      return number
}
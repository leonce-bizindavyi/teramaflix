import React from 'react'
import Home from './Home'
import Videos from './Videos'
import About from './About'

function Layout({page}) {
    if(page===1) return <Home page={page} />
    if(page===2) return <Videos page={page}/>
    if(page===3) return <About page={page}/>
    return null
}

export default Layout
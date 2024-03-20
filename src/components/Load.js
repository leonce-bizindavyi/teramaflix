import React,{useEffect,useContext} from 'react'
import { LoadContext } from './context/loading'

function Load({load}) {
    const {setLoad} = useContext(LoadContext)
    useEffect(() => {
      setLoad(load)
    }, [load])
    
  return null
}

export default Load
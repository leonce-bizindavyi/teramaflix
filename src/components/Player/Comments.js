import React,{useState, useEffect,useContext} from 'react'
import { SessionContext } from '../context/Auth'
import Comment from './Comment'

function Comments({comments,video}) {
  useEffect(() => {
    
    
  }, [video.uniid])
  

    // Afficher un message de chargement lorsque uniid est indéfini
    if(!video){
      return (<div>Loading...</div>)
    }
  

  return (
    <>
      <div className="allUserComment lg:flex flex-col overflow-auto">
        {comments?.map(comment => (
          <Comment key={comment.ID} comment={comment} />
        ))} 
        {comments.length===0 ? <h1 className='text-red-900'>no comments</h1> : ''
        }
      </div>
    </>
  )
}

export default Comments
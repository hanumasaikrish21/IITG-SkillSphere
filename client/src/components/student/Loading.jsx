import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

  const {path}=useParams()
  const navigate=useNavigate();

  useEffect(()=>{
    if(path){
      const timer=setTimeout(()=>{
        navigate(`/${path}`)
      },5000)
      return ()=>clearTimeout(timer)
    }  },[])
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-limeAccent to-black'>
           <div className='w-16 sm:w-20 aspect-square border-4 border-l-green-600 border-t-4   rounded-full animate-spin'></div>
      
</div>
  )
}

export default Loading

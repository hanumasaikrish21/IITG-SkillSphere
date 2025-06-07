import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {
  const isCourseListPage=location.pathname.includes('/course-list');
  const {openSignIn}=useClerk()
  const {user}=useUser()
  const {navigate,isEducator}=useContext(AppContext)
  
  return (
    <div className={` bg-gradient-to-t from-limeAccent flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36  py-4 ${isCourseListPage? 'bg-black':'bg-pitchBlack'}`}>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className='w-[224px] lg:w-[256px] cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-white'>
        <div className='flex items-center gap-5'>
          {user && <>
            <button onClick={()=>navigate('/educator')} className=' hover:text-black'>{isEducator?'Educator Dashboard':'Become Educator'}</button>
            <Link className=' hover:text-black' to='/my-enrollments'>My Enrollments</Link></>}
        </div>
        {user ? (
  <UserButton />
) : (
  <button
    onClick={() => openSignIn()}
    className="bg-limeAccent text-black px-5 py-2 rounded-full"
  >
    Create Account
  </button>
)}
 </div>
      {/* forphonescreen */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-white' >
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs' >
        {user && <>
          <button onClick={()=>navigate('/educator')} className=' hover:text-black'>{isEducator?'Educator Dashboard':'Become Educator'}</button>
            <Link className=' hover:text-black' to='/my-enrollments'>My Enrollments</Link></>}
        </div>
        {user? <UserButton/>: 
        <button onClick={()=>openSignIn()}> <img src={assets.user_icon} alt="" /></button>}
      </div>
    </div>
  )
}

export default Navbar

import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import {UserButton, useUser} from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const educatorData=dummyEducatorData;
  const {user}=useUser();
  return (
    <div className='bg-black flex items-center justify-between  px-4 md:px-8 border-b border-limeAccent py-3' >
      <Link to={'/'}>
      <img src={assets.logo} alt="" className='w-[168px] lg:w-[192px] cursor-pointer' /></Link>
      <div className='flex items-center gap-5 text-white relaive'>
        <p>Hi! {user? user.fullName:'Developers'}</p>
        {user? <UserButton/>:<img className='max-w-8 ' src={assets.profile_img}/>}
      </div>

    </div>
  )
}

export default Navbar

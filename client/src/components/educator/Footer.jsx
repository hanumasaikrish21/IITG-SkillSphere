import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
   <footer className='flex  md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t border-limeAccent '>
    <div className='flex items-center gap-4'>
      <img className='w-[112px] lg:w-[128px] cursor-pointer ' src={assets.logo} alt="logo" />
      <div className='hidden md:block  h-7 w-px bg-limeAccent '></div>
      <p className='py-4 text-center text-xs md:text-sm text-white'>Copyright 2024 © IITG-SkillSphere. All Right Reserved </p>
    </div>
    <div className='flex items-center gap-3 max-md:mt-4'>
      <a href="#"> <img src={assets.facebook_icon} alt="facebook_icon" /></a>
      <a href="#"> <img src={assets.instagram_icon} alt="instagram_icon" />
      </a>
      <a href="#"> <img src={assets.twitter_icon} alt="twitter_icon" /></a>
    </div>
   </footer>
  )
}

export default Footer

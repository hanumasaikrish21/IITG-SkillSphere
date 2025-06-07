import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-white md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-center px-8 md:px-0 justify-center gap-10 md:gap-32  py-10 border-b border-gray-900/30'>
         <div className='flex flex-col md:items-start items-center w-full'>
          <img src={assets.logo_dark} alt="logo" />
          <p className='mt-6 text-center md:text-left text-sm text-black'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
         </div>
         <div className='flex flex-col md:items-start items-center w-full'>
           <h2 className='font-semibold mb-5'>Company</h2>
           <ul className='flex md:flex-col w-full justify-between text-sm md:space-y-2'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
            
           </ul>
         </div>
         <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold mb-5'>Subscribe to our newsletter
          </h2>
          <p className='text-sm '>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input type="email" placeholder='enter your email' className='border border-gray-500 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm'/>
            <button className='bg-limeAccent w-24 h-9 rounded-lg'>Subscribe</button>
          
          </div>
         </div>
      </div> 
      <p className='py-4 text-center text-xs md:text-sm '>Copyright 2024 © IITG-SkillSphere. All Right Reserved.</p>
    </footer>
  )
}

export default Footer

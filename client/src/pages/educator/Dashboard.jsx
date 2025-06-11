import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'

const Dashboard = () => {
  const [dashBoardAdata,setDashBoardData]=useState(null)
  const {currency}=useContext(AppContext)
  const fetchDashBoardData=async()=>{
    setDashBoardData(dummyDashboardData)
  }
  useEffect(()=>{
    fetchDashBoardData()
  },[])
  return dashBoardAdata? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
     <div className='space-y-5'>
         <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-3 shadow-limeGlow border border-limeAccent p-4 w-56 rounded-md'>
            <img src={assets.patients_icon} alt="patients" />
            <div>
              <p className='text-2xl font-medium text-white'>{dashBoardAdata.enrolledStudentsData.length}</p>
              <p className='text-base text-white'>Total Enrolments</p>
            </div>

          </div>
          <div className='flex items-center gap-3 shadow-limeGlow border border-limeAccent p-4 w-56 rounded-md'>
            <img src={assets.appointments_icon} alt="patients" />
            <div>
              <p className='text-2xl font-medium text-white'>{dashBoardAdata.totalCourses}</p>
              <p className='text-base text-white'>Total Courses</p>
            </div>

          </div>
          <div className='flex items-center gap-3 shadow-limeGlow border border-limeAccent p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt="patients" />
            <div>
              <p className='text-2xl font-medium text-white'>{currency}{dashBoardAdata.totalEarnings}</p>
              <p className='text-base text-white'>Total Earnings</p>
            </div>

          </div>

         </div>
         <div>
          <h2 className='pb-6 pt-2 text-lg font-medium text-white'>Latest Enrollments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md border shadow-limeGlow border-limeAccent'>
             <table className='table-fixed md:table-auto w-full overflow-hidden'>
                <thead className='text-white border-b border-limeAccent text-sm text-left'>
                  <tr>
                    <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                    <th className='px-4 py-3 font-semibold'>Student Name</th>
                    <th className='px-4 py-3 font-semibold'>Course Title</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-white'>
                  {dashBoardAdata.enrolledStudentsData.map((item,index)=>(
                    <tr key={index} className='border-b-limeAccent'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index+1}</td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img src={item.student.imageUrl} alt="Profile" className='w-9 h-9 rounded-full'/>
                      <span className='truncate'>{item.student.name}</span>

                    </td>
                    <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                  </tr>
                  ))}
                  
                </tbody>

             </table>
          </div>
         </div>
     </div>
    </div>
  ):<Loading/>
}

export default Dashboard

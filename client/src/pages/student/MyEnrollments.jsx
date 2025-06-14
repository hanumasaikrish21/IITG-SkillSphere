import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import {Line  } from 'rc-progress'
import Footer from '../../components/student/Footer'
import axios from 'axios'

const MyEnrollments = () => {
  const { enrolledCourses = [], calculateCourseDuartion ,navigate,userData,fetchEnrolledCourses,getToken,backendUrl,calculateNoofLectures} = useContext(AppContext)
  const [progressArray,setprogressArray]=useState([])

  const getCourseProgress=async()=>{
    try {
      const token=await getToken();
      const tempProgressArray=await Promise.all(
        enrolledCourses.map(async (course) => {
          const {data}=await axios.post(`${backendUrl}/api/user/get-course-progress`, {courseId:course._id}, {headers: { Authorization: `Bearer ${token}` }})
          let totalLectures =calculateNoofLectures(course);
          const lectureCompleted=data.progressData?data.progressData.lectureCompleted.length:0
          return {
            totalLectures,
            lectureCompleted
          };
        })
      )
      setprogressArray(tempProgressArray);
      
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(userData){
      fetchEnrolledCourses();
      
    }
  },[userData])
  useEffect(()=>{
    if(enrolledCourses.length>0){
     getCourseProgress()
      
    }
  },[enrolledCourses])

  return (
    <>
    <div className='md:px-36 px-8 pt-10 pb-10 bg-gradient-to-b from-limeAccent to-black min-h-screen'>
      <h1 className='text-2xl font-semibold text-white'>My Enrollments</h1>
      <table className='table-auto w-full mt-10 border-collapse'>
        <thead className='text-black border-b border-gray-500/20 text-sm text-left'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course, index) => (
            <tr key={index} className="border-b border-gray-600/20 text-white">
              <td className='md:px-4 pl-2 py-3 flex items-center space-x-3'>
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className='w-14 sm:w-24 md:w-28 rounded-md'
                />
                <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index]?(progressArray[index].lectureCompleted*100)/progressArray[index].totalLectures :0}strokeColor='#ceff65' className='bg-gray-300 rounded-full'/>
                </div>
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {calculateCourseDuartion(course)}
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {progressArray[index]&&`${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`} <span className='text-xs text-gray-400'>lectures</span>
              </td>
              <td className='px-4 py-3 max-sm:text-right'>
                <button onClick={()=>navigate('/player/'+course._id)} className='bg-limeAccent text-black max-sm:text-xs font-semibold px-3 sm:px-1.5  py-1.5 sm:py-2  rounded'>
                  {progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures? 'completed' : 'ongoing'}
                  
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
    
  )
}

export default MyEnrollments

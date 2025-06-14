import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';
import axios from 'axios';
import Loading from '../../components/student/Loading';
import { toast } from 'react-toastify';

const Player = () => {


  const { calculatechapterTime,enrolledCourses,backendUrl,getToken,userData,fetchEnrolledCourses} = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections,setOpenSections]=useState({})
  const [playerData,setPlayerData]=useState(null);
  const [progressData,setProgressData]=useState(null);
  const [initalRating,setInitialRating]=useState(0);
  const getCourseData=()=>{
    enrolledCourses.map((course)=>{
      if(course._id === courseId){
        setCourseData(course);
        course.courseRatings.map((item)=>{
          if(item.userId === userData._id){
          setInitialRating(item.rating);
        }

        })
      }
    })
  }
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  useEffect(() => {
    if(enrolledCourses.length>0){
    getCourseData();}

  },[enrolledCourses])
  const markLectureCompleted=async(lectureId)=>{
    try {
      const token=await getToken();
      const {data}=await axios.post(`${backendUrl}/api/user/update-course-progress`,{courseId,lectureId}, {headers: { Authorization: `Bearer ${token}` } });
      if(data.success){
        toast.success(data.message);
        getCourseProgress()
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const getCourseProgress=async()=>{
    try {
      const token=await getToken();
      const {data}=await axios.post(`${backendUrl}/api/user/get-course-progress`, {courseId}, {headers: { Authorization: `Bearer ${token}` } });
      if(data.success){
      setProgressData(data.progressData);}else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const handleRate=async (rating) => {
    try {
      const token=await getToken();
      const {data}=await axios.post(`${backendUrl}/api/user/add-rating`, {courseId,rating}, {headers: { Authorization: `Bearer ${token}` } });
      if(data.success){
      toast.success(data.message);
      fetchEnrolledCourses();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    getCourseProgress()
  },[])
 
  return courseData?(
    <>
    <div className='pb-10 p-4 sm:p-10  flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36  bg-gradient-to-b from-limeAccent to-black'>
     {/* leftcolumn */}
     <div>
      <h2 className='text-xl  font-semibold text-white'>Course Structure</h2>
      <div className='pt-5'>
        {courseData&& courseData.courseContent.map((chapter, index) => (
           <div key={index} className='border border-gray-300 bg-white mb-2 rounded'> 
           <div onClick={()=>toggleSection(index)} className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>
            <div className='flex items-center gap-2 '>
              <img className={`transform transition-transform ${openSections[index]?'rotate-180':''}`} src={assets.down_arrow_icon} alt="arrowicon" />
              <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
              </div>
              <p className='text-sm md:text-default'>{chapter.chapterContent.length}  lectures -{calculatechapterTime(chapter)}</p>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${openSections[index]?'max-h-96':'max-h-0'}`} >
                <ul className='list-disc md:pl-10 pr-4 py-2 text-gray-600 border border-gray-300'>{chapter.chapterContent.map((lecture,i)=>(
                  <li className='flex items-start gap-2 py-1' key={i}>
                    <img src={progressData&&progressData.lectureCompleted.includes(lecture.lectureId)?assets.blue_tick_icon:assets.play_icon} alt="playicon" className='w-4 h-4 mt-1' />
                    <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                      <p>{lecture.lectureTitle}</p>
                      <div className='flex gap-2'>
                        {lecture.lectureUrl && <p onClick={()=>setPlayerData({
                          ...lecture,chapter:index+1,lecture:i+1
                        })} className='text-green-700 cursor-pointer'>Watch</p>}
                        <p>{humanizeDuration(lecture.lectureDuration*60*1000,{units:['h','m']})}</p>
                      </div>
                    </div>
                  </li>
                ))}</ul>
              </div>
              </div>

        ))
          }
      </div>
      <div className='flex items-center gap-2 py-3 mt-10'>
        <h1 className='text-xl font-bold text-gray-300'>Rate this course</h1>
        <Rating onrate={handleRate} initialRating={initalRating}/>
      </div>
     </div>
     {/* righttcolumn */}
     <div className='md:mt-10'>
      {playerData ?(
        <div>
          <YouTube  videoId={playerData.lectureUrl.split('/').pop()}  iframeClassName='w-full aspect-video' />
          <div className='flex justify-between items-center mt-1'>
            <p className='text-white'>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
            <button onClick={()=>markLectureCompleted(playerData.lectureId)} className='text-limeAccent'>{progressData&&progressData.lectureCompleted.includes(playerData.lectureId)?'Completed':'Mark Complete'}</button>
          </div>

        </div>
      ): <img src={courseData?courseData.courseThumbnail:''} alt="" />}
      
     </div>
    </div>
    <Footer/>
    </>
    
  ):<Loading/>
}

export default Player

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections,setOpenSections]=useState({})
  const { allCourses,calculateRating,currency,calculateCourseDuartion,calculatechapterTime,calculateNoofLectures } = useContext(AppContext);

  const fetchCourseData = async () => {
    if (!allCourses) return;
    const findCourse = allCourses.find(course => String(course._id) === String(id));
    setCourseData(findCourse || false);
  };

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses, id]);
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  

  useEffect(() => {
    console.log("Course Data:", courseData);
  }, [courseData]);

  if (courseData === null) return <Loading />;
  if (!courseData) return <p className='text-center mt-10'>Course not found.</p>;


  return (
    <>
      <div className='relative bg-black'>
        <div className='bg-black absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-limeAccent'></div>
        
        <div className='flex flex-col-reverse md:flex-row gap-10 relative z-10 items-start justify-between md:px-36 px-8 md:pt-30 pt-10 text-left'>
          {/* left column */}
          <div className='max-w-xl z-10 '>
            <h1 className="text-white md:text-course-details-heading-large text-course-details-heading-small font-semibold">{courseData.courseTitle}</h1>
            <p dangerouslySetInnerHTML={{__html:courseData.courseDescription.slice(0,200)}} className="text-white pt-4 md:text-base text-sm"></p>
            {/* reviews and ratings */}
            <div className='flex items-center space-x-2 pt-3 pb-1 text-sm '>
        <p>{calculateRating(courseData)}</p>
        <div className='flex'>
          {[...Array(5)].map((_,i)=>(<img className='w-3.5 h-3.5'key={i} src={i<Math.floor(calculateRating(courseData))?assets.star:assets.star_blank} alt=''/>))}
        </div>
        <p className='text-gray-800'>({courseData.courseRatings.length}{courseData.courseRatings.length>1? 'ratings':'rating'})</p>
        <p>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length>1?' students':' student'}</p>
      </div>
      <p className='text-sm'>Course by <span className='text-white underline'>IITG-Faculty</span></p>

     <div className='pt-8 text-black'>
      <h2 className='text-xl font-semibold'>Course Structure</h2>
      <div className='pt-5'>
        {courseData.courseContent.map((chapter, index) => (
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
                    <img src={assets.play_icon} alt="playicon" className='w-4 h-4 mt-1' />
                    <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                      <p>{lecture.lectureTitle}</p>
                      <div className='flex gap-2'>
                        {lecture.isPreviewFree && <p className='text-green-700 cursor-pointer'>Preview</p>}
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
     </div>
        <div className='py-20 text-sm md:text-default'>
          <h3 className='text-xl font-semibold text-white'>Course Description</h3>
          <p dangerouslySetInnerHTML={{__html:courseData.courseDescription}} className="pt-3 rich-text text-gray-300 "></p>
            
        </div>
          </div>

          {/* right column */}
          <div className='max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-black min-w-[300px] sm:min-w-[420px]'>
            <img src={courseData.courseThumbnail} alt="" />
            <div className='p-5'>
              <div className='flex items-center gap-2'>
                <img className='w-3.5' src={assets.time_left_clock_icon} alt="timeleftclockicon" />
                <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price</p>
              </div>
              <div className='text-gray-300 flex gap-3 items-center pt-2' >
                <p className='text-gray-300 md:text-4xl text-2xl font-semibold'>
                 {currency}{(courseData.coursePrice-courseData.discount*courseData.coursePrice/100).toFixed(2)}
                </p>
                <p className='md:text-lg text-gray-400 line-through'>{currency}{courseData.coursePrice}</p>
                <p className='md:text-lg text-gray-400'>{courseData.discount}% off</p>
              </div>
              <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-400'>
                <div className='flex items-center gap-1'>
                  <img src={assets.star} alt="star_icon" />
                  <p>{calculateRating(courseData)}</p>
                </div>
                <div className='h-4 w-px bg-gray-300/40'></div>
                <div className='flex items-center gap-1'>
                  <img src={assets.time_clock_icon} alt="clock_icon" />
                  <p>{calculateCourseDuartion(courseData)}</p>
                </div>
                <div className='h-4 w-px bg-gray-300/40'></div>
                <div className='flex items-center gap-1'>
                  <img src={assets.lesson_icon} alt="clock_icon" />
                  <p>{calculateNoofLectures(courseData)} lessons</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;

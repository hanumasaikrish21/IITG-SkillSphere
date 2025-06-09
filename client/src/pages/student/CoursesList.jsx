import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer'; // ✅ Correct import

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();

  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      if (input) {
        setFilteredCourse(
          tempCourses.filter(course =>
            course.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [allCourses, input]);

  return (
    <div>
      <div className='bg-black relative px-8 md:px-36 pt-20 text-left pb-3'>
        <div className='flex md:flex-row flex-col items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-white'>Course List</h1>
            <p className='text-white'>
              <span onClick={() => navigate('/')} className='text-limeAccent cursor-pointer'>
                Home
              </span>
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar searchQuery={input} />
        </div>
        {input && (
          <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8  -mb-8 text-white'>
            <p>{input}</p>
            <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={() => navigate('/course-list')} />
          </div>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
          {filteredCourse.length === 0 ? (
            <p className='text-white col-span-full text-center'>No courses found.</p>
          ) : (
            filteredCourse.map(course => (
              <CourseCard key={course.id || course.courseTitle} course={course} />
            ))
          )}
        </div>
      </div>
      <Footer /> {/* ✅ Correct component usage */}
    </div>
  );
};

export default CoursesList;

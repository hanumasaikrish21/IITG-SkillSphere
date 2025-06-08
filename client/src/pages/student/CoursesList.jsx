import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';

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
    <div className='bg-black relative px-8 md:px-36 pt-20 text-left'>
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
  );
};

export default CoursesList;

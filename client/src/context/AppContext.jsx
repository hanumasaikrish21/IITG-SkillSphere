import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
export const AppContext=createContext()
export const AppContextProvider=(props)=>{

    const currency=import.meta.env.VITE_CURRENCY
    const [allCourses,setAllCourses]=useState([])
    const [enrolledCourses ,setEnrolledCourses]=useState([])
    const navigate=useNavigate()
    const [isEducator,setIsEducator]=useState(true)
    const calculateRating=(course)=>{
        if(course.courseRatings.length===0){
            return 0;
        }
        let totalRating=0;
        course.courseRatings.forEach(rating => {
            totalRating+=rating.rating
            
        })
        return totalRating/course.courseRatings.length;
    }
    // function to calculate coursechaptertime
    const calculatechapterTime=(chapter)=>{
        let time=0
        chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
        return humanizeDuration(time*60*1000,{units:["h","m"]})


    }
    // funtion to find duartion of whooe course
    const calculateCourseDuartion = (course) => {
        let time = 0;
        course.courseContent.forEach((chapter) => {
          chapter.chapterContent.forEach((lecture) => {
            time += lecture.lectureDuration;
          });
        });
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
      };
      
    //function to calculate no.of lectures
    const calculateNoofLectures=(course)=>{
        let totalLectures=0
        course.courseContent.forEach((chapter)=>{
            if(Array.isArray(chapter.chapterContent)){
                totalLectures+=chapter.chapterContent.length
            }
                
        });
        return totalLectures
    }
    //fetch user enrlled course 
    const fetchEnrolledCourses=async()=>{
        // this is dummy data
        setEnrolledCourses(dummyCourses)
    }
    const fetchAllCourses=async()=>{
        setAllCourses(dummyCourses)
    }
    useEffect(()=>{
        fetchAllCourses()
        fetchEnrolledCourses()
    },[])
    
    const value={
        currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,calculateCourseDuartion,calculatechapterTime,calculateNoofLectures,fetchEnrolledCourses,enrolledCourses
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
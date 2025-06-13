import express from 'express';
import { addCourse, educatorDashboard, getEducatorCourses, getenrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducatorRoute } from '../middlewares/authMiddleware.js';
const educatorRouter=express.Router();

//add eduxtor role
educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.post('/add-course',upload.single('image'),protectEducatorRoute,addCourse)
educatorRouter.get('/courses',protectEducatorRoute,getEducatorCourses)
educatorRouter.get('/dashboard',protectEducatorRoute,educatorDashboard)
educatorRouter.get('/enrolled-students',protectEducatorRoute,getenrolledStudentsData)

export default educatorRouter;
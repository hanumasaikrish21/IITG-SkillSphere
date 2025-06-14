import { clerkClient } from '@clerk/express'
import Course from '../models/course.js'
import { v2 as cloudinary } from 'cloudinary'
import { purchase } from '../models/purchase.js'
import User from '../models/user.js'

// ─────────────────────────────────────────────────────────────────────────────
// Make user an educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: 'educator' },
    })

    res.json({ success: true, message: 'You are now an educator!' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Add a new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body
    const imageFile = req.file
    const educatorId = req.auth.userId

    if (!imageFile) {
      return res.json({ success: false, message: 'Thumbnail not attached' })
    }

    const parsedCourseData = JSON.parse(courseData)
    parsedCourseData.educator = educatorId
    const newCourse = await Course.create(parsedCourseData)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    newCourse.courseThumbnail = imageUpload.secure_url
    await newCourse.save()

    res.json({ success: true, message: 'Course added successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Get all courses created by educator
export const getEducatorCourses = async (req, res) => {
  try {
    const educatorId = req.auth.userId
    const courses = await Course.find({ educator: educatorId })
    res.json({ success: true, courses })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard summary for educator
export const educatorDashboard = async (req, res) => {
  try {
    const educatorId = req.auth.userId
    const courses = await Course.find({ educator: educatorId })
    const totalCourses = courses.length
    const courseIds = courses.map((course) => course._id)

    // Fetch completed purchases
    const purchases = await purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    })

    const totalEarnings = purchases.reduce((sum, p) => sum + p.amount, 0)

    // Fetch enrolled students (Clerk data)
    const enrolledStudentsData = []

    for (const course of courses) {
      const students=await User.find({
        _id: { $in: course.enrolledStudents },
      },'name imageUrl');
      students.forEach(student => {
        enrolledStudentsData.push({
          courseTitle:course.courseTitle,
          student
        })
      })
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        totalCourses,
        enrolledStudentsData,
      },
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Get enrolled students for all educator's courses (from purchases)
export const getenrolledStudentsData = async (req, res) => {
  try {
    const educatorId = req.auth.userId
    const courses = await Course.find({ educator: educatorId })

    const courseIdMap = {}
    const courseIds = courses.map(course => {
      courseIdMap[course._id.toString()] = course.courseTitle
      return course._id
    })

    const purchasesList = await purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    })

    const enrolledStudents = await Promise.all(
      purchasesList.map(async (purchase) => {
        try {
          const user = await clerkClient.users.getUser(purchase.userId)
          return {
            student: {
              name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
              imageUrl: user.imageUrl,
            },
            courseTitle: courseIdMap[purchase.courseId.toString()] ?? 'Untitled',
            purchaseDate: purchase.createdAt,
          }
        } catch {
          return null // skip if Clerk user not found
        }
      })
    )

    res.json({
      success: true,
      enrolledStudents: enrolledStudents.filter(Boolean),
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

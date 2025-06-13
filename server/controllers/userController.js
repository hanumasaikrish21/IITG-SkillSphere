import Stripe from "stripe";
import Course from "../models/course.js";
import { purchase } from "../models/purchase.js";
import User from "../models/user.js";
import { CourseProgress } from "../models/courseProgress.js";

// ✅ Get user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get user's enrolled courses with lecture links
export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userdata = await User.findById(userId).populate('enrolledCourses');
    res.json({ success: true, enrolledCourses: userdata.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Purchase a course
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: "User or Course not found" });
    }

    const amount = (
      courseData.coursePrice -
      (courseData.discount * courseData.coursePrice) / 100
    ).toFixed(2);

    // ✅ Create purchase record
    const newPurchase = await purchase.create({
      courseId: courseData._id,
      userId: userId,
      amount: amount,
      status: "pending"
    });

    // ✅ Stripe integration
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY?.toLowerCase() || 'usd';

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle
          },
          unit_amount: Math.floor(amount * 100) // in cents
        },
        quantity: 1
      }
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items,
      mode: 'payment',
      metadata: {
        purchaseId: newPurchase._id.toString()
      }
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//update user course progress
export const updateUserCourseProgress =async (req, res) => {
    try {
        const userId = req.auth.userId;
        const {courseId,lectureId}= req.body;
        const progressData=await CourseProgress.findOne({userId, courseId});

        if(progressData) {
            if(progressData.lectureCompleted.includes(lectureId)) {
                res.json({success:true, message: 'Lecture already completed'});
            }
            progressData.lectureCompleted.push(lectureId);
            await progressData.save();
        }else{
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            });
        }
        res.json({success:true, message: 'Progress updated successfully'});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// ✅ Get user course progress
export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const {courseId}=req.body;
        const progressData=await CourseProgress.findOne({userId, courseId});
        res.json({success:true, progressData});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}
//Add user rating for course
export const addUserRating = async (req, res) => {
    const userId=req.auth.userId;
    const {courseId,rating}=req.body;
    if(!userId||!courseId || !rating||rating<1 || rating>5) {
        return res.json({success:false, message: 'Invalid request'});
    }
    try {
        const course=await Course.findById(courseId);

        if(!course){
            res.json({success:false, message: 'Course not found'});
        }
        const user=await User.findById(userId);
        if(!user|| !user.enrolledCourses.includes(courseId)) {
            return res.json({success:false, message: 'User not purchased the course'});
        }
        const existingRatingIndex= course.courseRatings.findIndex(rating=> rating.userId===userId);
        if(existingRatingIndex>-1){
            course.courseRatings[existingRatingIndex].rating=rating;
        }else{
            course.courseRatings.push({userId, rating});
        }
        await course.save();
        return res.json({success:true, message: 'Rating added successfully'});


    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
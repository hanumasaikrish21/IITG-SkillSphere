# 🎓 IITG SkillSphere

**A centralized academic and skill-building platform for IITG students.**

## 🌐 Objective

To provide IIT Guwahati students with a unified platform that aggregates:
- 🎯 Free academic and skill-based courses
- 💰 Curated paid courses with student offers
- 📄 Research papers for core, elective, and interdisciplinary subjects

---

## 🚀 Key Features

- 🔍 **Course Aggregation**: Free courses from Coursera, NPTEL, IBM SkillsBuild, AWS Educate, etc.
- 💰 **Paid Courses**: Student-discounted recommendations.
- 📄 **Research Paper Hub**: Indexed by departments and relevance.
- 🧾 **Course Tags**: Filter by department, level, skill, or platform.
- 🧑‍🎓 **Student Reviews**: Peer insights for each course.
- 🔐 **Microsoft/Google Sign-in**: IITG-only authentication via Clerk.
- 📦 **Bookmarking**: Save favorite resources.
- 🆕 **Recent Additions Panel**: View latest content updates.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **@clerk/clerk-react** – Auth with Google/Microsoft
- **Axios** – API handling
- **Quill** – Rich text editor for course descriptions
- **React Toastify** – Notifications
- **React Router DOM** – Routing
- **React YouTube** – Embedding video lectures
- **Humanize-duration** – Time formatting

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **@clerk/express** – Secure auth validation
- **Stripe** – Payment processing
- **Cloudinary** – Image and asset storage
- **Multer** – File uploads
- **Dotenv** – Environment configs
- **Cors** – Cross-origin support

---


## 📦 Run the Project

Use the following command to start the frontend part:
*      cd client
*      npm install
*      npm run dev 

Use the following command to start the Backend part:
*     cd server
*     npm install
*     npm run server

## 🧠 Coming Soon

- 🔔 Notifications for new research paper uploads  
- 🧠 AI-powered course recommendations  
- 📊 Analytics dashboard for students and educators  
- 🗂️ Course tagging and auto-categorization 





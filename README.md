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

## 🧱 Frontend Dependencies Explanation (`client/package.json`)

| Package | Purpose |
|--------|---------|
| `@clerk/clerk-react` | Enables seamless integration with Clerk authentication on the frontend. |
| `axios` | Handles API requests to the backend. |
| `duration`, `humanize`, `humanize-duration` | Format course duration and other time values into readable strings. |
| `quill` | WYSIWYG rich text editor for adding detailed course descriptions. |
| `rc-progress` | Displays progress bars for enrolled courses. |
| `react`, `react-dom` | Core React libraries. |
| `react-router-dom` | Handles client-side routing. |
| `react-toastify` | Shows non-intrusive success/error notifications. |
| `react-youtube` | Embeds YouTube preview/trailer videos. |
| `uniqid` | Generates unique IDs for elements like bookmarks or uploaded content. |

---

## 🛠 Backend Dependencies Explanation (`server/package.json`)

| Package | Purpose |
|--------|---------|
| `@clerk/express` | Middleware for verifying JWT and protecting backend routes. |
| `cloudinary` | Cloud-based image and video management. |
| `cors` | Enables secure cross-origin requests from frontend to backend. |
| `dotenv` | Loads environment variables from `.env`. |
| `express` | Core backend framework to build REST APIs. |
| `mongoose` | ODM for MongoDB, handles schema validation and querying. |
| `multer` | Parses `multipart/form-data` for file uploads. |
| `nodemon` | Auto-restarts the server during development when files change. |
| `stripe` | Payment processing library to manage paid course transactions. |
| `svix` | Listens to Clerk webhooks for user sync (e.g. signup/delete). |

---

## ⚙️ Technologies Used

- **React.js** + **Tailwind CSS** for frontend UI.
- **Node.js**, **Express**, **MongoDB** for backend.
- **Stripe** for payments.
- **Clerk** for authentication.
- **Cloudinary** for image storage.
- **Vercel** for frontend deployment.

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

---
## 🔗 Live Preview

🌐 [IITG SkillSphere – Preview Link](https://iitg-skill-sphere-frontend.vercel.app/)

---
## 🧠 Coming Soon

- 🔔 Notifications for new research paper uploads  
- 🧠 AI-powered course recommendations  
- 📊 Analytics dashboard for students and educators  
- 🗂️ Course tagging and auto-categorization 

---




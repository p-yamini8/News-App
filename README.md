🌟 NewsExpress – Modern Full-Stack News Application
 ============================================================

**📦 GitHub Repository:** https://github.com/p-yamini8/News-App

**🚀 Live link:** https://news-app-1-umxk.onrender.com

 **🎥 Demo Link:** [https://drive.google.com/file/d/1IXpbmC4g8AOS1E9uc_VbTet395BBk3yx/view?usp=drivesdk](https://drive.google.com/file/d/1JC3-Wdp98cnvtE9KHssNlumYOCmvZiBx/view?usp=drivesdk)

A powerful full-stack News App with image upload, JWT authentication, profile management, saved posts, and like/unlike features — all built using Node.js, Express, Sequelize, MySQL, AWS S3, HTML, CSS, JavaScript.

🎯 Key Features
===================
👤 User Account Features
-----------------------------

<h4>🖼️ Profile Picture Upload (AWS S3)</h4>

- Upload profile photo using Multer + Multer-S3

- Stored securely in AWS S3

- Automatically loads in dashboard

✏️ Edit Profile
----------------

- Update name, email, and profile image

- Changes shown instantly

- Uses JWT for secure access

🔐 JWT Authentication
-----------------------

- Signup & Login

- Token saved in browser

- Secure protected routes

📰 News Features
-------------------

<h4>📝 Create News Post</h4>

- Add title, content, and image

- Image uploaded to AWS S3

- Clean and modern UI

✏️ Edit News
---------------

- Update headline, text, and image

- Only the uploader can edit

❌ Delete News
-------------------

- Secure deletion with owner check

🌍 View All News
-------------------

- Loads all posts on homepage

- Supports images + formatted text

  🏷️ Category-Based Post Filtering
  ----------------------------------------

Your NewsExpress app now supports dynamic category filtering, allowing users to instantly view posts from:

- 🎉 Fun

- 🏛️ Politics

- 💼 Business

- 🎬 Movies

- 🏅 Sports

The UI updates smoothly, fetching posts based on category using optimized API endpoints.

❤️ Likes / Saved Features
-----------------------------

<h4>❤️ Like Post</h4>

- Users can like any post

- Like stored in database

- Heart icon updates instantly

<h4>💔 Unlike Post</h4>

- User can remove their like

- Like removed from database

- UI updates without refresh

<h4>📚 Saved Posts</h4>

- Users can save/bookmark news for later

- Saved posts page shows only their saved items

- Stored in a separate Saved table

<h4>⭐ Comment </h4>

- Users can comment any post

- comment stored in database


🧰 Tech Stack
===============

🌐 Frontend
-------------

- HTML5

- CSS

- JavaScript (fetch API)

- Responsive UI

🛠 Backend
-----------

- Node.js

- Express

- Sequelize ORM

- JWT Authentication

- Multer + Multer-S3

- MySQL Database

☁ Cloud

- AWS S3 (image uploading)

- AWS IAM User

- Public S3 access for image loading

📂 Folder Structure
--------------------

NewsExpress/

│── controllers/

│── middleware/

│── models/

│── routes/

│── utils/

│── views/

│── uploads/        (optional local upload)

│── server.js

│── package.json

│── .env


⚙️ Environment Variables (.env)
=================================

PORT=3000

JWT_SECRET=your_secret_key

AWS_BUCKET_NAME=news-express-images

AWS_REGION=us-east-1

AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY

AWS_SECRET_KEY=YOUR_AWS_SECRET_KEY

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=yourpassword

DB_NAME=newsapp





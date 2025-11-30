🌟 NewsExpress – Modern Full-Stack News Application

📦 GitHub Repository: https://github.com/p-yamini8/News-App

🚀 Live link: https://news-app-1-umxk.onrender.com

 Demo Link: https://drive.google.com/file/d/1IXpbmC4g8AOS1E9uc_VbTet395BBk3yx/view?usp=drivesdk

A powerful full-stack News App with image upload, JWT authentication, profile management, saved posts, and like/unlike features — all built using Node.js, Express, Sequelize, MySQL, AWS S3, HTML, CSS, JavaScript.

🎯 Key Features
👤 User Account Features
🖼️ Profile Picture Upload (AWS S3)

Upload profile photo using Multer + Multer-S3

Stored securely in AWS S3

Automatically loads in dashboard

✏️ Edit Profile

Update name, email, and profile image

Changes shown instantly

Uses JWT for secure access

🔐 JWT Authentication

Signup & Login

Token saved in browser

Secure protected routes

📰 News Features
📝 Create News Post

Add title, content, and image

Image uploaded to AWS S3

Clean and modern UI

✏️ Edit News

Update headline, text, and image

Only the uploader can edit

❌ Delete News

Secure deletion with owner check

🌍 View All News

Loads all posts on homepage

Supports images + formatted text

❤️ Likes / Saved Features
❤️ Like Post

Users can like any post

Like stored in database

Heart icon updates instantly

💔 Unlike Post

User can remove their like

Like removed from database

UI updates without refresh

📚 Saved Posts

Users can save/bookmark news for later

Saved posts page shows only their saved items

Stored in a separate Saved table

⭐ Liked Posts Page

Shows all posts the user has liked

Uses Like table to fetch liked posts

🧰 Tech Stack

🌐 Frontend

HTML5

CSS3

JavaScript (fetch API)

Responsive UI

🛠 Backend

Node.js

Express

Sequelize ORM

JWT Authentication

Multer + Multer-S3

MySQL Database

☁ Cloud

AWS S3 (image uploading)

AWS IAM User

Public S3 access for image loading

📂 Folder Structure

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



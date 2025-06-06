📝 Blog App
A full-stack Blog Application built with:

Backend → Python, Django, Django REST Framework (DRF)

Frontend → React.js

🚀 Features
User Authentication (Register / Login / Logout)

Create, Edit, and Delete Blog Posts

List of all Blog Posts

View Blog Post Details

Responsive Frontend with React.js

RESTful API for Blog functionality

🏗️ Project Structure
bash
Copy
Edit
blog-app/
├── backend/              # Django + DRF project
│   ├── blog/             # Django app for blog models and APIs
│   ├── users/            # Django app for user management
│   ├── manage.py         
│   ├── requirements.txt
├── frontend/             # React.js frontend project
│   ├── src/              
│   ├── public/           
│   ├── package.json
└── README.md
🛠️ Tech Stack
Backend
Python 3.x

Django 4.x

Django REST Framework (DRF)

djangorestframework-simplejwt (JWT Authentication)

SQLite3 (Default — can be switched to PostgreSQL)

Frontend
React.js (React 18)

Axios (for API calls)

React Router DOM

Tailwind CSS or Bootstrap (optional)

⚙️ Setup Instructions
1️⃣ Backend (Django + DRF)
Clone the repo and navigate to backend:
bash
Copy
Edit
git clone https://github.com/your-username/blog-app.git
cd blog-app/backend
Create virtual environment & install dependencies:
bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

pip install -r requirements.txt
Apply migrations:
bash
Copy
Edit
python manage.py migrate
Create superuser (for admin access):
bash
Copy
Edit
python manage.py createsuperuser
Run server:
bash
Copy
Edit
python manage.py runserver
Backend will be running at: http://127.0.0.1:8000/

2️⃣ Frontend (React)
Navigate to frontend:
bash
Copy
Edit
cd ../frontend
Install dependencies:
bash
Copy
Edit
npm install
Start React dev server:
bash
Copy
Edit
npm start
Frontend will be running at: http://localhost:3000/

# 🎓 Consulting Education Platform

A full-stack web application for managing student applications, programs, enquiries, and admin operations for a consulting/education agency.

---

## 🚀 Tech Stack

### 🔧 Backend
- Node.js
- Express.js
- MySQL Database
- Multer (for uploads)
- JWT Authentication

### 💻 Frontend
- React.js (Vite + JSX)
- Axios
- CSS Modules

---

## 📁 Project Structure

```bash
project_phase_2/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   │   └── schema.sql      # Database tables
│   ├── server.js
│
├── consulting-edu/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── main.jsx
│   └── vite.config.js
│
└── README.md
🗄️ Database Schema

The project uses MySQL. Key tables include:
    students – Students applying
    applications – Students + Programs (Many-to-Many)
    admins – Login users
    programs – Educational programs
    enquiries – Contact enquiries
    testimonials – Student testimonials

📌 Import the database

SOURCE schema.sql;
▶️ How to Run the Project
📌 Backend Setup
    cd backend
    npm install
    npm start


📌 Create .env file in backend:

    DB_HOST=localhost
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=consulting
    JWT_SECRET=yourSecretKey

💻 Frontend Setup
    cd consulting-edu
    npm install
    npm run dev

🔐 Admin Features
    Secure JWT Login
    Manage Programs
    View & Update Applications
    Manage Testimonials
    Manage Destinations
    Admin Dashboard

👨‍🎓 Student Features
    Apply for a program
    Submit enquiry form
    Browse destinations & programs
    View testimonials


🤝 Contributing
    Feel free to fork, improve, and submit pull requests.

📄 License
    This project is licensed under the MKD Consulting.

💙 Made with dedication & learning

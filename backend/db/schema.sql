CREATE DATABASE consulting;
USE consulting;

-- 📩 Contact Messages
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ⭐ Testimonials
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  country VARCHAR(100),
  testimonial TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🌍 Programs Offered (Destinations)
CREATE TABLE programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  country VARCHAR(100),
  description TEXT,
  tuition_fee VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🎓 Students Applying
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  nationality VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 📌 Applications (JOIN TABLE: Many-to-Many Students ↔ Programs)
CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  program_id INT,
  status VARCHAR(50) DEFAULT 'Pending',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

-- 🔐 Admin Users (Optional for Secure Login)
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password_hash VARCHAR(255), -- password will be hashed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  region VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO destinations (name, region, description, image_url) VALUES
("Finland", "Europe", "Innovative programs and excellent education system.", "https://i.ibb.co/LxQjP1s/finland.jpg"),
("United Kingdom", "Europe", "Top universities & multicultural environment.", "https://i.ibb.co/1Lvx8kX/uk.jpg"),
("Canada", "North America", "Quality education and post-study work options.", "https://i.ibb.co/LgPNFgW/canada.jpg"),
("USA", "North America", "World-class institutions with research excellence.", "https://i.ibb.co/cFDcc8w/usa.jpg");
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destination_id INT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

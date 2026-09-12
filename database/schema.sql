CREATE DATABASE IF NOT EXISTS smartcity;
USE smartcity;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('citizen', 'admin', 'worker') NOT NULL DEFAULT 'citizen',
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  citizen_id INT NOT NULL,
  category_id INT NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address VARCHAR(255),
  status ENUM('pending', 'verified', 'assigned', 'in_progress', 'resolved', 'rejected') NOT NULL DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
  priority_score INT DEFAULT 0,
  duplicate_of INT DEFAULT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL DEFAULT NULL,

  FOREIGN KEY (citizen_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (duplicate_of) REFERENCES complaints(id)
);

CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_id INT NOT NULL,
  department_id INT NOT NULL,
  worker_id INT DEFAULT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('assigned', 'in_progress', 'completed') NOT NULL DEFAULT 'assigned',

  FOREIGN KEY (complaint_id) REFERENCES complaints(id),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (worker_id) REFERENCES users(id)
);

CREATE TABLE complaint_updates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_id INT NOT NULL,
  status ENUM('pending', 'verified', 'assigned', 'in_progress', 'resolved', 'rejected') NOT NULL,
  message VARCHAR(255),
  updated_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (complaint_id) REFERENCES complaints(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_id INT NOT NULL UNIQUE,
  citizen_id INT NOT NULL,
  rating TINYINT NOT NULL,
  comment VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (complaint_id) REFERENCES complaints(id),
  FOREIGN KEY (citizen_id) REFERENCES users(id),
  CHECK (rating BETWEEN 1 AND 5)
);
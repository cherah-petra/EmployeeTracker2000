DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;


CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30) NOT NULL
);

CREATE TABLE employeeRole (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL NOT NULL,
   department_id INT,
   FOREIGN KEY (department_id) REFERENCES department (id)
   ON DELETE SET NULL
);
     

CREATE TABLE employee (
   id INT PRIMARY KEY AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   employeeRole_id INT,
   manager_id INT,
   FOREIGN KEY (employeeRole_id) REFERENCES employeeRole (id),
   FOREIGN KEY (manager_id) REFERENCES employee (id)
   ON DELETE SET NULL
);

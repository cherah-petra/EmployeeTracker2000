-- Seed data for the department table
INSERT INTO department (name) VALUES
  ('Marketing'),
  ('Sales'),
  ('Finance'),
  ('Engineering');

-- Seed data for the employeeRole table
INSERT INTO employeeRole (title, salary, department_id) VALUES
  ('Manager', 60000.00, 1),
  ('Salesperson', 40000.00, 2),
  ('Accountant', 50000.00, 3),
  ('Software Engineer', 70000.00, 4);

-- Seed data for the employee table
INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 4, 1),
  ('Emily', 'Williams', 3, 1),
  ('David', 'Brown', 4, 2);

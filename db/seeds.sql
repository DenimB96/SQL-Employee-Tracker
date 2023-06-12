INSERT INTO department (name) VALUES 
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES 
  ('Salesperson', 50000, 1),
  ('Sales Manager', 80000, 1),
  ('Marketing Coordinator', 40000, 2),
  ('Marketing Manager', 70000, 2),
  ('Software Engineer', 80000, 3),
  ('Senior Software Engineer', 100000, 3),
  ('Human Resources Coordinator', 45000, 4),
  ('Human Resources Manager', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
  ('John', 'Doe', 1, 2),
  ('Jane', 'Smith', 2, NULL),
  ('Bob', 'Johnson', 3, 4),
  ('Sara', 'Williams', 4, NULL),
  ('Mike', 'Brown', 5, 6),
  ('Emily', 'Davis', 6, NULL),
  ('Tom', 'Wilson', 7, 8),
  ('Amy', 'Lee', 8, NULL);

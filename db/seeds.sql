INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Marketing'),
       (3, 'Engineering'),
       (4, 'Human Resources');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Salesperson', 50000, 1),
       (2, 'Sales Manager', 80000, 1),
       (3, 'Marketing Coordinator', 40000, 2),
       (4, 'Marketing Manager', 70000, 2),
       (5, 'Software Engineer', 80000, 3),
       (6, 'Senior Software Engineer', 100000, 3),
       (7, 'Human Resources Coordinator', 45000, 4),
       (8, 'Human Resources Manager', 75000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, 2),
       (2, 'Jane', 'Smith', 2, NULL),
       (3, 'Bob', 'Johnson', 3, 4),
       (4, 'Sara', 'Williams', 4, NULL),
       (5, 'Mike', 'Brown', 5, 6),
       (6, 'Emily', 'Davis', 6, 5),
       (7, 'Tom', 'Wilson', 7, 8),
       (8, 'Amy', 'Lee', 8, NULL);

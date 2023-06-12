const mysql = require('mysql2');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  viewAllDepartments() {
    const query = `SELECT id, name FROM department`;
    return this.connection.promise().query(query);
  }

  viewAllRoles() {
    const query = `SELECT r.id, r.title, r.salary, d.name AS department
                   FROM role AS r
                   JOIN department AS d
                   ON r.department_id = d.id`;
    return this.connection.promise().query(query);
  }

  viewAllEmployees() {
    const query = `SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
                   FROM employee AS e
                   JOIN role AS r
                   ON e.role_id = r.id
                   JOIN department AS d
                   ON r.department_id = d.id
                  LEFT JOIN employee AS m
                   ON e.manager_id = m.id`;
    return this.connection.promise().query(query);
  }

  addDepartment(name) {
    const query = `INSERT INTO department (name) VALUES (?)`;
    return this.connection.promise().query(query, [name]);
  }

  addRole(title, salary, department_id) {
    const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    return this.connection.promise().query(query, [title, salary, department_id]);
  }

  addEmployee(first_name, last_name, role_id, manager_id) {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    return this.connection.promise().query(query, [first_name, last_name, role_id, manager_id]);
  }

  updateEmployeeRole(employeeId, roleId) {
    const query = `UPDATE employee SET role_id = ? WHERE id = ?`;
    return this.connection.promise().query(query, [roleId, employeeId]);
  }

  updateEmployeeManager(employeeId, managerId) {
    const query = `UPDATE employee SET manager_id = ? WHERE id = ?`;
    return this.connection.promise().query(query, [managerId, employeeId]);
  }

  viewEmployeesByManager(managerId) {
    const query = `SELECT CONCAT(m.first_name, ' ', m.last_name) AS manager_name, e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary
                   FROM employee AS e
                   JOIN role AS r
                   ON e.role_id = r.id
                   JOIN department AS d
                   ON r.department_id = d.id
                   JOIN employee AS m
                   ON e.manager_id = m.id
                   WHERE m.id = ?
                   ORDER BY manager_name`;
    return this.connection.promise().query(query, [managerId]);
  }

  viewEmployeesByDepartment(departmentId) {
    const query = `SELECT d.name AS department, e.id, e.first_name, e.last_name, r.title AS job_title, r.salary
                   FROM employee AS e
                   JOIN role AS r
                   ON e.role_id = r.id
                   JOIN department AS d
                   ON r.department_id = d.id
                   WHERE d.id = ?
                   ORDER BY d.name`;
    return this.connection.promise().query(query, [departmentId]);
  }
}

module.exports = Database;

                  

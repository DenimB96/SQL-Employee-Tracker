// index.js

const inquirer = require('inquirer');
const Database = require('./database');
require('console.table');

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Code123$$$',
  database: 'employee_tracker'
};

const db = new Database(config);

async function start() {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all employees',
      'View all departments',
      'View all roles',
      'Add an employee',
      'Add a department',
      'Add a role',
      'Update an employee role',
      'Update an employee manager',
      'View employees by manager',
      'View employees by department',
      'Exit'
    ]
  });

  switch (action) {
    case 'View all employees':
        try {
            const [rows] = await db.viewAllEmployees();
            console.table(rows);
        } catch (err) {
            console.error(err);
        }
      // Call the viewAllEmployees method from the Database class
      // Display the results to the user
      break;
    case 'View all departments':
        try {
            const [rows] = await db.viewAllDepartments();
            console.table(rows);
        } catch (err) {
            console.error(err);
        }
      // Call the viewAllDepartments method from the Database class
      // Display the results to the user
      break;
    case 'View all roles':
        try {
            const [rows] = await db.viewAllRoles();
            console.table(rows);
        } catch (err) {
            console.error(err);
        }
      // Call the viewAllRoles method from the Database class
      // Display the results to the user
      break;
    case 'Add an employee':
        async function addEmployee() {
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the employee\'s first name:'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the employee\'s last name:'
                  },
                  {
                    type: 'input',
                    name: 'role_id',
                    message: 'Enter the employee\'s role ID:'
                  },
                  {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Enter the ID of the employee\'s manager:'
                  }
            ]);

            const result = await db.addEmployee(first_name, last_name, role_id, manager_id);

            console.log(result);

            console.log(`Employee ${first_name} ${last_name} has been added with ID ${result.insertId}`);
        };

        addEmployee();
      // Use inquirer to prompt the user for the necessary information
      // Call the addEmployee method from the Database class with the user's input
      // Display a success message to the user
      break;
    case 'Add a department':
        async function addDepartment() {
            const { name } = await inquirer.prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the new department:'
              }
            ]);
        
            const result = await db.addDepartment(name);
        
            console.log(`Department ${name} has been added with ID ${result.insertId}`);
          }
        
          try {
            await addDepartment();
          } catch (err) {
            console.error(err);
          }
      // Use inquirer to prompt the user for the necessary information
      // Call the addDepartment method from the Database class with the user's input
      // Display a success message to the user
      break;
    case 'Add a role':
        try {
            const departments = await db.viewAllDepartments();
            const departmentChoices = departments.map(({ id, name }) => ({ name, value: id }));
        
            const { title, salary, department_id } = await inquirer.prompt([
              {
                type: 'input',
                name: 'title',
                message: 'Enter the title for the new role:'
              },
              {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the new role:'
              },
              {
                type: 'list',
                name: 'department_id',
                message: 'Select the department for the new role:',
                choices: departmentChoices
              }
            ]);
        
            const result = await db.addRole(title, salary, department_id);
        
            console.log(`Role '${title}' has been added with ID ${result.insertId}`);
          } catch (err) {
            console.error(err);
          }
      // Use inquirer to prompt the user for the necessary information
      // Call the addRole method from the Database class with the user's input
      // Display a success message to the user
      break;
    case 'Update an employee role':
        async function updateEmployeeRole() {
            const { employee_id, role_id } = await inquirer.prompt([
                {
                  type: 'input',
                  name: 'employee_id',
                  message: 'Enter the ID of the employee whose role you want to update:'
                },
                {
                  type: 'input',
                  name: 'role_id',
                  message: 'Enter the ID of the new role:'
                }
              ]);

              try {
                const result = await db.updateEmployeeRole(employee_id, role_id);

                console.log(`Employee role updated successfully. Rows affected: ${result.affectedRows}`);
              } catch (err) {
                console.error(err);
              }
            }
          
            updateEmployeeRole();
               
      // Use inquirer to prompt the user for the necessary information
      // Call the updateEmployeeRole method from the Database class with the user's input
      // Display a success message to the user
      break;
    case 'Update an employee manager':
        try {
            const [employeeRows] = await db.viewAllEmployees();
            const employees = employeeRows.map(row => ({ name: `${row.first_name} ${row.last_name}`, value: row.id }));
            
            const { employee_id, manager_id } = await inquirer.prompt([
                {
                  type: 'list',
                  name: 'employee_id',
                  message: 'Select the employee to update:',
                  choices: employees
                },
                {
                  type: 'list',
                  name: 'manager_id',
                  message: 'Select the employee\'s new manager:',
                  choices: employees
                }
              ]);

               // Update the employee's manager in the database
            await db.updateEmployeeManager(employee_id, manager_id);

            console.log(`Employee ${employee_id}\'s manager has been updated.`);
        }  catch (err) {
            console.error(err);
        }
      // Use inquirer to prompt the user for the necessary information
      // Call the updateEmployeeManager method from the Database class with the user's input
      // Display a success message to the user
      break;
    case 'View employees by manager':
        const { managerId } = await inquirer.prompt([
            {
              type: 'input',
              name: 'managerId',
              message: 'Enter the ID of the manager whose employees you want to view:'
            }
          ]);

          try {
            const [rows] = await db.viewEmployeesByManager(managerId);
            console.table(rows);
          } catch (err) {
            console.error(err);
          }
         
      // Call the viewEmployeesByManager method from the Database class
      // Display the results to the user
      break;
    case 'View employees by department':
        try {
            const [departmentRows] = await db.viewAllDepartments();
            const departments = departmentRows.map(row => ({ name: row.name, value: row.id }));
  
            const { departmentId } = await inquirer.prompt({
                type: 'list',
                name: 'departmentId',
                message: 'Select a department to view employees:',
                choices: departments
              });
              
              const [employeeRows] = await db.viewEmployeesByDepartment(departmentId);
              console.table(employeeRows);
            } catch (err) {
              console.error(err);
            }  
      // Use inquirer to prompt the user for the department ID
      // Call the viewEmployeesByDepartment method from the Database class with the user's input
      // Display the results to the user
      break;
    case 'Exit':
        process.exit()
    }

    start();
    }

    start();

const db = require("./db/connection.js");
//OP1:View all departments
function departments(){
    db.query('SELECT * FROM department', function (err, results) {
        if (err) console.error(err);
        else console.log(results);
    });
};  
//OP2:View all roles
function roles(){
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) console.error(err);
        else console.log(results);
    });
};
//OP3:View all employee
function employees(){
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) console.error(err);
        else console.log(results);
    });
};
//OP4:Add a department
function addDepartment(name) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO department (name) VALUES (?)', [name], function (err, results) {
             console.log(`Great!! ${name} was added successfully!`);
             console.log(results);
            if (err) {
                console.error(err);
                reject(err); // Reject the promise if there is an error
            } else {
                resolve(results); // Resolve the promise with the results
            }
        });
    });
};

//OP5:Add a role
function addRoles(title, salary, department_id) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], function (err, results) {
        if (err) {
          console.error('Error adding role:', err);
          reject(err); // Rejects the promise if there's an error
        } else {
          console.log(`Great!! ${title} was added successfully!`);
          resolve(results); // Resolves the promise with the result
        }
      });
    });
  }
  
//---OP6:Add an employee---

// Corrected addEmployee function with proper error handling and variable names
function addEmployee(first_name, last_name, role_id, manager_id) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id], function (err, results) {
            if (err) {
                console.error(err);
                reject(err); // Properly reject the promise
            } else {
                console.log(`Great!! ${last_name}, ${first_name} was added successfully!`);
                resolve(results); // Resolve the promise with the results
            }
        });
    });
}

// Corrected updateEmployeeRole function with proper error handling and variable names
function updateEmployeeRole(employeeId, newRoleId) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE employee SET roles_id = ? WHERE id = ?', [newRoleId, employeeId], function (err, updateResults) {
            if (err) {
                console.error(err);
                reject(err); // Properly reject the promise
            } else {
                //to make sure we are referencing updateResults, not results
                if (updateResults.affectedRows > 0) {
                    console.log(`Great!! Employee ${employeeId} was updated successfully!`);
                    resolve(updateResults); // Resolve the promise with the results
                } else {
                    console.log(`Employee ${employeeId} was not found or no new data was provided.`);
                    resolve(updateResults); // Still resolve the promise, no rows were affected
                }
            }
        });
    });
}

//dynamic role choices from database
function getRoles() {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, title FROM roles', (error, results) => {
        if (error) {
          return reject(error);
        }
        // Transform the result into a simple array of role names
        const employee = results.map(row => {
          return { name: `${row.title}`, value: row.id };
        });
        resolve(employee);
      });
    });
  }
// dynamic employee choices to choose from
  function getEmployees() {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, first_name, last_name FROM employee', (error, results) => {
        if (error) {
          return reject(error);
        }
        // Transform the result into a simple array of role names
        const employee = results.map(row => {
          return { name: `${row.first_name} ${row.last_name}`, value: row.id };
        });
        resolve(employee);
      });
    });
  }
//-----------------

// retrive departments to chose from 
function getDepartments() {
    return new Promise((resolve, reject) => {
     db.query('SELECT * FROM department', (error, results) => {
        if (error) {
          return reject(error);
        }
        // Transform the result into a simple array of role names
        const departmentChoices = results.map(row => {
          return { name: `${row.name}`, value: row.id };
        });
        resolve(departmentChoices);
      });
    });
  }

  function fullEmployeeData(){
    db.query(`SELECT e.id, e.first_name, e.last_name, r.title, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
    FROM employee e
    JOIN roles r ON e.roles_id = r.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `, function (err, results) {
        if (err) console.error(err);
        else console.log(results);
    });
};  
  //------------------

  module.exports = {
    departments,
    roles,
    employees,
    addDepartment, 
    addRoles,
    addEmployee,
    getRoles,
    getEmployees,
    updateEmployeeRole,
    getDepartments,
    fullEmployeeData,
}
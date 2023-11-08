
const  dbQueryFunctions = require('./functions.js');
const inquirer = require('inquirer'); 

const newEmployeeQuestions = [
    {
      type: 'input',
      name: 'first_name',
      message: "What's the employee's first name?",
      validate: input => {
        if (input.trim() === '') {
          return 'Please Enter a Role.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What's the employee's last name?",
      validate: input => {
        if (input.trim() === '') {
          return 'Please Enter a Role.';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'role_id',
      message: "What's the employee's role?",
      choices: () => dbQueryFunctions.getRoles(),
      validate: input => {
        if (input.trim() === '') {
          return 'Please Select a Role.';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'manager_id',
      message: "Who is the employee's manager?",
      choices: () => dbQueryFunctions.getEmployees(),
      validate: input => {
        if (input.trim() === '') {
          return 'Please Enter a Manager.';
        }
        return true;
      }
    },
  ];
  
  const newRoleQuestions = [
    {
      type: 'input',
      name: 'title',
      message: "What's the title?",
      validate: input => {
        if (input.trim() === '') {
          return 'Please Enter a Role.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: "What's the salary?",
      validate: input => {
        if (isNaN(input) || input.trim() === '') {
          return 'Please enter a valid salary (numeric value).';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'department_id',
      message: "What's the department?",
      choices: () => dbQueryFunctions.getDepartments(),
      validate: input => {
        if (input.trim() === '') {
          return 'Please Enter a department.';
        }
        return true;
      }
    },
  ];

  const updateEmployeeQuestions = [
    {
      type: 'list',
      name: 'employee',
      message: "Select an Employee:",
      choices: () => dbQueryFunctions.getEmployees(),
      validate: input => {
        if (input.trim() === '') {
          return 'Please Select a Employee:';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'role',
      message: "Select a Role:",
      choices: () => dbQueryFunctions.getRoles(),
      validate: input => {
        if (input.trim() === '') {
          return 'Please Select a Role:';
        }
        return true;
      }
    },
  ];

  module.exports = {
    newEmployeeQuestions,
    newRoleQuestions,
    updateEmployeeQuestions
  };
//imports inquirer
const inquirer = require('inquirer'); 
//imports the additonal prompt questions for the user choices 
const sideQuestions = require('./sideQuestions.js'); 
//imports functions stored in the functions.js to interact with database
const dbQueryFunctions = require('./functions.js'); 
/* [async]asynchronous function
  --allowes to use "await"
*/
async function employeeTrackerMenu() {
  process.stdout.write('\x1Bc');
  /* [try] - creates a block of code for testing errors
   if error happens it gets send to catch
   also prevents code form crashing, if errors happens 
  */
  try {
   /* starts Questions point 
    [await] + [inquirer.prompt()] -> await pauses the function execution until 
    prompt is completed and resuslts obtained
   */
    process.stdout.write('\x1Bc');
    const { menuOption } = await inquirer.prompt([
      {
        
        type: 'list',
        name: 'menuOption',
        message: 'What would you like to do?',
        choices: [
          'View Departments',
          'View Roles',
          'View Employees',
          'Add Department',
          'Add Role',
          'Add an Employee',
          'Update Employee',
          'Quit'
        ]
      }
    ]);
    process.stdout.write('\x1Bc');
    // [switch] used to execute diffrent blocks of code depending on the user choice, in this case 
   
    switch (menuOption) {
      case 'View Departments':
        process.stdout.write('\x1Bc');
        await dbQueryFunctions.departments(); //calls the function that will execute te query to interact with database, [await] pauses until task is completed
        break;
      case 'View Roles':
        process.stdout.write('\x1Bc');
        await dbQueryFunctions.roles();
        break;
      case 'View Employees':
        process.stdout.write('\x1Bc');
        await dbQueryFunctions.employees();
        break;
      case 'Add Department':
        //this section works similar to the the previous prompt,
        // since it was just one needed input, did not built a seprate function
        process.stdout.write('\x1Bc');
        const { DepartmentName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'DepartmentName',
            message: 'Enter Department Name:',
            //trim() removed realding and trailing whitespace from the imput, if its an emty string it will prompt a message
            validate: input => input.trim() === '' ? 'Please Enter a Name:' : true
          }
        ]);
        //once input is executed, function called to send info to database
        await dbQueryFunctions.addDepartment(DepartmentName);
        await dbQueryFunctions.departments();
        break;
      case 'Add Role':
        process.stdout.write('\x1Bc');
        const roleAnswers = await inquirer.prompt(sideQuestions.newRoleQuestions);
        await dbQueryFunctions.addRoles(roleAnswers.title, roleAnswers.salary, roleAnswers.department_id);
        await dbQueryFunctions.roles();
        break;
      case 'Add an Employee':
        process.stdout.write('\x1Bc');
        const employeeAnswers = await inquirer.prompt(sideQuestions.newEmployeeQuestions);
        await dbQueryFunctions.addEmployee(employeeAnswers.first_name, employeeAnswers.last_name, employeeAnswers.role_id, employeeAnswers.manager_id);
        await dbQueryFunctions.fullEmployeeData();
        break;
      case 'Update Employee':
        process.stdout.write('\x1Bc');
        const updateAnswers = await inquirer.prompt(sideQuestions.updateEmployeeQuestions);
        await dbQueryFunctions.updateEmployeeRole(updateAnswers.employeeId, updateAnswers.newRoleId);
        await dbQueryFunctions.fullEmployeeData();
        break;
      case 'Quit':
        process.stdout.write('\x1Bc'); // clears terminal 
        console.log('Goodbye!');
        process.exit(); // ends node process
      default:
        console.log('Invalid option selected.');
        break;
    }
   
    // Prompt the menu again if not quitting
    if (menuOption !== 'Quit') {
      process.stdout.write('\x1Bc');
      await employeeTrackerMenu();

    }
  /* [catch] - will handle any errors that may occur in hte [try] block. */
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Start the menu
employeeTrackerMenu();

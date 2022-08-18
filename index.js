const pageTemplate = require('./pageTemplate.js');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Employee = require('./lib/Employee.js');
const inquirer = require('inquirer');
const fs = require('fs');

var employees = [];

const managerProfile = function () {
   return inquirer.prompt([
        {
            type: 'text',
            name: 'name',
            message: "Team manager's name (required)",
            validate: name => {
                if (name) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'id',
            message: 'Enter employee ID (required)',
            validate: id => {
                if (id) {
                    return true;
                } else {
                    console.log('Please enter an ID');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'email',
            message: "Employee's Email (required)",
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log('Please enter an Email');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'office',
            message: 'Enter employee office number (required)',
            validate: office => {
                if (office) {
                    return true;
                } else {
                    console.log('Please enter an office number');
                    return false;
                }
            }
        },
   ])
       
    .then(managerData => {
        const { name, id, email, officeNumber } = managerData;
        const manager = new Manager(name, id, email, officeNumber);
        employees.push(manager);
    })
};


const menu = function () {
  return  inquirer.prompt([
        {
        type: 'list',
        message: 'Add an employee',
        name: 'role',
        choices: ['Engineer', 'Intern']
        },
        {
            type: 'text',
            name: 'name',
            message: 'Employee name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'id',
            message: 'Enter employee ID',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter an ID');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'email',
            message: 'Enter employee email address',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter an email');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'github',
            message: 'Enter employee Github',
            when: (input) => input.role === 'Engineer',
            validate: github => {
                if (github) {
                    return true;
                } else {
                    console.log('Please enter a github username');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'school',
            message: "Enter intern's school",
            when: (input) => input.role === 'Intern',
            validate: school => {
                if (school) {
                    return true;
                } else {
                    console.log('Please enter a school');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add an employee?',
            default: false
        }
  ])
      
    .then(employeesData => {
        let { name , id, email, role, github, school, confirmAddEmployee} = employeesData;
        let employee;

        if(role === 'Engineer') {
            employee = new Engineer(name, id, email, github);
            console.log(employee);
        } else if (role === "Intern") {
            employee = new Intern(name, id, email, school);
            console.log(employee);
        }
        employees.push(employee);

        if(confirmAddEmployee) {
            return menu(employees)
        } else {
            return employees;  
        }
    })
    
};

managerProfile()
.then(menu)
.then(data => {
    const pageHTML = pageTemplate(data)
 fs.writeFile('./index.html', pageHTML, err => {
     if (err) {
         console.log(err);
            return;
        } else {
            console.log("Page created.")
        }
    })
});

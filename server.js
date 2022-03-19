// Adding Dependencies
const mysql = require('mysql2')
const inq = require('inquirer')
const consTab = require('console.table');

// Connection to my Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'arjun',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`
    █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
    █░░░░░░░░░░░░░░█░░░░░░██████████░░░░░░█░░░░░░░░░░░░░░█░░░░░░█████████░░░░░░░░░░░░░░█░░░░░░░░██░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█
    █░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░░░░░░░░░░░░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀░░██░░▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
    █░░▄▀░░░░░░░░░░█░░▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░█░░░░▄▀░░██░░▄▀░░░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░░░█
    █░░▄▀░░█████████░░▄▀░░░░░░▄▀░░░░░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░███░░▄▀▄▀░░▄▀▄▀░░███░░▄▀░░█████████░░▄▀░░█████████
    █░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░███░░░░▄▀▄▀▄▀░░░░███░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░░░█
    █░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█████░░░░▄▀░░░░█████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
    █░░▄▀░░░░░░░░░░█░░▄▀░░██░░░░░░██░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░███████░░▄▀░░███████░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░░░█
    █░░▄▀░░█████████░░▄▀░░██████████░░▄▀░░█░░▄▀░░█████████░░▄▀░░█████████░░▄▀░░██░░▄▀░░███████░░▄▀░░███████░░▄▀░░█████████░░▄▀░░█████████
    █░░▄▀░░░░░░░░░░█░░▄▀░░██████████░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░███████░░▄▀░░███████░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░░░█
    █░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██████████░░▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░███████░░▄▀░░███████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
    █░░░░░░░░░░░░░░█░░░░░░██████████░░░░░░█░░░░░░█████████░░░░░░░░░░░░░░█░░░░░░░░░░░░░░███████░░░░░░███████░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█
    █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
    █░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░███░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░███
    █░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀▄▀░░███░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀▄▀░░███
    █░░░░░░▄▀░░░░░░█░░▄▀░░░░░░░░▄▀░░███░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░▄▀░░███
    █████░░▄▀░░█████░░▄▀░░████░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░███░░▄▀░░█████████░░▄▀░░████░░▄▀░░███
    █████░░▄▀░░█████░░▄▀░░░░░░░░▄▀░░███░░▄▀░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░███░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░▄▀░░███
    █████░░▄▀░░█████░░▄▀▄▀▄▀▄▀▄▀▄▀░░███░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░███░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀▄▀░░███
    █████░░▄▀░░█████░░▄▀░░░░░░▄▀░░░░███░░▄▀░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░███░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░░░███
    █████░░▄▀░░█████░░▄▀░░██░░▄▀░░█████░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░███░░▄▀░░█████████░░▄▀░░██░░▄▀░░█████
    █████░░▄▀░░█████░░▄▀░░██░░▄▀░░░░░░█░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░░░█░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░░░░░█
    █████░░▄▀░░█████░░▄▀░░██░░▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀▄▀▄▀░░█
    █████░░░░░░█████░░░░░░██░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░░░░░█
    ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████`)
    // runs the app
    firstPrompt();
});

// If Error is Thrown, Error will come up in console log
process.on('uncaughtException', function (err) {
    console.log(err);
}); 

function firstPrompt() {
    console.log("Welcome To The Employee Tracker!")

    inq.prompt({
        type:'list',
        name: "firstTask",
        message: "What Would You Like To Do?",
        choices: [
        "View all departments",
        "View all roles",
        "View all employees", 
        "Add a department", 
        "Add a role", 
        "Add an employee", 
        "Update an employee role"
    ]
}).then(function ({ firstTask }) {
    switch (firstTask) {
      case "View all departments":
        viewDepartment();
        break;

      case "View all roles":
        viewRoles();
        break;
    
      case "View all employees":
        viewEmployee();
        break;

      case "Add a department":
        addDepartment();
        break;

      case "Add a role":
        addRole();
        break;

      case "Add an employee":
        addEmployee();
        break;

      case "Update an employee role":
        updateRole();
        break;
    }
  });
}

// View All Department Function
function viewDepartment() {
    const sql = `SELECT * FROM department`;

    connection.query(sql, (err, table) => {
        if (err) {
            return err
        } else {
            console.table(table)
            firstPrompt();
        }
    })
}

// View All Roles Function
function viewRoles() {
    const sql = `SELECT * FROM roles`;

    connection.query(sql, (err, table) => {
        if (err) {
            return err
        } else {
            console.table(table)
            firstPrompt();
        }
    })
}

// View All Employees Function
function viewEmployee() {
    const sql = `SELECT * FROM employee`;

    connection.query(sql, (err, table) => {
        if (err) {
            return err
        } else {
            console.table(table)
            firstPrompt();
        }
    })
}

// Adding A Department Function
function addDepartment() {
    return inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is your Departments Name??',
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department(name) VALUES (?)`;
      connection.query(sql, answer.departmentName, (err, res) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log('Added the department successfully');
          firstPrompt();
        }
      })
    })
}

// Adding A Role Function
function addRole() {
    return inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'list',
        name: 'roleDepartment',
        message: 'Which department does the role belong to?',
        choices: depArray,
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?)`;
      connection.query(sql, [[answers.roleName, answers.roleSalary, answers.roleDepartment]], (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Added the role successfully');

          firstPrompt();
        }
      });
    });
};

// An Empty Array to start off the list of Departments
const depArray = [];

// A Function to update the array of departments. It will start off as an empty array and will push all the new ones into the empty array
function updateDepArray() {
  departmentArr = [];
  const sql = `SELECT * FROM department`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        res.forEach((department) => {
          let departmentObj = {
            name: department.name,
            value: department.id,
          };
          departmentArr.push(departmentObj);
        });
        resolve();
      }
    });
  });
}
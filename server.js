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
          console.log(err)
          firstPrompt();
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
          console.log(err)
          firstPrompt();
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
          console.log(err)
          firstPrompt();
        } else {
            console.table(table)
            firstPrompt();
        }
    })
}

// Adding A Department Function
async function addDepartment() {
  updateDepArray()
    const answer = await inq
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is your Departments Name??',
      },
    ]);
  const sql = `INSERT INTO department(name) VALUES (?)`;
  connection.query(sql, answer.departmentName, (err, res) => {
    if (err) {
      console.log(err);
      firstPrompt();
    } else {
      console.log('Added the department successfully');
      firstPrompt();
    }
  });
}

// Adding A Role Function
async function addRole() {
  updateRolesArr()
  updateDepArray()
    const answers = await inq
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
    ]);
  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?)`;
  connection.query(sql, [[answers.roleName, answers.roleSalary, answers.roleDepartment]], (err, res) => {
    if (err) {
      console.log(err);
      firstPrompt();
    } else {
      console.log('Added the role successfully');

      firstPrompt();
    }
  });
};

function addEmployee() {
  updateRolesArr();
  updateEmplArr();

  const answers = inq.prompt([
    {
      type: 'input',
      name: 'employeeFirstName',
      message: "What is the employee's first name?",
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: "What is the employee's last name?",
    },
    {
      type: 'list',
      name: 'employeeRole',
      message: "What is the employee's role?",
      choices: rolesArr,
    },
    {
      type: 'list',
      name: 'employeeManager',
      message: "Who is the employee's manager?",
      choices: employeeArr,
    },
  ]);
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`;
  connection.query(sql, [[answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager]], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added the employee successfully');
      firstPrompt();
    }
  });
}

// Empty Arrays to start off the list of Departments, Roles and Employees
const depArray = [];
const rolesArr = [];
const employeeArr = []

// A Function to update the array of departments. It will start off as an empty array and will push all the new ones into the empty array
function updateDepArray() {
  departmentArr = [];
  const sql = `SELECT * FROM department`;
  return new Promise((resolve) => {
    connection.query(sql, (err, res) => {
      if (err) {
        console.log(err)
        firstPrompt();
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

// A Function to update the list of employees array and updating it everytime a new one is added
function updateEmplArr() {
  employeeArr = [];
  const sql = `SELECT * FROM employee`;
  return new Promise((resolve) => {
    connection.query(sql, (err, res) => {
      if (err) {
        console.log(err)
        firstPrompt();
      } else {
        res.forEach((employee) => {
          let employeeObj = {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id,
          };
          employeeArr.push(employeeObj);
        });
        resolve();
      }
    });
  });
}

// A Function to update the List of Roles Array and updating it everytime a new one is added
function updateRolesArr() {
  const answers = inq.prompt([
    {
      type: 'list',
      name: 'employeeSelect',
      message: "Which employee's role do you want to update?",
      choices: employeeArr,
    },
    {
      type: 'list',
      name: 'roleSelect',
      message: 'Which role do you want to assign the selected employee?',
      choices: rolesArr,
    },
  ]);

  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  connection.query(sql, [[answers.roleSelect], [answers.employeeSelect]], (err, res) => {
    if (err) {
      console.log(err)
        firstPrompt();
    } else {
      console.log("Updated the employee's role successfully");
      firstPrompt();
    }
  });
  updateRolesArr();
  updateEmployeeArr();

}

// Function for updating the Role of the Employee
function updateRole() {
  employeeArr = [];
  const sql = `SELECT * FROM employee`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        console.log(err)
        firstPrompt();
      } else {
        res.forEach((employee) => {
          let employeeObj = {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id,
          };
          employeeArr.push(employeeObj);
        });
        resolve();
      }
    });
  });
}
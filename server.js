// Adding Dependencies
const mysql = require('mysql2')
const inq = require('inquirer')
const consTab = require('console.table')

// Connection to my Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3000,
    password: 'arjun',
    database: 'employee_db'
});


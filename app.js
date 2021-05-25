const mysql = require('mysql');
const inquirer = require("inquirer");
const table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_db"
});


function startApp() {
    inquirer.prompt({
        message: "Please select an option!",
        type: "list",
        choices: [
            "View all current employees.",
            "View all current departments.",
            "Add a new employee.",
            "Add a new department.",
            "Add a new role.",
            "Update a current employee's role.",
            "EXIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "View all current employees.":
                currentEmployees()
                break;
            case "View all current departments.":
                currentDepartments()
                break;
            case "Add a new employee.":
                newEmployee()
                break;
            case "Add a new department.":
                newDepartment()
                break;
            case "Add a new role.":
                newRole()
                break;
            case "Update a current employee's role.":
                changeEmployeeRole();
                break;   
            default:
                connection.end()
                break;
        }
    })
}

function newDepartment() {
  inquirer.prompt([{
      type: "input",
      name: "newDepartment",
      message: "Input the new department you would like to add."
  }, ]).then(function(res) {
      connection.query('INSERT INTO department (department) VALUES (?)', [res.newDepartment], function(err, data) {
          if (err) throw err;
          console.table("Successfully Inserted");
          startApp();
      })
  })
}

function newRole() {
  inquirer.prompt([
      {
          message: "Input a new role.",
          type: "input",
          name: "newRole"
      }, {
          message: "Input a salary for this role.",
          type: "number",
          name: "salary"
      }, {
          message: "Input a department ID for this role.",
          type: "number",
          name: "departmentId"
      }
  ]).then(function (response) {
      connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.newRole, response.salary, response.departmentId], function (err, data) {
          console.table(data);
      })
      startApp();
  })

}

function newEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "Please input the new employee's first name"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please input the new employee's last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "Please input the new employee's role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "Please input the new employee's manager's ID?"
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) throw err;
            console.table("New employee successfully added!");
            startApp();
        })
    })
}

function changeEmployeeRole() {
    inquirer.prompt([
        {
            message: "Input the first name of the employee you would like to update.",
            type: "input",
            name: "firstName"
        }, {
            message: "Input the new role ID of the employee.",
            type: "number",
            name: "roleId"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.roleId, response.firstName], function (err, data) {
            console.table(data);
        })
        startApp();
    })

}

function currentDepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
      console.table(data);
      startApp();
  })
}

function currentEmployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
      console.table(data);
      startApp();
  })
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("You are connected as id " + connection.threadId);
  startApp();
});
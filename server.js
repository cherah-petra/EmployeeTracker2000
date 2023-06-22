//Dependencies

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const figlet = require("figlet");
const { resolveSoa, NONAME } = require("dns");

const db = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employeeTracker_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + db.threadId);
  begin();
});

// view all departments
// view all resolve
// view all employees
// add a department
// add a role
// add an employee
// update an employee role

// Start the application

function begin() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "View departments",
          "View existing roles",
          "View all employees",
          "Change the role for an existing employee",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "View existing roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Change the role for an existing employee":
          changeEmployeeRole();
          break;
        case "Quit the application":
          console.log("Goodbye!");
          connection.end();
          break;
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

// Individual functions

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the new Department?",
      name: "name",
    })
    .then(function (answer) {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.name],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          begin();
        }
      );
    });
}

function addRole() {
    // Fetch all departments from the database
    db.query("SELECT id, name FROM department", function (err, rows) {
      if (err) throw err;
  
      const deptChoices = rows.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
  
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the name of the new Role?",
            name: "title",
          },
          {
            type: "input",
            message: "What is the salary for the new Role?",
            name: "salary",
          },
          {
            type: "list",
            name: "deptId",
            message: "Select the department for the new Role:",
            choices: deptChoices,
          },
        ])
        .then((answers) => {
          const { title, salary, deptId } = answers;
  
          // Insert the new role into the database
          db.query(
            "INSERT INTO employeeRole (title, salary, department_id) VALUES (?, ?, ?)",
            [title, salary, deptId],
            function (err, res) {
              if (err) throw err;
              console.log("Role added successfully!");
              begin();
            }
          );
        });
    });
  }
  

function addEmployee() {
  // Fetch all employees from the database
  db.query("SELECT id, first_name FROM employee", function (err, rows) {
    if (err) throw err;

    const employeeChoices = rows.map(({ id, first_name }) => ({
      name: first_name,
      value: id,
    }));

    // Fetch all roles from the database
    db.query("SELECT * FROM employeeRole", function (err, rows) {
      if (err) throw err;

      
      const roleChoices = rows.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            message: "Employee first name:",
            name: "first_name",
          },
          {
            type: "input",
            message: "Employee last name:",
            name: "last_name",
          },
          {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "managerId",
            message: "Select the manager for the employee:",
            choices: employeeChoices,
          },
        ])
        .then((answers) => {
          const { first_name, last_name, roleId, managerId } = answers;

          // Insert the new employee into the database
          db.query(
            "INSERT INTO employee (first_name, last_name, employeeRole_id, manager_id) VALUES (?, ?, ?, ?)",
            [first_name, last_name, roleId, managerId],
            function (err, res) {
              if (err) throw err;
              console.log("Employee added successfully!");
              begin();
            }
          );
        });
    });
  });
}

function viewDepartments() {
  let query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });
}

function viewRoles() {
  let query = "SELECT * FROM employeeRole";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });
}

function viewEmployees() {
  let query = "SELECT * FROM employee";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    begin();
  });
}

function changeEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to make changes to?",
        name: "first_name",
      },

      {
        type: "input",
        message: "What is the new role?",
        name: "title",
      },
    ])
    .then(function (answer) {
      db.query(
        "UPDATE employee SET title=? WHERE first_name=?",
        [answer.title, answer.first_name],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          begin();
        }
      );
    });
}

function quit() {
  db.end();
  process.exit();
}

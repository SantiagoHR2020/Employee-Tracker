const inquirer = require("inquirer");
const DB = require("./db/db.js");
require("console.table");

function questions() {
  inquirer
    .prompt({
      type: "list",
      name: "question",
      message: "What would you like to do?",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Create Department",
        "Create Role",
        "Create Employee",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.question) {
        case "View departments":
          viewAllDepartments();
          break;

        case "View roles":
          viewAllRoles();
          break;

        case "View employees":
          viewAllEmployees();
          break;

        case "Create Department":
          createDepartment();
          break;

        case "Create Role":
          createRole();
          break;

        case "Create Employee":
          createEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          finished();
          break;
      }
    });
}
function viewAllDepartments() {
  console.log("Selecting all Departments...\n");
  DB.findAllDepartments().then(function (res) {
    console.table(res);
    questions();
  });
}

function viewAllRoles() {
  console.log("Selecting all Roles...\n");
  DB.findAllRoles().then(function (res) {
    console.table(res);
    questions();
  });
}

function viewAllEmployees() {
  console.log("Selecting all Employees...\n");
  DB.findAllEmployees().then(function (res) {
    console.table(res);
    questions();
  });
}

function finished() {
  process.exit();
}

function createDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Department name?",
      },
    ])
    .then(function (answer) {
      DB.createDepartment(answer.departmentName).then(function (res) {
        console.log(res);
        viewAllDepartments();
      });
    });
}

async function createRole() {
  const departments = await DB.findAllDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's title",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "list",
        name: "department_id",
        message: "which department is the role part of",
        choices: departmentChoices,
      },
    ])
    .then((answer) => {
      DB.createRole(answer.title, answer.salary, answer.department_id).then(
        (res) => {
          console.log(res);
          viewAllRoles();
        }
      );
    });
}

async function createEmployee() {
  const roles = await DB.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const employees = await DB.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

employeeChoices.push({name:"NA", value: null})

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "which role is assign to the employee",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "manager_id",
        message: "who is the manager",
        choices: employeeChoices,
      },
    ])
    .then((answer) => {
      DB.createEmployee(
        answer.first_name,
        answer.last_name,
        answer.role_id,
        answer.manager_id
      ).then((res) => {
        console.log(res);
        viewAllEmployees();
      });
    });
}

async function updateEmployeeRole() {
  const roles = await DB.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const employees = await DB.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  console.log(employeeChoices)

  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "which employee do you want to update role?",
        choices: employeeChoices,
      },
      {
        type: "list",
        name: "role_id",
        message: "which new role is assign to the employee",
        choices: roleChoices,
      },
    ])
    .then((answer) => {
      DB.updateEmployeeRole(answer.role_id, answer.employee_id).then((res) => {
        console.log(res);
        viewAllEmployees();
      });
    });
}



questions();

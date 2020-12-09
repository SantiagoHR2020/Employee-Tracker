const inquirer = require("inquirer");
const { createRole } = require("./db/db.js");
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

// async function createRole() {
//   const departments = await DB.findAllDepartments();
//   const departmentChoices = departments.map(({ department_id, name }) => ({
//     name: name,
//     value: department_id,
//   }));
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "title",
//         message: "What is the role's title",
//       },
//       {
//         type: "input",
//         name: "salary",
//         message: "What is the salary?",
//       },
//       {
//         type: "list",
//         name: "department_id",
//         message: "which role is the department is assing to",
//         choices: departmentChoices,
//       },
//     ])
//     .then((answer) => {
//       DB.createRole(answer.title, answer.salary, answer.department_id).then(
//         (res) => {
//           console.log(res);
//           viewAllRoles();
//         }
//       );
//     });
// }
questions();

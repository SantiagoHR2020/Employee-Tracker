const connection = require("./connection");

class DB {

    constructor(){
        this.connection = connection
    }

    findAllDepartments(){
        return this.connection.query("SELECT * FROM department")
    }

    findAllEmployees(){
        return this.connection.query("SELECT employee.id, first_name, last_name, title, name AS department_name, salary, manager_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on department_id = department.id")
    }
    findAllRoles(){
        return this.connection.query("SELECT role.id, role.title, role.salary, role.department_id, department.name  FROM role LEFT JOIN department on department_id = department.id")
    }

    findAllEmployeesByRole(){
        return this.connection.query("SELECT first_name, last_name, title, name AS department_name, salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on department_id = department.id WHERE ?",
        {
            role_id: role_id,
        })
    }

    createDepartment(name){
        return this.connection.query("INSERT INTO department SET ?", {
            name: name
        })
    }

    createRole(title, salary, department_id){
        return this.connection.query("INSERT INTO role SET ?", {
            title: title,
            salary: salary,
            department_id: department_id
        })
    }

    createEmployee(first_name, last_name, role_id, manager_id){
        return this.connection.query("INSERT INTO employee SET ?", {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
        })
    }

    updateEmployeeManager(manager_id){
        return this.connection.query("UPDATE employee SET ? WHERE ?", [{
            manager_id: manager_id
        },
        {
            id: employee_id
        }])
    }

    updateEmployeeRole(role_id, employee_id){
        console.log(role_id, employee_id)
        return this.connection.query("UPDATE employee SET ? WHERE ?", [{
            role_id: role_id
        },
        {
            id: employee_id
        }])
    }
    


}

module.exports = new DB(connection)
const connection = require("./connection");

class DB {

    constructor(){
        this.connection = connection
    }

    findAllDepartments(){
        return this.connection.query("SELECT * FROM department")
    }

    findAllEmployees(){
        return this.connection.query("SELECT * FROM employee")
    }
    findAllRoles(){
        return this.connection.query("SELECT * FROM role")
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
    


}

module.exports = new DB(connection)
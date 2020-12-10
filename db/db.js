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

    createEmplyee(first_name, last_name, role_id, manager_id){
        return this.connection.query("INSERT INTO employee SET ?", {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
        })
    }
    


}

module.exports = new DB(connection)
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

    


}
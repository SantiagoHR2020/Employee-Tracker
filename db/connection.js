const mysql = require("mysql");
const inquirer = require("inquirer");
const util = 

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12341234",
  database: "employeetracker_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    
  });


  //  make a promise

  
  module.exports = connection
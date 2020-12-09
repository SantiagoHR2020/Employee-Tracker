DROP DATABASE IF EXISTS employeetracker_DB;
CREATE database employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE department(
  id INT NOT NULL auto_increment,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL auto_increment,
  title VARCHAR(30),
  salary decimal,
  department_id INT,
  PRIMARY KEY (id)
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
  FOREIGN KEY (role_id) REFERENCES role(id)
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
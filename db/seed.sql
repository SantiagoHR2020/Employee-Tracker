INSERT INTO department(name) VALUES("accounting"), ("sale"), ("legal");
INSERT INTO role(title, salary, department_id) VALUES("account manager", 90000, 1), ("Sales manager", 100000, 2), ("Compliance officer", 80000, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Santiago", "Hincapie", 1, null), ("Bob", "Burger", 1), ("Alice", "Wonder", 2), ("Joe", "Shmoe", 3);
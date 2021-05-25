USE employees_db;

INSERT INTO department (Department)
VALUES ("Sales"), ("Development"), ("Testing");


INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 50000, 1), ("Front-End-Dev", 75000, 2), ("Back-End-Dev", 75000, 3), ("Test-Dev", 100000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Corey", "Block", 3, 1), ("Jeff", "Gram", 1, 2), ("Jake", "Hill", 2, 3), ("Frank", "TheTank", 4, 4), ("Arnold", "Palmer", 1, null), ("Who", "Areyou", 2, null), ("Michael", "Douglas", 3, null), ("Anne", "Marie", 4, null);

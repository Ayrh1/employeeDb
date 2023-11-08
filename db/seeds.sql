USE personnelData_db;

INSERT INTO department (name)
VALUES ('Shipping'),
       ('Purchasing'),
       ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES ('Manager', 80000, 2), -- No commas in the numerical salary value
       ('Buyer', 50000, 2),
       ('Box-Handler', 45000, 1), -- Presumed 'Bax-Handler' is a typo, changed to 'Box-Handler'
       ('Sales Representative', 45000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ('Sally', 'Westlow', 2, NULL), -- Assuming Sally Westlow does not have a manager
       ('Adam', 'Garcia', 1, NULL), -- Assuming Adam Garcia does not have a manager
       ('Peter', 'Ruvnic', 3, NULL); -- Assuming Peter Ruvnic does not have a manager, and removed trailing comma

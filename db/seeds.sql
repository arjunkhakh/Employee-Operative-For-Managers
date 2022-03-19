INSERT INTO department(name)
VALUES ("Marketing"),
       ("Fashion"),
       ("Law"),
       ("Public Sector");

INSERT INTO roles(title, salary, department_id)
VALUES ("Marketing Lead", "50000", 1),
       ("Solutions Architect", "40000", 1),
       ("Fashion Designer", "45000", 2),
       ("Menswear Model", "30000", 2),
       ("Lawyer", "80000", 3),
       ("Legal Secretary", "75000", 3),
       ("Doctor", "100000", 4),
       ("Police Officer", "120000", 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Sidny", "Prescott", 1, NULL),
       ("Matt", "Smith", 2, 1),
       ("Raven", "Baxxter", 3, NULL),
       ("Malik", "Dellgaty", 4, 3),
       ("Rose", "Tylerr", 5, NULL),
       ("Nathan", "Drake", 6, 5),
       ("NanNo", "Brown", 7, NULL),
       ("Tom", "Hardy", 8, 7);
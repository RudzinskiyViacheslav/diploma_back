/* Инициализация БД к диплому */

CREATE UNLOGGED TABLE IF NOT EXISTS Users
(
    user_id int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    first_name varchar(20),
    last_name varchar(20),
    middle_name varchar(20),
    birth_date varchar(20),
    adress varchar(100),
    mobile_phone varchar(20),
    employee_id varchar(20),
    passport varchar(20),
    email varchar(50),
    password varchar (50),
    position int
);

CREATE UNLOGGED TABLE IF NOT EXISTS Capfk
(
    capfk_id int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    capfk_name varchar(100),
    adress varchar(100),
    station_name varchar(100),
    index_capfk varchar(20),
    departments_quantity varchar(100),
    capfk_master varchar(100)
);

CREATE  UNLOGGED TABLE IF NOT EXISTS Departments
(
    department_id int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    department_adress varchar(100),
    department_number varchar(100),
    department_master varchar(100),
    work_phone varchar(20),
    department_capfk_id int references capfk(capfk_id) not null,
    equipment_quantity varchar(100)
);

CREATE UNLOGGED TABLE IF NOT EXISTS Equipment
(
    equipment_id     int GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    equipment_number varchar(100),
    factory_number   varchar(100),
    delivery_date    varchar(20),
    depreciation_period varchar(100),
    depreciation_end varchar(100),
    equipment_type varchar(20),
    equipment_department_id int references  departments(department_id) not null,
    price varchar(100)
);

-- SELECT * FROM capfk ORDER BY departments_quantity ASC;

-- SELECT * FROM equipment WHERE equipment_department_id=1 ORDER BY price;
CREATE DATABASE test_db;
USE test_db;
CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,
    salt VARCHAR(100) NOT NULL,
    created DATE NOT NULL,
    verifyed BOOLEAN DEFAULT FALSE,
    admin BOOLEAN DEFAULT FALSE,
    blocked BOOLEAN DEFAULT FALSE
);
-- Creating DB
CREATE DATABASE perntodo;

-- Creating table
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
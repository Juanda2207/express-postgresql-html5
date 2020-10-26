CREATE DATABASE pacientes;

CREATE TABLE pacientes(

    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    enfermedad VARCHAR(100) NOT NULL
);

-- CREATE TABLE pacientes(
-- id SERIAL PRIMARY KEY,
-- nombre VARCHAR(50)NOT NULL,
-- apellido VARCHAR(50)NOT NULL,
-- numid VARCHAR(15) UNIQUE NOT NULL
-- )
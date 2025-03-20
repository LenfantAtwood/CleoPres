CREATE DATABASE studentdb;

\c studentdb




CREATE TABLE students (
  student_id VARCHAR(20) PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  subject_id VARCHAR(20) NOT NULL
);

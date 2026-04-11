CREATE TABLE student(
   enrollment VARCHAR(11) PRIMARY KEY,
   collegemail VARCHAR(26) UNIQUE NOT NULL,
   password VARCHAR(12),
   fine INTEGER
);
CREATE TABLE pass(
   id SERIAL PRIMARY KEY,
   enrollment VARCHAR(11) REFERENCES student(enrollment),
   creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   entry_time TIMESTAMP 
   expiry_time TIMESTAMP
);
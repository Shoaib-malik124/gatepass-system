CREATE TABLE pass (
    id SERIAL PRIMARY KEY,
    enrollment VARCHAR(11),
    exit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    entry_time TIMESTAMP,
    expiry_time TIMESTAMP,
    scanout BOOLEAN DEFAULT FALSE,
    scanin BOOLEAN DEFAULT FALSE,
    processed BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_pass_student
        FOREIGN KEY (enrollment)
        REFERENCES student(enrollment)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
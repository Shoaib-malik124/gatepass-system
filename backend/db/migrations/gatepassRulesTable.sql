CREATE TABLE gatepass_rules(
  id SERIAL PRIMARY KEY,
  permission BOOLEAN DEFAULT TRUE,
  min_time TIME NOT NULL,
  max_time TIME NOT NULL,
  fine_rate INTEGER DEFAULT 10,
  max_fine INTEGER DEFAULT 1000
);
CREATE TABLE projects
(
    id           BIGSERIAL PRIMARY KEY,
    name         VARCHAR(255)                        NOT NULL,
    description  TEXT,
    start_date   DATE,
    end_date     DATE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP
);

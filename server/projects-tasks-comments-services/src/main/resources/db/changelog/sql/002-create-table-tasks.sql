CREATE TABLE tasks
(
    id           BIGSERIAL PRIMARY KEY,
    name         VARCHAR(255)                        NOT NULL,
    description  TEXT,
    project_id   BIGINT                              NOT NULL,
    executor_id  VARCHAR(255)                        NOT NULL,
    author_id    VARCHAR(255)                        NOT NULL,
    status       VARCHAR(50)                         NOT NULL,
    type         VARCHAR(50)                         NOT NULL,
    priority     VARCHAR(50)                         NOT NULL,
    end_date     DATE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date TIMESTAMP,
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
);

CREATE TABLE comments
(
    id           BIGSERIAL PRIMARY KEY,
    content      TEXT         NOT NULL,
    task_id      BIGINT       NOT NULL,
    author_id    VARCHAR(255) NOT NULL,
    created_date TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP,
    CONSTRAINT fk_comment_task
        FOREIGN KEY (task_id) REFERENCES tasks (id)
            ON DELETE CASCADE
);

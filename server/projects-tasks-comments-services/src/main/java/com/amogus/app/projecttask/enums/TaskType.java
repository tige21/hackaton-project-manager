package com.amogus.app.projecttask.enums;

import lombok.Getter;

@Getter
public enum TaskType {
    EPIC("epic"),
    BUG("bug"),
    TASK("task"),
    HISTORY("history"),
    SUBTASK("subtask");

    private final String type;

    TaskType(String type) {
        this.type = type;
    }

}

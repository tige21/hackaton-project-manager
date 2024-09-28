package com.amogus.app.projecttask.enums;

import lombok.Getter;

@Getter
public enum TaskStatus {
    OPEN("open"),
    IN_PROGRESS("in_progress"),
    REVIEW("review"),
    TESTING("testing"),
    DONE("done");

    private final String status;

    TaskStatus(String status) {
        this.status = status;
    }

}


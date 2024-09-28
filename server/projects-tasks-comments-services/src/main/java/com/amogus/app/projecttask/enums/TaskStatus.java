package com.amogus.app.projecttask.enums;

import lombok.Getter;

@Getter
public enum TaskStatus {
    OPEN("open"),
    IN_PROGRESS("inProgress"),
    REVIEW("review"),
    TESTING("testing"),
    READY("ready");

    private final String status;

    TaskStatus(String status) {
        this.status = status;
    }

}


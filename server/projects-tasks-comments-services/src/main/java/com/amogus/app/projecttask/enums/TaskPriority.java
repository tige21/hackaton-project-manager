package com.amogus.app.projecttask.enums;

import lombok.Getter;

@Getter
public enum TaskPriority {
    LOW("low"),
    MEDIUM("medium"),
    HIGH("high"),
    CRITICAL("critical");

    private final String priority;

    TaskPriority(String priority) {
        this.priority = priority;
    }

}

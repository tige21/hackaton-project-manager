package com.amogus.app.projecttask.exception;

public class TaskNotFoundException extends ResourceNotFoundException {

    public TaskNotFoundException(String message) {
        super(message);
    }
}

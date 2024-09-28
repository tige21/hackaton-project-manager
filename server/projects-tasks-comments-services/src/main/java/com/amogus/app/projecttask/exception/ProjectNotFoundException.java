package com.amogus.app.projecttask.exception;

public class ProjectNotFoundException extends ResourceNotFoundException {

    public ProjectNotFoundException(String message) {
        super(message);
    }
}

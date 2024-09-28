package com.amogus.app.projecttask.exception;

/**
 * Базовый класс для всех исключений, возникающих, когда ресурс не найден.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

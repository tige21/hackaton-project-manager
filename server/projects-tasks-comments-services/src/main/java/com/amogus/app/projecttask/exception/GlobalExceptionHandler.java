package com.amogus.app.projecttask.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Глобальный обработчик исключений для всех контроллеров.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Обработчик исключений, возникающих, когда ресурс не найден.
     *
     * @param ex исключение типа {@link ResourceNotFoundException}
     * @return ответ с сообщением об ошибке и статусом 404 Not Found.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("Ошибка", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    /**
     * Обработчик всех остальных необработанных исключений.
     *
     * @param ex исключение типа {@link Exception}
     * @return ответ с сообщением об ошибке и статусом 500 Internal Server Error.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGlobalException(Exception ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("Ошибка", "Внутренняя ошибка сервера");
        errorResponse.put("Сообщение", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}

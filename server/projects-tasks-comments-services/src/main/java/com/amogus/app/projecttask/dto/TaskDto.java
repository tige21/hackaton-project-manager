package com.amogus.app.projecttask.dto;

import com.amogus.app.projecttask.enums.TaskPriority;
import com.amogus.app.projecttask.enums.TaskStatus;
import com.amogus.app.projecttask.enums.TaskType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO для задачи")
public class TaskDto {

    @Schema(description = "Идентификатор задачи", example = "1")
    private Long id;

    @Schema(description = "Название задачи", example = "Реализовать новую фичу")
    private String name;

    @Schema(description = "Описание задачи", example = "Подробное описание задачи")
    private String description;

    @Schema(description = "ID проекта", example = "10")
    private Long projectId;

    @Schema(description = "ID исполнителя", example = "executor123")
    private String executorId;

    @Schema(description = "ID автора задачи", example = "author456")
    private String authorId;

    @Schema(description = "Тип задачи", example = "TASK", allowableValues = {"EPIC", "BUG", "TASK", "HISTORY", "SUBTASK"})
    private TaskType type;

    @Schema(description = "Статус задачи", example = "IN_PROGRESS", allowableValues = {"OPEN", "IN_PROGRESS", "REVIEW", "TESTING", "DONE"})
    private TaskStatus status;

    @Schema(description = "Приоритет задачи", example = "HIGH", allowableValues = {"LOW", "MEDIUM", "HIGH", "CRITICAL"})
    private TaskPriority priority;

    @Schema(description = "Дата окончания задачи", example = "2024-09-30")
    private LocalDate endDate;

    @Schema(description = "Дата создания задачи", example = "2024-09-25T10:00:00")
    private LocalDateTime createdDate;

    @Schema(description = "Дата последнего обновления задачи", example = "2024-09-28T11:00:00")
    private LocalDateTime updatedDate;
}

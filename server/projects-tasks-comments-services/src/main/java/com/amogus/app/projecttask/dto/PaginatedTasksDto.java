package com.amogus.app.projecttask.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO для пагинированного списка задач")  // Описание DTO
public class PaginatedTasksDto {

    @Schema(description = "Список задач на текущей странице")
    private List<TaskDto> tasks;

    @Schema(description = "Номер текущей страницы", example = "1")
    private int currentPage;

    @Schema(description = "Общее количество страниц", example = "10")
    private int totalPages;

    @Schema(description = "Общее количество элементов", example = "100")
    private long totalElements;
}

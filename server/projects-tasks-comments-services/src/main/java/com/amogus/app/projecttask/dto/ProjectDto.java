package com.amogus.app.projecttask.dto;

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
@Schema(description = "DTO для описания проекта", requiredProperties = {"name", "description", "startDate", "endDate"})
public class ProjectDto {


    @Schema(description = "Название проекта", example = "Project Alpha")
    private String name;

    @Schema(description = "Описание проекта", example = "This is a sample project")
    private String description;

    @Schema(description = "Дата начала проекта", example = "2024-05-22")
    private LocalDate startDate;

    @Schema(description = "Дата окончания проекта", example = "2024-06-22")
    private LocalDate endDate;

    @Schema(description = "Дата создания проекта", example = "2024-05-22T13:03:25", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime createdDate;

    @Schema(description = "Дата обновления проекта", example = "2024-06-01T13:03:25", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime updatedDate;
}

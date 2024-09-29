package com.amogus.app.projecttask.dto;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO для задач, сгруппированных по статусам")
public class TaskStatusResponseDto {

    @ArraySchema(arraySchema = @Schema(description = "Список идентификаторов задач в Backlog"))
    private List<Long> backlog = new ArrayList<>();

    @ArraySchema(arraySchema = @Schema(description = "Список идентификаторов задач в работе"))
    private List<Long> inProgress = new ArrayList<>();

    @ArraySchema(arraySchema = @Schema(description = "Список идентификаторов задач на проверке"))
    private List<Long> review = new ArrayList<>();

    @ArraySchema(arraySchema = @Schema(description = "Список идентификаторов задач на тестировании"))
    private List<Long> testing = new ArrayList<>();

    @ArraySchema(arraySchema = @Schema(description = "Список идентификаторов готовых задач"))
    private List<Long> ready = new ArrayList<>();
}

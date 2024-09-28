package com.amogus.app.projecttask.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO для комментария")
public class CommentDto {

    @Schema(description = "Идентификатор комментария", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "ID задачи, к которой относится комментарий", example = "10")
    private Long taskId;

    @Schema(description = "Содержание комментария", example = "Это пример комментария")
    private String content;

    @Schema(description = "Дата создания", example = "2024-09-25T10:00:00")
    private LocalDateTime createdDate;

    @Schema(description = "Дата последнего обновления", example = "2024-09-28T11:00:00")
    private LocalDateTime updatedDate;
}

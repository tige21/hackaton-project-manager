package com.amogus.app.projecttask.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO для пагинированного списка комментариев")
public class PaginatedCommentsDto {

    @Schema(description = "Список комментариев")
    private List<CommentDto> comments;

    @Schema(description = "Текущая страница", example = "1")
    private int currentPage;

    @Schema(description = "Общее количество страниц", example = "5")
    private int totalPages;

    @Schema(description = "Общее количество элементов", example = "25")
    private long totalElements;
}

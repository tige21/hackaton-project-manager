package com.amogus.app.projecttask.api;

import com.amogus.app.projecttask.dto.CommentDto;
import com.amogus.app.projecttask.dto.PaginatedCommentsDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/api/comments")
public interface CommentApi {

    @Operation(summary = "Создание нового комментария", description = "Создает новый комментарий к задаче")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Комментарий успешно создан", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDto.class))),
            @ApiResponse(responseCode = "400", description = "Некорректные данные", content = @Content)
    })
    @PostMapping
    ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto);

    @Operation(summary = "Получение комментариев по ID задачи", description = "Возвращает список комментариев к задаче с поддержкой пагинации")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Комментарии к задаче получены", content = @Content(mediaType = "application/json", schema = @Schema(implementation = PaginatedCommentsDto.class))),
            @ApiResponse(responseCode = "404", description = "Комментарии не найдены", content = @Content)
    })
    @GetMapping("/task/{taskId}")
    ResponseEntity<PaginatedCommentsDto> getCommentsByTaskId(@PathVariable Long taskId,
                                                             @RequestParam(defaultValue = "1") int page,
                                                             @RequestParam(defaultValue = "10") int size);

    @Operation(summary = "Получение комментария по ID", description = "Возвращает комментарий по его ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Комментарий найден", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDto.class))),
            @ApiResponse(responseCode = "404", description = "Комментарий не найден", content = @Content)
    })
    @GetMapping("/{id}")
    ResponseEntity<CommentDto> getCommentById(@PathVariable Long id);

    @Operation(summary = "Обновление комментария", description = "Обновляет комментарий по его ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Комментарий успешно обновлен", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDto.class))),
            @ApiResponse(responseCode = "404", description = "Комментарий не найден", content = @Content)
    })
    @PutMapping("/{id}")
    ResponseEntity<CommentDto> updateComment(@PathVariable Long id, @RequestBody CommentDto commentDto);

    @Operation(summary = "Удаление комментария", description = "Удаляет комментарий по его ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Комментарий успешно удален"),
            @ApiResponse(responseCode = "404", description = "Комментарий не найден", content = @Content)
    })
    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteComment(@PathVariable Long id);
}

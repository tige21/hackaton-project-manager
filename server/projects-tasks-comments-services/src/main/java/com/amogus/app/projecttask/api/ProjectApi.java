package com.amogus.app.projecttask.api;

import com.amogus.app.projecttask.dto.ProjectDto;
import com.amogus.app.projecttask.entity.Project;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Project Management", description = "API для управления проектами")
public interface ProjectApi {

    @Operation(summary = "Создание нового проекта", description = "Создает новый проект на основе переданных данных")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешное создание проекта",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class))),
            @ApiResponse(responseCode = "400", description = "Некорректные данные", content = @Content)
    })
    @PostMapping
    ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto);

    @Operation(summary = "Получение списка всех проектов", description = "Возвращает список всех проектов")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешное получение списка проектов",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class))),
            @ApiResponse(responseCode = "404", description = "Проекты не найдены", content = @Content)
    })
    @GetMapping
    ResponseEntity<List<Project>> getAllProjects();

    @Operation(summary = "Получение проекта по ID", description = "Возвращает проект по его ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Проект найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class))),
            @ApiResponse(responseCode = "404", description = "Проект не найден", content = @Content)
    })
    @GetMapping("/{id}")
    ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id);

    @Operation(summary = "Обновление проекта", description = "Обновляет существующий проект по его ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Проект успешно обновлен",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class))),
            @ApiResponse(responseCode = "404", description = "Проект не найден", content = @Content)
    })
    @PutMapping("/{id}")
    ResponseEntity<ProjectDto> updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto);

    @Operation(summary = "Удаление проекта", description = "Удаляет проект по его ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Проект успешно удален"),
            @ApiResponse(responseCode = "404", description = "Проект не найден", content = @Content)
    })
    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteProject(@PathVariable Long id);
}

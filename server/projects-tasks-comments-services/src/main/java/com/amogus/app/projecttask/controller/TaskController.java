package com.amogus.app.projecttask.controller;

import com.amogus.app.projecttask.api.TaskApi;
import com.amogus.app.projecttask.dto.PaginatedTasksDto;
import com.amogus.app.projecttask.dto.TaskDto;
import com.amogus.app.projecttask.dto.TaskStatusResponseDto;
import com.amogus.app.projecttask.entity.Task;
import com.amogus.app.projecttask.service.TaskService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TaskController implements TaskApi {

    private final TaskService taskService;

    @Override
    public ResponseEntity<TaskDto> createTask(TaskDto taskDto) {
        return ResponseEntity.ok(taskService.createTask(taskDto));
    }

    @Override
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @Override
    public ResponseEntity<PaginatedTasksDto> getTasksByProjectId(Long projectId, int page, int size) {
        PaginatedTasksDto paginatedTasks = taskService.getTasksByProjectId(projectId, page, size);
        return ResponseEntity.ok(paginatedTasks);
    }

    @Override
    public ResponseEntity<TaskDto> getTaskById(Long id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<TaskStatusResponseDto> getTasksByStatus(@PathVariable Long projectId) {
        TaskStatusResponseDto taskStatusResponse = taskService.getTasksGroupedByStatus(projectId);
        return ResponseEntity.ok(taskStatusResponse);
    }


    @Override
    public ResponseEntity<TaskDto> updateTask(Long id, TaskDto taskDto) {
        return ResponseEntity.ok(taskService.updateTask(id, taskDto));
    }

    @Override
    public ResponseEntity<Void> deleteTask(Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}

package com.amogus.app.projecttask.service;

import com.amogus.app.projecttask.dto.PaginatedTasksDto;
import com.amogus.app.projecttask.dto.TaskDto;
import com.amogus.app.projecttask.entity.Task;
import java.util.List;
import java.util.Optional;

public interface TaskService {

    TaskDto createTask(TaskDto taskDto);

    List<Task> getAllTasks();

    PaginatedTasksDto getTasksByProjectId(Long projectId, int page, int size);

    Optional<TaskDto> getTaskById(Long id);

    TaskDto updateTask(Long id, TaskDto taskDto);

    void deleteTask(Long id);
}

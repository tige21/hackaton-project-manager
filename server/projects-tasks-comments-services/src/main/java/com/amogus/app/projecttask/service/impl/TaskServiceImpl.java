package com.amogus.app.projecttask.service.impl;

import com.amogus.app.projecttask.dto.PaginatedTasksDto;
import com.amogus.app.projecttask.dto.TaskDto;
import com.amogus.app.projecttask.dto.TaskStatusResponseDto;
import com.amogus.app.projecttask.entity.Project;
import com.amogus.app.projecttask.entity.Task;
import com.amogus.app.projecttask.exception.ProjectNotFoundException;
import com.amogus.app.projecttask.exception.TaskNotFoundException;
import com.amogus.app.projecttask.mapper.TaskMapper;
import com.amogus.app.projecttask.repository.ProjectRepository;
import com.amogus.app.projecttask.repository.TaskRepository;
import com.amogus.app.projecttask.service.TaskService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        log.info("Создание новой задачи: {}", taskDto.getName());
        Project project = projectRepository.findById(taskDto.getProjectId())
                .orElseThrow(() -> new ProjectNotFoundException("Проект с id: " + taskDto.getProjectId() + " не найден"));
        Task task = taskMapper.toEntity(taskDto);
        task.setProject(project);
        task.setCreatedDate(LocalDateTime.now());
        Task savedTask = taskRepository.save(task);
        log.info("Задача успешно создана: {}", savedTask.getId());
        return taskMapper.toDto(savedTask);
    }


    @Override
    public List<Task> getAllTasks() {
        log.info("Получение всех задач");
        return taskRepository.findAll();
    }

    @Override
    public PaginatedTasksDto getTasksByProjectId(Long projectId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<Task> taskPage = taskRepository.findByProjectId(projectId, pageRequest);

        PaginatedTasksDto paginatedTasksDto = new PaginatedTasksDto();
        paginatedTasksDto.setTasks(taskPage.getContent().stream()
                .map(taskMapper::toDto)
                .toList());
        paginatedTasksDto.setCurrentPage(taskPage.getNumber() + 1);
        paginatedTasksDto.setTotalPages(taskPage.getTotalPages());
        paginatedTasksDto.setTotalElements(taskPage.getTotalElements());

        return paginatedTasksDto;
    }

    @Override
    public TaskStatusResponseDto getTasksGroupedByStatus(Long projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);

        TaskStatusResponseDto response = new TaskStatusResponseDto();

        tasks.forEach(task -> {
            Long taskId = task.getId();
            switch (task.getStatus()) {
                case OPEN -> response.getBacklog().add(taskId);
                case IN_PROGRESS -> response.getInProgress().add(taskId);
                case REVIEW -> response.getReview().add(taskId);
                case TESTING -> response.getTesting().add(taskId);
                case READY -> response.getReady().add(taskId);
            }
        });

        return response;
    }


    @Override
    public Optional<TaskDto> getTaskById(Long id) {
        log.info("Получение задачи по ID: {}", id);
        Optional<Task> taskOpt = taskRepository.findById(id);
        if (taskOpt.isPresent()) {
            log.info("Задача с ID {} найдена", id);
            return taskOpt.map(taskMapper::toDto);
        } else {
            log.error("Задача с ID {} не найдена", id);
            throw new TaskNotFoundException("Задача с id: " + id + " не найдена");
        }
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        log.info("Обновление задачи с ID: {}", id);
        Optional<Task> taskOpt = taskRepository.findById(id);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            task.setName(taskDto.getName());
            task.setDescription(taskDto.getDescription());
            task.setType(taskDto.getType());
            task.setStatus(taskDto.getStatus());
            task.setPriority(taskDto.getPriority());
            task.setEndDate(taskDto.getEndDate());
            task.setUpdatedDate(LocalDateTime.now());
            Task updatedTask = taskRepository.save(task);
            log.info("Задача с ID {} успешно обновлена", id);
            return taskMapper.toDto(updatedTask);
        } else {
            log.error("Задача с ID {} не найдена для обновления", id);
            throw new TaskNotFoundException("Задача с id: " + id + " не найдена");
        }
    }

    @Override
    public void deleteTask(Long id) {
        log.info("Удаление задачи с ID: {}", id);
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            log.info("Задача с ID {} успешно удалена", id);
        } else {
            log.error("Задача с ID {} не найдена для удаления", id);
            throw new TaskNotFoundException("Задача с id: " + id + " не найдена для удаления");
        }
    }
}

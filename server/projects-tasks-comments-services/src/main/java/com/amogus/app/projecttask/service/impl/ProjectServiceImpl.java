package com.amogus.app.projecttask.service.impl;

import com.amogus.app.projecttask.dto.ProjectDto;
import com.amogus.app.projecttask.entity.Project;
import com.amogus.app.projecttask.exception.ProjectNotFoundException;
import com.amogus.app.projecttask.mapper.ProjectMapper;
import com.amogus.app.projecttask.repository.ProjectRepository;
import com.amogus.app.projecttask.service.ProjectService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        log.info("Создание нового проекта: {}", projectDto.getName());
        Project project = projectMapper.toEntity(projectDto);
        project.setCreatedDate(LocalDateTime.now());
        Project savedProject = projectRepository.save(project);
        log.info("Проект успешно создан: {}", savedProject.getId());
        return projectMapper.toDto(savedProject);
    }

    @Override
    public List<Project> getAllProjects() {
        log.info("Получение всех проектов");
        return projectRepository.findAll();
    }

    @Override
    public Optional<ProjectDto> getProjectById(Long id) {
        log.info("Получение проекта по ID: {}", id);
        Optional<Project> projectOpt = projectRepository.findById(id);
        if (projectOpt.isPresent()) {
            log.info("Проект с ID {} найден", id);
            return projectOpt.map(projectMapper::toDto);
        } else {
            log.error("Проект с ID {} не найден", id);
            throw new ProjectNotFoundException("Проект с id: " + id + " не найден");
        }
    }

    @Override
    public ProjectDto updateProject(Long id, ProjectDto projectDto) {
        log.info("Обновление проекта с ID: {}", id);
        Optional<Project> projectOpt = projectRepository.findById(id);
        if (projectOpt.isPresent()) {
            Project project = projectOpt.get();
            project.setName(projectDto.getName());
            project.setDescription(projectDto.getDescription());
            project.setStartDate(projectDto.getStartDate());
            project.setEndDate(projectDto.getEndDate());
            project.setUpdatedDate(LocalDateTime.now());
            Project updatedProject = projectRepository.save(project);
            log.info("Проект с ID {} успешно обновлен", id);
            return projectMapper.toDto(updatedProject);
        } else {
            log.error("Проект с ID {} не найден для обновления", id);
            throw new ProjectNotFoundException("Проект с id: " + id + " не найден");
        }
    }

    @Override
    public void deleteProject(Long id) {
        log.info("Удаление проекта с ID: {}", id);
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            log.info("Проект с ID {} успешно удален", id);
        } else {
            log.error("Проект с ID {} не найден для удаления", id);
            throw new ProjectNotFoundException("Проект с id: " + id + " не найден для удаления");
        }
    }

}

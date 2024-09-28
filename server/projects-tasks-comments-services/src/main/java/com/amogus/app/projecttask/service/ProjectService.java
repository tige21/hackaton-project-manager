package com.amogus.app.projecttask.service;

import com.amogus.app.projecttask.dto.ProjectDto;
import com.amogus.app.projecttask.entity.Project;
import java.util.List;
import java.util.Optional;

public interface ProjectService {
    ProjectDto createProject(ProjectDto projectDto);
    List<Project> getAllProjects();
    Optional<ProjectDto> getProjectById(Long id);
    ProjectDto updateProject(Long id, ProjectDto projectDto);
    void deleteProject(Long id);
}

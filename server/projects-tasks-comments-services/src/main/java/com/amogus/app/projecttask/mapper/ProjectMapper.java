package com.amogus.app.projecttask.mapper;

import com.amogus.app.projecttask.dto.ProjectDto;
import com.amogus.app.projecttask.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProjectMapper {


    @Mapping(target = "id", ignore = true)
    Project toEntity(ProjectDto projectDto);


    ProjectDto toDto(Project project);
}

package com.amogus.app.projecttask.mapper;

import com.amogus.app.projecttask.dto.TaskDto;
import com.amogus.app.projecttask.entity.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    TaskDto toDto(Task task);

    Task toEntity(TaskDto taskDto);
}

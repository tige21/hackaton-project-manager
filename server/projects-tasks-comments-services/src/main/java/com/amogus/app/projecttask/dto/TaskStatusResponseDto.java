package com.amogus.app.projecttask.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatusResponseDto {

    private List<TaskDto> backlog = new ArrayList<>();
    private List<TaskDto> inProgress = new ArrayList<>();
    private List<TaskDto> review = new ArrayList<>();
    private List<TaskDto> testing = new ArrayList<>();
    private List<TaskDto> ready = new ArrayList<>();
}

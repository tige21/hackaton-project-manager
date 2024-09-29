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

    private List<Long> backlog = new ArrayList<>();
    private List<Long> inProgress = new ArrayList<>();
    private List<Long> review = new ArrayList<>();
    private List<Long> testing = new ArrayList<>();
    private List<Long> ready = new ArrayList<>();
}

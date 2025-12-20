package com.example.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProgressResponse {
    private Long projectId;
    private String projectTitle;
    private int totalTasks;
    private int completedTasks;
    private double progressPercentage;
}
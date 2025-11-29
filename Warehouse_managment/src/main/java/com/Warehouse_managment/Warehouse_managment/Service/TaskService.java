package com.Warehouse_managment.Warehouse_managment.Service;

import com.Warehouse_managment.Warehouse_managment.Dtos.Response;

public interface TaskService {
    Response getAllTasks();

    Response getTaskById(Long id);

    Response deleteTask(Long id);

    Response createTask(Long userId, String title, String description);

    Response updateTaskStatus(Long taskId, boolean status);
}

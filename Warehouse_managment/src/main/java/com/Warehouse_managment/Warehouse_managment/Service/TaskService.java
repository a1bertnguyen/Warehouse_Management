package com.Warehouse_managment.Warehouse_managment.Service;

import com.Warehouse_managment.Warehouse_managment.Dtos.Response;
import com.Warehouse_managment.Warehouse_managment.Dtos.TaskDTO;

public interface TaskService {
    Response getAllTasks();

    Response getTaskById(Long id);

    Response deleteTask(Long id);

    Response saveTask(TaskDTO taskDTO);

    Response searchTaskByProductName(String input);

    Response assignNewRandomTaskToRandomManager();

    Response updateTask(TaskDTO taskDTO);

    Response getAllUserTasks(Long userId);

    Response updateTaskStatus(Long taskId, String status);
}

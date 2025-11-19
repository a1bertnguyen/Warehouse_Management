package com.Warehouse_managment.Warehouse_managment.Service;


import com.Warehouse_managment.Warehouse_managment.Model.User;
import com.Warehouse_managment.Warehouse_managment.Response.LoginRequest;
import com.Warehouse_managment.Warehouse_managment.Response.RegisterRequest;
import com.Warehouse_managment.Warehouse_managment.Response.Response;
import com.Warehouse_managment.Warehouse_managment.Response.UserDTO;

public interface UserService {
    Response registerUser(RegisterRequest registerRequest);

    Response loginUser(LoginRequest loginRequest);

    Response getAllUsers();

    User getCurrentLoggedInUser();

    Response getUserById(Long id);

    Response updateUser(Long id, UserDTO userDTO);

    Response deleteUser(Long id);

    Response getUserTransactions(Long id);
}

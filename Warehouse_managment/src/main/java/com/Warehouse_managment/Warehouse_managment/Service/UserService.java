package com.Warehouse_managment.Warehouse_managment.Service;

import com.Warehouse_managment.Warehouse_managment.Dtos.UserDTO;
import com.Warehouse_managment.Warehouse_managment.Model.User;
import com.Warehouse_managment.Warehouse_managment.Response.Response;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserService  {
    public User getUserProfile (String jwt) throws ChangeSetPersister.NotFoundException;

    public List<User> getAllUsers();

    User getCurrentLoggedInUser();

    Response getUserById(Long id);


    Response updateUser(Long id, UserDTO userDTO);

    Response deleteUser(Long id);

    Response getUserTransactions(Long id);
}

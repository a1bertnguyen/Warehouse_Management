package com.Warehouse_managment.Warehouse_managment.Service;

import com.Warehouse_managment.Warehouse_managment.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserService  {
    public User getUserProfile (String jwt);

    public List<User> getAllUsers();
}

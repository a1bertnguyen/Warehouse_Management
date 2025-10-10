package com.Warehouse_managment.Warehouse_managment.Service;

import com.Warehouse_managment.Warehouse_managment.Model.User;

public interface UserService {
    public String signUpUser(User user) ;
    public int enableUser(String email);
}

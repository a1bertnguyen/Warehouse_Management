package com.Warehouse_managment.Warehouse_managment.Service;


import com.Warehouse_managment.Warehouse_managment.Config.JwtProvider;
import com.Warehouse_managment.Warehouse_managment.Model.User;

import com.Warehouse_managment.Warehouse_managment.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserProfile(String jwt){
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        return userRepository.findByEmail(email);
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}


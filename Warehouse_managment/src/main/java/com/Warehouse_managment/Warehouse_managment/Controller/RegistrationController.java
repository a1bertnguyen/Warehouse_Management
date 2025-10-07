package com.Warehouse_managment.Warehouse_managment.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/api/v1/registration")
public class RegistrationController {
    @PostMapping
    public String registration(){
        return "registration";
    }

    @GetMapping
    public String verifyEmail(){
        return "verifyEmail";
    }


}

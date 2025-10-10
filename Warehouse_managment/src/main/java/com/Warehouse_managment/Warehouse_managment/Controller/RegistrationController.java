package com.Warehouse_managment.Warehouse_managment.Controller;


import com.Warehouse_managment.Warehouse_managment.Model.RegistrationRequest;
import com.Warehouse_managment.Warehouse_managment.Service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/v1/registration")
@AllArgsConstructor
@ResponseStatus(HttpStatus.OK)
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request) {
        try {
            String token = registrationService.registerUser(request);
            return ResponseEntity.ok(Map.of(
                "message", "Registration successful. Please check your email to confirm.",
                "token", token
            ));
        } catch (IllegalArgumentException e) {
            // Invalid email format
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));
        } catch (IllegalStateException e) {
            // Email already taken (and verified)
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                "error", e.getMessage()
            ));
        } catch (Exception e) {
            // Any other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", "An unexpected error occurred during registration"
            ));
        }
    }

    @GetMapping(path = "confirm")
    public String confirmToken(@RequestParam("token") String token){
        return registrationService.confirmToken(token);
    }
    //Path = localhost:8080/api/v1/registration/confirm?token=[your token]


}

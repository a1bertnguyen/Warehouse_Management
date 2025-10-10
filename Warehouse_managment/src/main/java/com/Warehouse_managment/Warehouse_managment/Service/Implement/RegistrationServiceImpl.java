package com.Warehouse_managment.Warehouse_managment.Service.Implement;

import com.Warehouse_managment.Warehouse_managment.Model.ConfirmationToken;
import com.Warehouse_managment.Warehouse_managment.Model.RegistrationRequest;
import com.Warehouse_managment.Warehouse_managment.Model.User;
import com.Warehouse_managment.Warehouse_managment.Model.UserRole;
import com.Warehouse_managment.Warehouse_managment.Service.ConfirmationTokenService;
import com.Warehouse_managment.Warehouse_managment.Utils.EmailValidator;
import com.Warehouse_managment.Warehouse_managment.Service.RegistrationService;
import com.Warehouse_managment.Warehouse_managment.Service.UserService;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {


    private final UserService userService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public String registerUser(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if (!isValidEmail){
            throw new IllegalArgumentException("Invalid email");
        }
        return userService.signUpUser(
                new User(
                        request.getEmail(),
                        request.getPassword(),
                        request.getFullName(),
                        request.getRole()
                )
        ) ;
    }



    @Override
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        userService.enableUser(
                confirmationToken.getUser().getEmail());
        return "confirmed";
    }



}

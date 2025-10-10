package com.Warehouse_managment.Warehouse_managment.Service.Implement;

import com.Warehouse_managment.Warehouse_managment.Model.ConfirmationToken;
import com.Warehouse_managment.Warehouse_managment.Model.User;
import com.Warehouse_managment.Warehouse_managment.Repository.UserRepository;
import com.Warehouse_managment.Warehouse_managment.Service.ConfirmationTokenService;
import com.Warehouse_managment.Warehouse_managment.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final String USER_NOT_FOUND = "User with email %s not found";
    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${token.expire.time}")
    private int tokenExpireTime;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException(
                String.format(USER_NOT_FOUND, email)
        ));
    }

    @Override
    public String signUpUser(User user) {
        boolean userExists = userRepository
                .findByEmail(user.getEmail())
                .isPresent();
        if (userExists) {
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.

            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(user.getPassword());

        user.setPassword(encodedPassword);

        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(tokenExpireTime),
                user
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

//        TODO: SEND EMAIL GONNA DO IT VERY SOON

        return token;
    }

    @Override
    public int enableUser(String email) {
        return userRepository.enableUser(email);
    }

}

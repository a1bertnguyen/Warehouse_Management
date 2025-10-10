package com.Warehouse_managment.Warehouse_managment.Model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private  final String email;
    private  final String password;
    private  final String fullName;
    private  final UserRole role;
}

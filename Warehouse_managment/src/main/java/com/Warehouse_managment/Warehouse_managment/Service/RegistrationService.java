package com.Warehouse_managment.Warehouse_managment.Service;

import com.Warehouse_managment.Warehouse_managment.Model.RegistrationRequest;

public interface RegistrationService {
    public String registerUser(RegistrationRequest request);

    public String confirmToken(String email);


}

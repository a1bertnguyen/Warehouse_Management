package com.Warehouse_managment.Warehouse_managment.Service;


import com.Warehouse_managment.Warehouse_managment.Model.ConfirmationToken;

import java.util.Optional;

public interface ConfirmationTokenService {
     void saveConfirmationToken(ConfirmationToken token);
     Optional<ConfirmationToken> getToken(String token);
     int setConfirmedAt(String token);

}

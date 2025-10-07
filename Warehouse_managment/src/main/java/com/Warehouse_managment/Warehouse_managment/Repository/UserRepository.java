package com.Warehouse_managment.Warehouse_managment.Repository;

import com.Warehouse_managment.Warehouse_managment.Model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository <User,Long>{
    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.enabled = true where u.email = ?1")
    int verifyEmail(String email);
}

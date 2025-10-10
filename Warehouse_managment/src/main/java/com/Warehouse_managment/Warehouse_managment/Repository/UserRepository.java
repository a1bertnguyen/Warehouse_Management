package com.Warehouse_managment.Warehouse_managment.Repository;

import com.Warehouse_managment.Warehouse_managment.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly= true)
public interface UserRepository extends JpaRepository <User,Long>{
    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.enabled = true where u.email = ?1")
    int enableUser(String email);
}

package com.Warehouse_managment.Warehouse_managment.Repository;
import com.Warehouse_managment.Warehouse_managment.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingOrDescriptionContaining(String name, String description);
}


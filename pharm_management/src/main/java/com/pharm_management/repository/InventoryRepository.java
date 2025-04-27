package com.pharm_management.repository;

import com.pharm_management.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Inventory findByName(String name);
}

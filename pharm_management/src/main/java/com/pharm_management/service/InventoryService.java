package com.pharm_management.service;


import com.pharm_management.model.Inventory;
import com.pharm_management.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository repository;

    public InventoryService(InventoryRepository repository) {
        this.repository = repository;
    }

    public List<Inventory> getAllInventory() {
        return repository.findAll();
    }

    public Inventory addMedication(Inventory inventory) {
        return repository.save(inventory);
    }

    public void deleteMedication(Long id) {
        repository.deleteById(id);
    }
}

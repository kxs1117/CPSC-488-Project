package com.pharm_management.controller;

import com.pharm_management.model.Inventory;
import com.pharm_management.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    // GET all medications
    @GetMapping("/all")
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    // POST new medication
    @PostMapping("/add")
    public Inventory addInventory(@RequestBody Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // PUT update existing medication
    @PutMapping("/update/{id}")
    public Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory updatedInventory) {
        Optional<Inventory> optionalInventory = inventoryRepository.findById(id);

        if (optionalInventory.isPresent()) {
            Inventory inventory = optionalInventory.get();
            inventory.setName(updatedInventory.getName());
            inventory.setType(updatedInventory.getType());
            inventory.setBrand(updatedInventory.getBrand());
            inventory.setMedForm(updatedInventory.getMedForm());
            inventory.setDose(updatedInventory.getDose());
            inventory.setExpirationDate(updatedInventory.getExpirationDate());
            inventory.setDateAdded(updatedInventory.getDateAdded());
            inventory.setStock(updatedInventory.getStock());
            inventory.setCostPerPill(updatedInventory.getCostPerPill());
            return inventoryRepository.save(inventory);
        } else {
            throw new RuntimeException("Medication not found with id " + id);
        }
    }

    // DELETE medication
    @DeleteMapping("/delete/{id}")
    public void deleteInventory(@PathVariable Long id) {
        inventoryRepository.deleteById(id);
    }
}

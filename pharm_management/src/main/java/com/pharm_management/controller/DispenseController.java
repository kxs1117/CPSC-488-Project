package com.pharm_management.controller;

import com.pharm_management.fraud.*;
import com.pharm_management.model.Inventory;
import com.pharm_management.repository.InventoryRepository;
import com.pharm_management.service.DispenseService;
import com.pharm_management.dto.DispenseRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dispense")
public class DispenseController {

    @Autowired
    private DispenseService dispenseService;

    @Autowired
    private InventoryRepository inventoryRepository;  // <-- ADD THIS

    @PostMapping("/evaluateFraud")
    public ResponseEntity<FraudResult> evaluateFraud(@RequestBody DispenseRequestDTO request) {
        FraudResult result = dispenseService.evaluateDispenseRequest(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/dispenseMedication")
    public ResponseEntity<String> dispenseMedication(@RequestBody DispenseRequestDTO request) {
        boolean success = dispenseService.dispenseMedication(request);
        if (success) {
            return ResponseEntity.ok("Medication dispensed successfully.");
        } else {
            return ResponseEntity.badRequest().body("Dispense failed: insufficient stock or medication not found.");
        }
    }

    @PostMapping("/subtractStock")
    public ResponseEntity<String> subtractStock(@RequestBody DispenseRequestDTO request) {
        Inventory inventory = inventoryRepository.findByName(request.getMedicationName());
        if (inventory == null) {
            return ResponseEntity.badRequest().body("Medication not found");
        }

        if (inventory.getStock() < request.getQuantity()) {
            return ResponseEntity.badRequest().body("Not enough stock available");
        }

        inventory.setStock(inventory.getStock() - request.getQuantity());
        inventoryRepository.save(inventory);
        return ResponseEntity.ok("Stock updated successfully");
    }
}

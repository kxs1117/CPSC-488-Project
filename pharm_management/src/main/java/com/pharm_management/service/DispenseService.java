package com.pharm_management.service;

import com.pharm_management.dto.DispenseRequestDTO;
import com.pharm_management.fraud.*;
import com.pharm_management.model.Inventory;
import com.pharm_management.model.User;
import com.pharm_management.repository.InventoryRepository;
import com.pharm_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DispenseService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public FraudResult evaluateDispenseRequest(DispenseRequestDTO request) {
        User customer = userRepository.findByUsername(request.getCustomerEmail());
        Object medication = new Object();
        LocalDate lastDispenseDate = LocalDate.now().minusDays(3);

        DispenseContext context = new DispenseContext();
        context.customer = customer;
        context.medication = medication;
        context.quantity = request.getQuantity();
        context.dispenseDate = LocalDate.now();
        context.lastDispenseDate = request.getLastDispensed();

        FraudDetectionService service = new FraudDetectionService();
        return service.evaluate(context);
    }

    public boolean dispenseMedication(DispenseRequestDTO request) {
        Inventory inventory = inventoryRepository.findByName(request.getMedicationName());
        if (inventory == null || inventory.getStock() < request.getQuantity()) {
            return false;
        }
        inventory.setStock(inventory.getStock() - request.getQuantity());
        inventoryRepository.save(inventory);
        return true;
    }
}

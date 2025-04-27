package com.pharm_management.dto;

import java.time.LocalDate;

public class DispenseRequestDTO {
    private String customerEmail;
    private Long medicationId;
    private int quantity;
    private LocalDate lastDispensed;
    private String medicationName;

    public String getMedicationName() {
        return medicationName;
    }
    
    public void setMedicationName(String medicationName) {
        this.medicationName = medicationName;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public Long getMedicationId() {
        return medicationId;
    }

    public void setMedicationId(Long medicationId) {
        this.medicationId = medicationId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getLastDispensed() {
        return lastDispensed;
    }
    
    public void setLastDispensed(LocalDate lastDispensed) {
        this.lastDispensed = lastDispensed;
    }
}


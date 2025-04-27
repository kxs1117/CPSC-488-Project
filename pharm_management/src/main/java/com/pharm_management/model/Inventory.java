package com.pharm_management.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String brand;
    private String medForm;
    private String dose;
    private LocalDate expirationDate;
    private LocalDate dateAdded;
    private Integer stock;
    private Double costPerPill;

    // Getters and Setters for all fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getMedForm() { return medForm; }
    public void setMedForm(String medForm) { this.medForm = medForm; }

    public String getDose() { return dose; }
    public void setDose(String dose) { this.dose = dose; }

    public LocalDate getExpirationDate() { return expirationDate; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }

    public LocalDate getDateAdded() { return dateAdded; }
    public void setDateAdded(LocalDate dateAdded) { this.dateAdded = dateAdded; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Double getCostPerPill() { return costPerPill; }
    public void setCostPerPill(Double costPerPill) { this.costPerPill = costPerPill; }
}

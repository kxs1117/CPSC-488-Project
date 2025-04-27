package com.pharm_management.fraud;

import java.time.LocalDate;

public class DispenseContext {
    public Object customer;
    public Object medication;
    public int quantity;
    public LocalDate dispenseDate;
    public LocalDate lastDispenseDate;
}

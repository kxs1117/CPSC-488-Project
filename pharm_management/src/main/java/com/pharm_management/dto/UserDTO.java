package com.pharm_management.dto;

import java.time.LocalDate;

public class UserDTO {
    

    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private LocalDate creationDate;
    private LocalDate dateOfBirth;
    private long id;
    private String phoneNumber;
    private String address;
    private String password;
    private String passwordNew;
    
    public UserDTO() {}
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {      
        this.email = email;
    } 
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    } 
     
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getRole() {                   
        return role;
    }
    
    public void setRole(String role) {          
        this.role = role;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {      
        this.phoneNumber = phoneNumber;
    } 

    public void setAddress(String address) {      
        this.address = address;
    } 
    
    public String getAddress() {
        return address;
    }

    public void setPassword(String password) {
        this.password = password;
    } 
     
    public String getpassword() {
        return password;
    }

    public void setNewPassword(String passwordNew) {
        this.passwordNew = passwordNew;
    } 
     
    public String getNewPassword() {
        return passwordNew;
    }

}



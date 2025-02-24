package com.pharm_management.dto;

public class CreateUserDTO {
    private String email;
    private String password;
    private String role;
    private String firstName;  
    private String lastName;

    // Default constructor
    public CreateUserDTO() {
    }

    // All-args constructor
    public CreateUserDTO(String email, String password, String role, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
}


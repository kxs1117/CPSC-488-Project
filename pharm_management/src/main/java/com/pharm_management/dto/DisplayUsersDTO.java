package com.pharm_management.dto;

public class DisplayUsersDTO {
    private int id;
    private String username;
    private String firstName;
    private String lastName;
    private String roleType; 

    
    public DisplayUsersDTO() {
    }

    
    public DisplayUsersDTO(int id, String username, String firstName, String lastName, String roleType) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleType = roleType;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
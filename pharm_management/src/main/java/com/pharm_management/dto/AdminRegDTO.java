package com.pharm_management.dto;

public class AdminRegDTO {
    
    private String email;
    private String firstName;
    private String lastName;
    private String password;

    //Standard getters and setters. Leave all intact in case of future code refactoring in the layers.
    public String getEmail()   
    {
        return email;
    }
  
    public void setEmail(String email) 
    {
        this.email = email;
    }

    public String getFirstName() 
    {
        return firstName;
    }

    public void setFirstName(String firstName) 
    {
        this.firstName = firstName;
    }

    public String getLastName() 
    {
        return lastName;
    }

    public void setLastName(String lastName) 
    {
        this.lastName = lastName;
    }

    public String getPassword()    
    {
        return password;
    }

    public void setPassword(String password) 
    {
        this.password = password;
    }
}

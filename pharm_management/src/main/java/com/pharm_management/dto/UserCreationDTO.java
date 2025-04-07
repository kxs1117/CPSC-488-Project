package com.pharm_management.dto;
import java.time.LocalDate;

public class UserCreationDTO {
    
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String password;
    private LocalDate creationDate;

    public UserCreationDTO() {}
    
    //Standard setters and getters.
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
    
    public String getRole() 
    {
        return role;
    }
    
    public void setRole(String role) 
    {
        this.role = role;
    }
    
    public String getPassword() 
    {
        return password;
    }
    
    public void setPassword(String password) 
    {
        this.password = password;
    }

    public LocalDate getCreationDate()
    {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate)
    {
        this.creationDate = creationDate;
    }
}

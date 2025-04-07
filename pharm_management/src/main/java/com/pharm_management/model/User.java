package com.pharm_management.model;

import java.time.LocalDate;
import jakarta.persistence.*;
@Entity
@Table(name = "Users")
public class User {
    
    //Automatically generate the ID for user when created.
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

    //Every user email in system must be unique
    //nullable = false not really necessary since HTML inputs have required attribute but just leave in case.
    @Column(nullable = false, unique = true)
	private String email; 

    @Column(nullable = false)
	private String password;
 
    @Column(nullable = false)
	private String firstName;

	@Column (nullable = false)
	private String lastName;

    @Column (nullable = false)
	private String role;
 
    @Column(name = "date_created", nullable = false)
    private LocalDate creationDate;

    @Column
    private LocalDate dateOfBirth;

    @Column
    private String phoneNumber;

    @Column
    private String address;

    @Column                     
    private String licence;

    public User(String email, String password, String firstName, String lastName, String role, LocalDate creationDate )
    {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.creationDate = creationDate;
    }

    public User() {}

    //Setters and getters
    public long getId() 
    {
        return id;
    }

    public void setId(long id) 
    {
        this.id = id;
    }

    public String getEmail() 
    {
        return email;
    }
    
    public void setEmail(String email) 
    {
        this.email = email;
    }

    public String getPassword() 
    {
        return password;
    }
    
    public void setPassword(String password) 
    {
        this.password = password;
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

    public LocalDate getDateOfBirth() 
    {
        return dateOfBirth;
    }
    
    public void setDateOfBirth(LocalDate dateOfBirth) 
    {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() 
    {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) 
    {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() 
    {
        return address;
    }
    
    public void setAddress(String address) 
    {
        this.address = address;
    }

    public String getLicence() 
    {
        return licence;
    }
    
    public void setLicence(String licence) 
    {
        this.licence = licence;
    }

    public void setCreationDate(LocalDate creationDate) 
    {
        this.creationDate = creationDate;
    }

    public LocalDate getCreationDate() 
    {
        return creationDate;
    }
}






























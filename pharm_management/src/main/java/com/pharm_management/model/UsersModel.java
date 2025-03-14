package com.pharm_management.model;

import java.io.Serializable;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;


@Entity
@Table(name = "users")
public class UsersModel implements Serializable {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String firstName;

	@Column(nullable = false)
	private String lastName;
	
	@Column(nullable = false)
    private String role;

    @CreationTimestamp
    @Column(name = "Date_created", nullable = false, updatable = false) //Might not need updatable field
    private LocalDate creationDate;

    @Column
    private LocalDate dateOfBirth;

    @Column
    private String phoneNumber;

    @Column
    private String address;

    @Column(name = "Pharmacist_license")
    private String license;

    public UsersModel() {}

    public UsersModel(String email, String password, String firstName, String lastName, String role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public LocalDate getCreationDate() {
        return creationDate;
    }
 
    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
 
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
 
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
 
    public String getPhoneNumber() {
        return phoneNumber;
    }
 
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
 
    public String getAddress() {
        return address;
    }
 
    public void setAddress(String address) {
        this.address = address;
    }
 
    public String getLicense() {
        return license;
    }
 
    public void setLicense(String license) {
        this.license = license;
    }


}





	
	//@Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT TRUE", nullable = false)
    //private Boolean isActive;






















































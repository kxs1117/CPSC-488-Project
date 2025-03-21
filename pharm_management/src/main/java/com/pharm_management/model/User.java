package com.pharm_management.model;


import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
    @Column(nullable = false, unique = true)
    private String username;
	
    @Column(nullable = false)
    private String password;
	
   
    @Column(nullable = false)
    private String firstName;
	
    @Column(nullable = false)
    private String lastName;
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
	
    
    public User() { }
	
    
    public User(String username, String password, String firstName, String lastName, Role role) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
	
    public int getId() {
        return id;
    }
	
    public String getUsername() {
        return username;
    }
	
    public void setUsername(String username) {
        this.username = username;
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
	
    public Role getRole() {
        return role;
    }
	
    public void setRole(Role role) {
        this.role = role;
    }
}

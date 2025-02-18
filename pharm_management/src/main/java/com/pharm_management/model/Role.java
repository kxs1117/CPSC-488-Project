package com.pharm_management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;  

    @Column(nullable = false, unique = true)
    private String roleType;

    public Role() {
    }

    public Role(String roleType) {
        this.roleType = roleType;
    }

    public int getId() {
        return id;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }
}
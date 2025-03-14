package com.pharm_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import com.pharm_management.model.UsersModel;

public interface UsersRepository extends JpaRepository<UsersModel, Long> {
    
    // Find a user by email
    @Query("SELECT u FROM UsersModel u WHERE u.email = ?1")
    UsersModel findByEmail(String email);
    
    // Check if a user exists by email
    boolean existsByEmail(String email);
    
    // Delete a user by email
    @Modifying
    @Transactional
    void deleteByEmail(String email);
    
    // Optional: Find all users by role (if needed)
    // List<UsersModel> findByRole(String role);
}
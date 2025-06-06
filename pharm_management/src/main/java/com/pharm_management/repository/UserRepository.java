package com.pharm_management.repository;

import com.pharm_management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);  

    
    User findByUsernameAndPassword(String username, String password);
}
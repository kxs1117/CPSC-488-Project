package com.pharm_management.repository;

import com.pharm_management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>
{
	User findByUsername(String username);
}	
package com.pharm_management.repository;

import com.pharm_management.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer>
{
	Role findByRoleType(String roleType);
}

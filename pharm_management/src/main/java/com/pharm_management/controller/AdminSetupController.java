package com.pharm_management.controller;

import com.pharm_management.dto.AdminSetupDTO;
import com.pharm_management.model.Role;
import com.pharm_management.model.User;
import com.pharm_management.repository.RoleRepository;
import com.pharm_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class AdminSetupController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    //Controller for initial setup admin, only runs once when program is launched for first time
    @PostMapping("/setup")
    public ResponseEntity<?> createAdmin(@RequestBody AdminSetupDTO request) {
        
    try {
        //Create admin role type.
        Role adminRole = new Role();
        adminRole.setRoleType("ADMIN");
        adminRole = roleRepository.save(adminRole);

        //Hash the user's password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(request.getPassword());
    
        //Create and set the admin users account
        User adminUser = new User();
        adminUser.setUsername(request.getEmail());
        adminUser.setPassword(encodedPassword);
        adminUser.setRole(adminRole);
        adminUser.setFirstName(request.getFirstName());
        adminUser.setLastName(request.getLastName());
        userRepository.save(adminUser);

        return ResponseEntity.ok("Admin account created successfully");

    } catch (Exception err){
        //Return error if issue occurs
        return ResponseEntity.internalServerError().body("Could not create admin account");
    }
    }
}
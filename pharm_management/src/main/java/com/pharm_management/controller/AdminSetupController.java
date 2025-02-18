package com.pharm_management.controller;

import com.pharm_management.dto.AdminSetupRequest;  
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

 
    @PostMapping("/setup")  
    public ResponseEntity<?> createAdmin(@RequestBody AdminSetupRequest request) {  
                                         
        Role adminRole = roleRepository.findByRoleType("ADMIN");   
        if (adminRole == null) {
            adminRole = new Role();   

            adminRole.setRoleType("ADMIN"); 
            adminRole = roleRepository.save(adminRole); 
        }

       
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(request.getPassword());

      
        User adminUser = new User();
        adminUser.setUsername(request.getEmail());
        adminUser.setPassword(encodedPassword);
        adminUser.setRole(adminRole);
       
        adminUser.setFirstName(request.getFirstName());
        adminUser.setLastName(request.getLastName());

        userRepository.save(adminUser);

                                                                            
        return ResponseEntity.ok("Admin account created successfully");    
    }
}


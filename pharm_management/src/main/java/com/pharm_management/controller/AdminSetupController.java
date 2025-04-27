package com.pharm_management.controller;

import com.pharm_management.model.Role;
import com.pharm_management.model.User;
import com.pharm_management.repository.RoleRepository;
import com.pharm_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminSetupController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/api/setup-admin")
    public ResponseEntity<String> createAdmin(@RequestBody AdminSetupRequest request) {
        Role adminRole = roleRepository.findByRoleType("admin");
        if (adminRole == null) {
            adminRole = new Role();
            adminRole.setRoleType("admin");
            roleRepository.save(adminRole);
        }

        User adminUser = new User();
        adminUser.setUsername(request.getUsername());
        adminUser.setPassword(request.getPassword());
        adminUser.setRole(adminRole);

        userRepository.save(adminUser);
        return ResponseEntity.ok("Admin account created.");
    }

    public static class AdminSetupRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public String getPassword() { return password; }

        public void setUsername(String username) { this.username = username; }
        public void setPassword(String password) { this.password = password; }
    }
}

package com.pharm_management.controller;

import com.pharm_management.model.Role;
import com.pharm_management.model.User;
import com.pharm_management.repository.RoleRepository;
import com.pharm_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserManagementController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // Create a new user
    @PostMapping("/create")
    public String createUser(@RequestBody UserForm form) {
        if (form.getUsername() == null || form.getPassword() == null || form.getRole() == null)
            return "Missing fields";

        if (userRepository.findByUsername(form.getUsername()) != null)
            return "User already exists";

        String normalizedRole = form.getRole().toLowerCase();
        Role role = roleRepository.findByRoleType(normalizedRole);
        if (role == null)
            return "Invalid role";

        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(form.getPassword());
        user.setRole(role);

        userRepository.save(user);
        return "success";
    }

    // Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Internal DTO class for receiving form data
    static class UserForm {
        private String username;
        private String password;
        private String role;

        public String getUsername() { return username; }
        public String getPassword() { return password; }
        public String getRole() { return role; }

        public void setUsername(String username) { this.username = username; }
        public void setPassword(String password) { this.password = password; }
        public void setRole(String role) { this.role = role; }
    }
}

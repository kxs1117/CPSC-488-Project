package com.pharm_management.controller;

import com.pharm_management.dto.DisplayUsersDTO;
import com.pharm_management.dto.CreateUserDTO;
import com.pharm_management.model.User;
import com.pharm_management.model.Role;
import com.pharm_management.repository.UserRepository;
import com.pharm_management.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/manageUsers")
public class UserManagementController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    //Fetches users from the database and for each user display the requested fields for the front end
    @GetMapping("/displayUsers")
    public List<DisplayUsersDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<DisplayUsersDTO> dtos = new ArrayList<>();
        for (User user : users) {
            dtos.add(new DisplayUsersDTO(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().getRoleType()
            ));
        }
        return dtos;
    }

    //Delete a user of the system via his/her ID. Return error if not found
    @DeleteMapping("/deleteUsers/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    //Add user to the system along with role. Hash password and set required fields and save user to db
    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody CreateUserDTO createUserDTO) {
        // Find or create the role
        Role role = roleRepository.findByRoleType(createUserDTO.getRole());
        if (role == null) {
            role = new Role();
            role.setRoleType(createUserDTO.getRole());
            role = roleRepository.save(role);
        }

       
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(createUserDTO.getPassword());

       
        User newUser = new User();
        newUser.setUsername(createUserDTO.getEmail());
        newUser.setPassword(encodedPassword);
        newUser.setRole(role);
        newUser.setFirstName(createUserDTO.getFirstName());
        newUser.setLastName(createUserDTO.getLastName());
      
        userRepository.save(newUser);
        return ResponseEntity.ok("User added successfully.");
    }
}

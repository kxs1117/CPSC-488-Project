package com.pharm_management.controller;

import com.pharm_management.model.User;
import com.pharm_management.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        HttpSession session) {

        User user = userRepository.findByUsernameAndPassword(username, password);

        if (user != null) {
            session.setAttribute("userId", user.getId());
            session.setAttribute("username", user.getUsername());
            session.setAttribute("userRole", user.getRole().getRoleType());
            return user.getRole().getRoleType(); // e.g., "admin"
        } else {
            return "invalid";
        }
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "logged_out";
    }

    @GetMapping("/session")
    public String checkSession(HttpSession session) {
        String role = (String) session.getAttribute("userRole");
        return (role != null) ? role : "none";
    }
}

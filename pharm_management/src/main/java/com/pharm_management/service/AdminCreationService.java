package com.pharm_management.service;                                               

import org.springframework.beans.factory.annotation.Autowired;                  
import org.springframework.stereotype.Service;                                  //Marks the class as a service.
import com.pharm_management.model.User;                                         
import com.pharm_management.repository.UserRepository;                         
import com.pharm_management.dto.AdminRegDTO;                                   
import org.springframework.security.crypto.password.PasswordEncoder;           
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;        //Securely hash passwords before storing them
import java.time.LocalDate;                                                     //Used to set the date the user was created.

@Service
public class AdminCreationService {
 
        @Autowired                                                                      //Finds userRepository and connects it to the class. Uses autowire because it is a Spring-managed component.
        private UserRepository userRepository;

        private PasswordEncoder encryptPassword = new BCryptPasswordEncoder();          //Creates a passsword encoder called 'PasswordEncoder' to encrypt given password.

        private LocalDate todaysDate = LocalDate.now();                                 //Used to create LocalDate object that sets the date that the user was created and is placed in the database.

        //Make sure the email contains a "@" along with proper domain. If not, throw error up to the controller.
        public void checkEmail(AdminRegDTO adminDto)                                
        {

                String  email = adminDto.getEmail();                                 

                String emailDomain = email.substring(email.length() - 3);               //Get the last 3 characters in the email.

                if (!email.contains("@"))                                             //If the email doesn't contain @ then throw error                                       
                {
                        throw new IllegalArgumentException("Email must contain the '@' symbol.");
                }
                else if (!(emailDomain.equals("com") || emailDomain.equals("net") || emailDomain.equals("org") ||    //If last three chars of email dont have valid email domain throw exception.
                emailDomain.equals("gov") || emailDomain.equals("edu"))) 
                {
                        throw new IllegalArgumentException("Email must end with a valid domain extension (com, net, org, gov, edu).");
                }
        }

        //Check that the password is 8 chars and has at least a digit. If not throw error up to controller.
        public void checkPassword(AdminRegDTO adminDto)                                                          
        {

                String password = adminDto.getPassword();                                                           
                boolean containsDigit = false;                                                                      //Used for finding if password has a digit

                if (password.length() < 8)                                             
                {
                        throw new IllegalArgumentException("Password must be at least 8 characters long.");
                }
                
                for (int i = 0; i < password.length(); i++) {                                                  
                       
                        if (Character.isDigit(password.charAt(i))) 
                        {
                                containsDigit = true;
                                break;
                        }
                }

                if (!containsDigit) 
                {
                        throw new IllegalArgumentException("Password must contain at least one digit.");
                }
        }

        //Encrypt the given password and instantiate the new admin user with attributes and save to DB. 
        public void adminCreation (AdminRegDTO adminDto)                                                                                        
        {
                String password = encryptPassword.encode(adminDto.getPassword());                                                                        

                User firstAdmin = new User(adminDto.getEmail(), password, adminDto.getFirstName(), adminDto.getLastName(), "Administrator", todaysDate);         

                userRepository.save(firstAdmin);     //Save the user to the database.
        }
}




















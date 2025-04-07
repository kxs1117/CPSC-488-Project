package com.pharm_management.service;

import org.springframework.beans.factory.annotation.Autowired;             
import org.springframework.stereotype.Service;                              
import com.pharm_management.model.User;                                   
import com.pharm_management.repository.UserRepository;                          
import com.pharm_management.dto.UserDTO;                             
import org.springframework.security.crypto.password.PasswordEncoder;            
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;  
import java.time.LocalDate;                                                    
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.dao.DuplicateKeyException;


@Service
public class UserProfileManageService {

    @Autowired
    private UserRepository userRepository;                                            
    private PasswordEncoder encryptPassword = new BCryptPasswordEncoder();              //NEED TO ENCCRYPT NEW PASSWORD

        public UserDTO getUserDetails() {                                     
                User user = userRepository.findFirstByOrderByIdAsc();
                UserDTO userDTO = new UserDTO();
                
                userDTO.setDateOfBirth(user.getDateOfBirth());
                userDTO.setPhoneNumber(user.getPhoneNumber());
                userDTO.setAddress(user.getAddress());
                return userDTO;       
            }
            

        public void checkPhoneNum(UserDTO userDTO)
        {
                String phoneNum = userDTO.getPhoneNumber(); 

                if (phoneNum.length() != 12) 
                {
                        throw new IllegalArgumentException("Provided phone number isn't 12 characters in length.");
                }
        
                for (int i = 0; i < phoneNum.length(); i++ )
                {
                        char character = phoneNum.charAt(i);

                        if (i == 3 || i == 7) 
                        {
                                if (character != '-') 
                                {
                                        throw new IllegalArgumentException("Phone number isn't correct format.");
                                }

                        } else {

                                if (!Character.isDigit(character)) 
                                {       
                                        throw new IllegalArgumentException("Phone number contains a letter.");
                                }
                        }
                }
        }
        
        public UserDTO updateUserInfo(UserDTO userDTO)
        {

                User user = userRepository.findFirstByOrderByIdAsc();

                if (!userDTO.getPhoneNumber().trim().isEmpty()) 
                {
                        user.setPhoneNumber(userDTO.getPhoneNumber());
                }
                    
                if (!userDTO.getAddress().trim().isEmpty()) 
                {
                        user.setAddress(userDTO.getAddress());
                }

                if (userDTO.getDateOfBirth() != null) 
                {
                        user.setDateOfBirth(userDTO.getDateOfBirth());
                }

                return userDTO;
        }
 
        public void checkPassword(UserDTO userDTO)
        {
                User user = userRepository.findFirstByOrderByIdAsc();

                if (userDTO.getpassword() != user.getPassword())
                {
                        throw new IllegalArgumentException("The current password you entered is not correct.");
                }
        }

        public void updatePassword(UserDTO userDTO)
        {
                User user = userRepository.findFirstByOrderByIdAsc();
                user.setPassword(userDTO.getpassword());
        }
}
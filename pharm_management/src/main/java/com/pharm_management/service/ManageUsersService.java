package com.pharm_management.service;

import org.springframework.beans.factory.annotation.Autowired;                  
import org.springframework.stereotype.Service;                             
import com.pharm_management.model.User;                                        
import com.pharm_management.repository.UserRepository;                      
import com.pharm_management.dto.UserCreationDTO;                               
import com.pharm_management.dto.UserDTO;                                       
import org.springframework.security.crypto.password.PasswordEncoder;            
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;        //Used to encrypt the user's password. 
import java.time.LocalDate;                                                     //Used to set the date the user was created.
import java.util.ArrayList;
import java.util.List;                                                         
import java.util.NoSuchElementException;
import org.springframework.dao.DuplicateKeyException;
 

@Service
public class ManageUsersService {

    @Autowired
    private UserRepository userRepository;                                          

    private PasswordEncoder encryptPassword = new BCryptPasswordEncoder();              //Creates a passsword encoder called 'PasswordEncoder' to encrypt given password.

    private LocalDate todaysDate = LocalDate.now();                                     //Used to create LocalDate object that sets the date that the user was created and is placed in the database
 
    //Ensure email doesn't already exist, has a '@', has correct domain. If not throw error.
    public void checkEmail(UserCreationDTO userDTO)                                                    
        {

            String email = userDTO.getEmail();                                                        

            String emailDomain = email.substring(email.length() - 3);                                   //Get the last 3 chars in the email for the domain.


            if (userRepository.existsByEmail(email))                                                    //Throw error if the email already exist in the system.
            {
                throw new DuplicateKeyException("The provided email already exist in the system!");
            }

            else if (!email.contains("@"))                                                            //Throw error is email doesnt have @
            {
                    throw new IllegalArgumentException("Email must contain the '@' symbol.");
            }

            else if (!(emailDomain.equals("com") || emailDomain.equals("net") || emailDomain.equals("org") ||   //Throw error if email doesn't have correct email domain.
                emailDomain.equals("gov") || emailDomain.equals("edu"))) 
            {
                    throw new IllegalArgumentException("Email must end with a valid domain extension (com, net, org, gov, edu, or mil).");
            }
        }

        //Check password is eight chars and has a digit. If not throw error.
        public void checkPassword(UserCreationDTO userDTO)                                                      
        {

                String password = userDTO.getPassword();                                                        //Get the password and place it in string.
                boolean containsDigit = false;

                if (password.length() < 8)                                                                      //Throw error is password isnt 8 chars long.
                {
                        throw new IllegalArgumentException("Password must be at least 8 characters long.");
                }
                
                for (int i = 0; i < password.length(); i++) {                                                   //Loop through to check the password has a digit
          
                       
                        if (Character.isDigit(password.charAt(i))) {
                                containsDigit = true;
                                break;
                        }
                }

                if (!containsDigit)                                                                             //If password doesn't have a digit, throw error.
                {
                        throw new IllegalArgumentException("Password must contain at least one digit.");
                }
        }

        //Create user using given DTO. Encrypt passoword, set the creation date, and save to DB.
        //Return the DTO so user can be appended to table.
        public UserDTO userCreation(UserCreationDTO userCreateDTO)                     
        {        
                String password = encryptPassword.encode(userCreateDTO.getPassword());         

                userCreateDTO.setCreationDate(todaysDate);                                      //Set the date user is created in DTO since it is sent back to the front.

                User newUser = new User(userCreateDTO.getEmail(), password, userCreateDTO.getFirstName(), userCreateDTO.getLastName(), userCreateDTO.getRole(), todaysDate); //Create new user
          
                userRepository.save(newUser);                                                  


                //I cant get the newly user's creation date to display in the table without pulling them immediately and placing their attributes in a UserDTO.
                User storedUser = userRepository.findByEmail(userCreateDTO.getEmail());
                UserDTO storedUserDTO = new UserDTO();

                storedUserDTO.setEmail(storedUser.getEmail());
                storedUserDTO.setFirstName(storedUser.getFirstName());
                storedUserDTO.setLastName(storedUser.getLastName());
                storedUserDTO.setRole(storedUser.getRole());
                storedUserDTO.setCreationDate(storedUser.getCreationDate());

                return storedUserDTO;                                                        
        }

        //Get the users in DB by role in a list and then place them in DTO list 
        //with attributes to be returned to the front to be displayed in table.
        public List<UserDTO> getUsers() {                        
                List<User> users = userRepository.findAllByOrderByRoleAsc();    //Retrieves all user entities in the database ordered by role in ascending order and stored in list users.
                List<UserDTO> userDTOs = new ArrayList<>();                     //List that holds the UserDTO objects.
                
                for (int i = 0; i < users.size(); i++) {                        //Loops based on the number of users in users list.
                        User user = users.get(i);                            
                        UserDTO dto = new UserDTO();                             
                        dto.setEmail(user.getEmail());                  
                        dto.setFirstName(user.getFirstName());
                        dto.setLastName(user.getLastName());
                        dto.setRole(user.getRole());
                        dto.setCreationDate(user.getCreationDate());
                        userDTOs.add(dto);                             
                }           
    
                return userDTOs;       
        }

        //Delete user in system via email. Make sure the email exists or throw error. If no error get the user who has that email and delete.
        public void deleteUser(String email) {

                if (!userRepository.existsByEmail(email)) 
                {
                        throw new NoSuchElementException("The user you wish to delete can't be found in the database. Please alert the developer");
                }
                
                User user = userRepository.findByEmail(email);
                userRepository.delete(user);
        }
}

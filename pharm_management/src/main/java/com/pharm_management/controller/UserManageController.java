package com.pharm_management.controller;

import org.springframework.beans.factory.annotation.Autowired;      
import org.springframework.web.bind.annotation.*;                   //Import @RestController, @RequestMapping, @GetMapping, @PostMapping, etc.
import com.pharm_management.dto.UserCreationDTO;                    //Import UserCreationDTO to transfer user details between layers for creating user.
import com.pharm_management.dto.UserDTO;                            //Import UserDTO to return users stored into database to be displayed on the front end.
import com.pharm_management.service.ManageUsersService;            
import org.springframework.http.ResponseEntity;                     //Used for when returning HTTP status code, headers, and body of the response returned from your controller methods.
import org.springframework.http.HttpStatus;                         //Used with ResponseEntity to set the status code.
import org.springframework.dao.DataAccessException;                 //Thrown when there are issues interacting with a database.
import java.util.List;                                           
import java.util.NoSuchElementException;                            //Thrown when trying to access an element that isn’t present
import org.springframework.dao.DuplicateKeyException;               //Thrown when an error has occurred due to a duplicate key
import java.util.Collections;                                       //Used in returning responses to the front end in a JSON format.

@RestController
@RequestMapping("manageUsers/")
public class UserManageController {

    @Autowired                                                      //Inject an instance of authService using @Autowire.
    private ManageUsersService manageService;

    //Map the payload to DTO.
    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserCreationDTO userCreateDTO)  {      /*ResponseEntity is a Spring Class that represents the entire HTTP response.
                                                                                            @RequestBody is an annotation that binds the HTTP request body sent from the front to the method parameter.
                                                                                            Spring will convert the incoming JSON into an instance of AdminRegDTO.
                                                                                            <?> means that the response can contain any type of data.*/
        /*When creating user check formatting for email and password and throw
        error to front if now correct. If correct create user and store in DB.
        Also return DTO front so new user can be appended to table */                                                                
        try 
        {                                                                        
            manageService.checkEmail(userCreateDTO);                               
			
			manageService.checkPassword(userCreateDTO);                               
		
            UserDTO newUserDTO = manageService.userCreation(userCreateDTO);              

            return ResponseEntity.status(HttpStatus.CREATED).body(newUserDTO);            //Status code indicates the new resource was created (success).

        } catch (IllegalArgumentException e) {                                           
            
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)                          //status(HttpStatus.BAD_REQUEST) sets the HTTP status code of the response to 400
                                 .body(e.getMessage());                                   //Sets the body of the HTTP response with the error message from the service layer 
        
        } catch (DuplicateKeyException e) {                           

            return ResponseEntity.status(HttpStatus.CONFLICT)                             //Conflict status is used because the error indicates a conflict.
                                 .body(e.getMessage());         

        } catch (DataAccessException e) {                                                 
        
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)                //sets the HTTP status code of the response to 500
                                  .body("A database error has occured. Please alert the dev.");
        }

    }

    @GetMapping("/getUsers")                                                            
    public ResponseEntity<?> getAllUsers() {                                           

        /*Get all users and place in DTO list and return to front to be displayed in table.
        If error occurs throw it the front to be displayed to user.*/
        try {

            List<UserDTO> users = manageService.getUsers();                             //Return the list of UserDTOs that contains the users of the system.
            return ResponseEntity.ok(users);                                            

        } catch (DataAccessException e) {                                               
        
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)              //sets the HTTP status code of the response to 500
                             .body("A database error has occured when trying to retrieve users. Please alert the dev.");
        }
    }

    @DeleteMapping("/deleteUser/{email}")                               //{email} recieves ${userEmail} from the front end.
    public ResponseEntity<?> deleteUser(@PathVariable String email) {   //Returns a response entity. The @PathVariable takes {email} and places it in email

        //Delete user via email. Throw error if user cant be found in DB.
        try {

            manageService.deleteUser(email);                            

            return ResponseEntity.status(HttpStatus.OK).build();       

        } catch (NoSuchElementException e) {                     

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(e.getMessage());
        }
    }
}


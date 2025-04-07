package com.pharm_management.controller;

import java.util.Collections;                                   //Used in returning responses to the front end in a JSON format.
import org.springframework.beans.factory.annotation.Autowired;  //Inject dependencies into the class           
import org.springframework.web.bind.annotation.*;               //Import @RestController, @RequestMapping, @GetMapping, @PostMapping, etc.
import com.pharm_management.dto.AdminRegDTO;                    //Imports AdminRegDTO.
import com.pharm_management.service.AdminCreationService;       //Imports service component for creating admin.
import org.springframework.http.ResponseEntity;                 //Used for when returning HTTP status code, headers, and body of the response returned from your controller methods.
import org.springframework.http.HttpStatus;                     //Used with ResponseEntity to set the status code (HttpStatus.OK, HttpStatus.BAD_REQUEST).
import org.springframework.dao.DataAccessException;             //Thrown by Spring when theres issues interacting with the database.

@RestController                                               
@RequestMapping("/admin")
public class AdminCreationController {

    @Autowired
    private AdminCreationService adminService;                                  //Inject an instance of authService. 

    //Map payload sent from front to DTO.
    @PostMapping("/create_admin")
    public ResponseEntity<?> createAdmin(@RequestBody AdminRegDTO adminDto)     //ResponseEntity is a Spring Class that represents the entire HTTP response.
    {                                                                           //createAdmin is the name of the method. @RequestBody is annotation that binds the HTTP request body to the method parameter
                                                                                //Spring will convert the incoming JSON into an instance of AdminRegDTO.
                                                                                //<?> means that the response can contain any type of data.

        //Check the formatting of the email and password. If wrong throw error and send to front to alert user.
        //If no error, create the admin and send ok response.                                                       
       try 
        {                                                                        
            adminService.checkEmail(adminDto);
			
			adminService.checkPassword(adminDto);
		
            adminService.adminCreation(adminDto);

            return ResponseEntity.ok().build();                                 //.build() finalizes the creation of the ResponseEntity object. 

        } catch (IllegalArgumentException e) {                           
        
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)                //Bad request is used for invalid data.
                                 .body(Collections.singletonMap("Error1", e.getMessage()));

                                                  
        }catch (DataAccessException e) {                                        
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                  .body(Collections.singletonMap("Error2", "A database error has occurred. Please alert the dev."));

        }
    }
}                                            


package com.pharm_management.controller;

import java.util.Collections;                                   //Used in returning responses to the front end in a JSON format.
import org.springframework.beans.factory.annotation.Autowired;  //Inject dependencies into the class           
import org.springframework.web.bind.annotation.*;               //Import @RestController, @RequestMapping, @GetMapping, @PostMapping, etc.
import com.pharm_management.dto.AdminRegDTO;                    //Imports AdminRegDTO.
import com.pharm_management.service.AdminCreationService;       //Imports a service component from your application.
import org.springframework.http.ResponseEntity;                 //Used for when returning HTTP status code, headers, and body of the response returned from your controller methods.
import org.springframework.http.HttpStatus;                     //Used with ResponseEntity to set the status code (e.g., HttpStatus.OK, HttpStatus.BAD_REQUEST).
import org.springframework.dao.DataAccessException;             //Thrown by Spring’s data access layer when there are issues interacting with a database. Database integrity constraint, duplicate key is inserted into a table with unquie constraint.                

@RestController         //Makes all methods in the class automatically serialize returned objects to JSON and write them directly to the HTTP response body.
@RequestMapping("/admin")
public class AdminCreationController {

    @Autowired
    private AdminCreationService adminService;                                  //Inject an instance of authService. Dont use 'final' since @Autowired is being used.

    //Map payload sent from front to DTO as well as service for separation.
    @PostMapping("/create_admin")
    public ResponseEntity<?> createAdmin(@RequestBody AdminRegDTO adminDto)     //ResponseEntity is a Spring Class that represents the entire HTTP response.
    {                                                                           //createAdmin is the name of the method. @RequestBody is an annotation that tells Spring to bind the HTTP request body to the method parameter
                                                                                //Spring will convert the incoming JSON into an instance of AdminRegDTO.
                                                                                //<?> means that the response can contain any type of data.

        //Check the formatting of the email and password. If wrong throw error and send to front to alert user.
        //If no error, create the admin and send ok response.                                                       
       try 
        {                                                                        
            adminService.checkEmail(adminDto);
			
			adminService.checkPassword(adminDto);
		
            adminService.adminCreation(adminDto);

            return ResponseEntity.ok().build();                                 //If this execute it means that the three above methods executed without throwing an error. .build() finalizes the creation of the ResponseEntity object. 

        } catch (IllegalArgumentException e) {                                  //Handles exceptions of type IllegalArgumentException. "e" holds the exception object which lets you access it details (like the error message). Without .build(), you don't have a complete ResponseEntity object that Spring can use to send an HTTP response.
        
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)        //Bad request is used for invalid data.
                                 .body(Collections.singletonMap("Error1", e.getMessage()));

                                                  
        }catch (DataAccessException e) {                                        
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                  .body(Collections.singletonMap("Error2", "A database error has occurred. Please alert the dev."));

        }
    }
}                                            

/*Collections.singletonMap("Error1", e.getMessage()) creates a Map with a single key-value pair.
 * The key is "Error1" and the value is the error message returned by e.getMessage().
 * The .body() method sets this Map as the body of the response.
 * In other words, the code returns a response with a JSON-formatted error message in the body.
 * 
 * 
 * 
 * 
 */
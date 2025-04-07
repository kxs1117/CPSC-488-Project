package com.pharm_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pharm_management.dto.UserDTO;
import com.pharm_management.service.UserProfileManageService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataAccessException;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.dao.DuplicateKeyException;
import java.util.Collections;

@RestController
@RequestMapping("userProfile/")
public class UserProfileManageController {

    @Autowired
    private UserProfileManageService profileManageService;

    @GetMapping("/getUserInfo")
    public ResponseEntity<?> UserDetails() {
        try {

            UserDTO userDetails = profileManageService.getUserDetails();
            return ResponseEntity.ok(userDetails);

        } catch (DataAccessException e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("A database error has occured when trying to retrieve users. Please alert the dev.");
        }
    }

    @PatchMapping("/updateUser")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserDTO userDTO) {

        try {

            profileManageService.checkPhoneNum(userDTO);
            userDTO = profileManageService.updateUserInfo(userDTO);
            return ResponseEntity.ok(userDTO);

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());

        } catch (DataAccessException e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("A database error has occurred when trying to update the user. Please alert the dev.");
        }
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO) {
        try {

            profileManageService.checkPassword(userDTO);
            return ResponseEntity.ok().build();

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());

        } catch (DataAccessException e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("A database error has occurred when trying to update the user. Please alert the dev.");
        }
    }
}

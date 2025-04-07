package com.pharm_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;           //Provides generic CRUD (Create, Read, Update, Delete) methods.           
import java.util.List;                                                  //Imports list interface. Some repository methods return a List of entities.
import com.pharm_management.model.User;                                 //Imports user entity
public interface UserRepository extends JpaRepository<User, Long> {     

    //Find if email exists.
    boolean existsByEmail(String email);                                //Find if an email already exists. Used in MangaeUsersService file.

    //Used for demo in the user profile management page since form-based secuirty isn't setup yet.
    User findFirstByOrderByIdAsc();


    User findByEmail(String email);
    
    List<User> findAllByOrderByRoleAsc();                               //Gets all the users in the system and organizes it be role. Used in MangaeUsersService file.
}

 
/*
 * public interface UserRepository extends JpaRepository<User, Long> {          Declares an interface named UserRepository.
 * Declares an interface named UserRepository.
 * 
 * extends JpaRepository<User, Long>                                            Inherits functionality from Spring Data JPA's JpaRepository for the User entity.

        The first generic parameter (User) specifies the type of the entity.

        The second generic parameter (Long) indicates the type of the entity's primary key.
 * 
 *      UserRepository automatically has methods for creating, reading, updating, and deleting User entities without needing to write any implementation code.
 * 
 * 
 * 

 */ 

 
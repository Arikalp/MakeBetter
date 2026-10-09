package com.arikalp.server.controller;

import com.arikalp.server.model.User;
import com.arikalp.server.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for Managing Users (matches existing DataEntry.jsx /users endpoint)
 */
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "*"})
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (user.getName() == null || user.getEmail() == null) {
            return ResponseEntity.badRequest().build();
        }
        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

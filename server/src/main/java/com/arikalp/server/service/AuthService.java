package com.arikalp.server.service;

import com.arikalp.server.dto.AuthResponse;
import com.arikalp.server.dto.LoginRequest;
import com.arikalp.server.dto.SignupRequest;
import com.arikalp.server.model.User;
import com.arikalp.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.Optional;
import java.util.UUID;

/**
 * Service handling User Authentication, registration, and credential verification.
 * Adheres to NOTE.md: modular, readable, and simple.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Register a new user
     */
    public AuthResponse signup(SignupRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return AuthResponse.error("Name is required");
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return AuthResponse.error("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return AuthResponse.error("Password must be at least 6 characters long");
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            return AuthResponse.error("An account with this email already exists");
        }

        // Hash password securely
        String hashedPassword = hashPassword(request.getPassword());

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(hashedPassword);
        user.setRole(request.getRole() != null && !request.getRole().isEmpty() ? request.getRole() : "CITIZEN");

        User savedUser = userRepository.save(user);

        String token = "mb_token_" + UUID.randomUUID();
        AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );

        return AuthResponse.success("Account registered successfully", token, userDto);
    }

    /**
     * Authenticate an existing user
     */
    public AuthResponse login(LoginRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return AuthResponse.error("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return AuthResponse.error("Password is required");
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmail(normalizedEmail);

        if (userOpt.isEmpty()) {
            return AuthResponse.error("Invalid email or password");
        }

        User user = userOpt.get();
        String hashedInput = hashPassword(request.getPassword());

        if (!hashedInput.equals(user.getPassword())) {
            return AuthResponse.error("Invalid email or password");
        }

        String token = "mb_token_" + UUID.randomUUID();
        AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

        return AuthResponse.success("Authentication successful", token, userDto);
    }

    /**
     * Find user by ID
     */
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    /**
     * Simple SHA-256 password hashing helper
     */
    private String hashPassword(String rawPassword) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawPassword.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
}

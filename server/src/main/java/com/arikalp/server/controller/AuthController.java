package com.arikalp.server.controller;

import com.arikalp.server.dto.AuthResponse;
import com.arikalp.server.dto.LoginRequest;
import com.arikalp.server.dto.SignupRequest;
import com.arikalp.server.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST Controller for User Authentication & Registration
 * Exposes endpoints for Login, Signup, and Auth status.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "*"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * User registration endpoint
     * POST /api/auth/signup
     */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        AuthResponse response = authService.signup(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * User login endpoint
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if (!response.isSuccess()) {
            return ResponseEntity.status(401).body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Auth API health & status check
     * GET /api/auth/status
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "MakeBetter Auth Subsystem",
                "timestamp", System.currentTimeMillis()
        ));
    }
}

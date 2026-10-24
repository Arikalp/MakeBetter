package com.arikalp.server.service;

import com.arikalp.server.dto.AuthResponse;
import com.arikalp.server.model.User;
import com.arikalp.server.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

/**
 * Service for verifying Google ID Tokens and upserting OAuth users.
 * Flow:
 *   1. Frontend receives a credential (Google ID token) after user signs in with Google.
 *   2. Frontend POSTs the token to /api/auth/google.
 *   3. This service verifies the token with Google's servers.
 *   4. If valid, it upserts the user in MongoDB and returns an AuthResponse.
 */
@Service
public class GoogleAuthService {

    private final UserRepository userRepository;

    @Value("${google.oauth.client-id}")
    private String clientId;

    public GoogleAuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Verify a Google ID token and sign in / register the user.
     *
     * @param idTokenString the raw credential string from Google Identity Services
     * @return AuthResponse with user details and session token
     */
    public AuthResponse authenticateWithGoogle(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(clientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                return AuthResponse.error("Invalid Google ID token. Please try again.");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String googleId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");

            // Upsert: find by googleId first, then by email (merge existing local account)
            User user = userRepository.findByGoogleId(googleId)
                    .orElseGet(() -> userRepository.findByEmail(email).orElse(null));

            if (user == null) {
                // New user — create account
                user = new User();
                user.setName(name != null ? name : email.split("@")[0]);
                user.setEmail(email);
                user.setRole("CITIZEN");
            }

            // Always sync Google profile fields
            user.setGoogleId(googleId);
            user.setPicture(picture);
            user.setProvider("google");
            if (user.getName() == null || user.getName().isBlank()) {
                user.setName(name != null ? name : email.split("@")[0]);
            }

            User savedUser = userRepository.save(user);

            String sessionToken = "mb_token_" + UUID.randomUUID();
            AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                    savedUser.getId(),
                    savedUser.getName(),
                    savedUser.getEmail(),
                    savedUser.getRole(),
                    savedUser.getPicture(),
                    savedUser.getProvider()
            );

            return AuthResponse.success("Signed in with Google successfully", sessionToken, userDto);

        } catch (Exception e) {
            return AuthResponse.error("Google authentication failed: " + e.getMessage());
        }
    }
}

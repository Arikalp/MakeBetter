package com.arikalp.server.dto;

/**
 * DTO for Google OAuth login request.
 * The frontend sends the Google ID token (credential) after
 * the user completes the Google Sign-In flow.
 */
public class GoogleAuthRequest {

    private String credential; // Google ID token (JWT) from Google Identity Services

    public GoogleAuthRequest() {}

    public GoogleAuthRequest(String credential) {
        this.credential = credential;
    }

    public String getCredential() { return credential; }
    public void setCredential(String credential) { this.credential = credential; }
}

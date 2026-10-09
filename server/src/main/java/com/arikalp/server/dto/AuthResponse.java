package com.arikalp.server.dto;

/**
 * DTO for Authentication Response
 * Returned upon successful signup or login.
 */
public class AuthResponse {

    private boolean success;
    private String message;
    private String token;
    private UserDto user;

    public AuthResponse() {}

    public AuthResponse(boolean success, String message, String token, UserDto user) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
    }

    public static AuthResponse success(String message, String token, UserDto user) {
        return new AuthResponse(true, message, token, user);
    }

    public static AuthResponse error(String message) {
        return new AuthResponse(false, message, null, null);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    /**
     * Inner lightweight safe user representation (no password exposed)
     */
    public static class UserDto {
        private String id;
        private String name;
        private String email;
        private String role;

        public UserDto() {}

        public UserDto(String id, String name, String email, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}

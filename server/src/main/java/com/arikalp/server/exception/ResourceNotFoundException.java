package com.arikalp.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom exception for when a requested resource is not found.
 * @ResponseStatus automatically maps this to a 404 HTTP response.
 *
 * Usage in service layer:
 *   throw new ResourceNotFoundException("User not found with id: " + id);
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

package com.arikalp.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @Document maps this class to a MongoDB collection called "users".
 * @Id marks the field that maps to MongoDB's _id field.
 */
@Document(collection = "users")
public class User {

    @Id
    private String id;         // MongoDB uses String IDs (ObjectId under the hood)
    private String name;
    private String email;

    // Constructors
    public User() {}

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}

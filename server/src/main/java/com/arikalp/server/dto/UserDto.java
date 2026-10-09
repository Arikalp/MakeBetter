package com.arikalp.server.dto;

/*
 * ============================================================
 *  WHY DO WE NEED A DTO? — A Simple Example
 * ============================================================
 *
 * Imagine your database has a User entity like this:
 *
 *      public class User {
 *          private Long id;
 *          private String name;
 *          private String email;
 *          private String password;   // ← sensitive! stored in DB
 *      }
 *
 * If you return this User object DIRECTLY from your API:
 *
 *      @GetMapping("/user")
 *      public User getUser() {
 *          return userRepository.findById(1L);  // BAD! password goes out too!
 *      }
 *
 * The client (browser/mobile app) receives:
 *      {
 *          "id": 1,
 *          "name": "Sankalp",
 *          "email": "sankalp@gmail.com",
 *          "password": "sankalp123"   // ← DANGER! Never send this!
 *      }
 *
 * ✅ FIX: Use a DTO to control what goes out.
 * The UserDto below has NO password field.
 * So even if you accidentally return it, password is safe.
 *
 *      @GetMapping("/user")
 *      public UserDto getUser() {
 *          User user = userRepository.findById(1L);
 *          return new UserDto(user.getId(), user.getName(), user.getEmail());
 *          // password is never included ✅
 *      }
 *
 * Client now only receives:
 *      {
 *          "id": 1,
 *          "name": "Sankalp",
 *          "email": "sankalp@gmail.com"
 *          // no password! ✅
 *      }
 *
 * ============================================================
 *  NOT USING THIS FOR NOW — come back when you connect a DB
 * ============================================================
 */

/*

public class UserDto {

    private Long id;
    private String name;
    private String email;
    // Notice: NO password field here — that's the whole point!

    // Constructors
    public UserDto() {}

    public UserDto(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}

*/

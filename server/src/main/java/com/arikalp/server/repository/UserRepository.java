package com.arikalp.server.repository;

import com.arikalp.server.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * MongoDB Data Repository for User entity
 * Provides standard CRUD and custom query finders.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}

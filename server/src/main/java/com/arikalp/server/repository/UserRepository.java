package com.arikalp.server.repository;

import com.arikalp.server.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Extending MongoRepository<User, String> gives you these methods for FREE:
 *   - save(user)
 *   - findById(id)
 *   - findAll()
 *   - deleteById(id)
 *   - count()
 *   ... and many more
 *
 * You can also add custom queries using method names:
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // Spring auto-generates the query from the method name
    Optional<User> findByEmail(String email);

    // Finds users whose name contains the keyword (case-sensitive)
    // List<User> findByNameContaining(String keyword);
}

package com.frostandfeast.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public long getUserCount() {
        return userRepository.count();
    }
    public User saveUser(User user) {
        return userRepository.save(user);  // Save the user to the database
    }

}

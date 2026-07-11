package com.cidsystem.cardealershipinventory.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cidsystem.cardealershipinventory.dto.AuthenticationResponse;
import com.cidsystem.cardealershipinventory.dto.RegisterRequest;
import com.cidsystem.cardealershipinventory.entity.Role;
import com.cidsystem.cardealershipinventory.entity.User;
import com.cidsystem.cardealershipinventory.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // register service 
    public AuthenticationResponse register(RegisterRequest request) {
        // Check if email already exists
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Encode password
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // Create user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setRole(Role.USER);

        // Save user
        userRepository.save(user);

        // Return response
        AuthenticationResponse response = new AuthenticationResponse();
        response.setMessage("Registration successful");

        return response;
    }
}

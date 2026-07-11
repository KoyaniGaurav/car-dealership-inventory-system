package com.cidsystem.cardealershipinventory.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cidsystem.cardealershipinventory.dto.AuthenticationResponse;
import com.cidsystem.cardealershipinventory.dto.LoginRequest;
import com.cidsystem.cardealershipinventory.dto.RegisterRequest;
import com.cidsystem.cardealershipinventory.entity.Role;
import com.cidsystem.cardealershipinventory.entity.User;
import com.cidsystem.cardealershipinventory.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName(),
                request.getEmail(),
                encodedPassword,
                Role.USER);

        userRepository.save(user);

        AuthenticationResponse response = new AuthenticationResponse();
        response.setMessage("Registration successful");

        return response;
    }

    @Override
    public AuthenticationResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        AuthenticationResponse response = new AuthenticationResponse();
        response.setMessage("Login successful");
        return response;
    }
}

package com.cidsystem.cardealershipinventory.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cidsystem.cardealershipinventory.dto.AuthenticationResponse;
import com.cidsystem.cardealershipinventory.dto.RegisterRequest;
import com.cidsystem.cardealershipinventory.entity.Role;
import com.cidsystem.cardealershipinventory.entity.User;
import com.cidsystem.cardealershipinventory.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;


@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    
// testing to register the user first case.
@Test
void shouldRegisterUserSuccessfully() {
    RegisterRequest request = new RegisterRequest();
    request.setName("Gaurav");
    request.setEmail("gaurav@example.com");
    request.setPassword("password123");

    when(userRepository.findByEmail(request.getEmail()))
            .thenReturn(Optional.empty());

    when(passwordEncoder.encode(request.getPassword()))
            .thenReturn("encodedPassword");

    User savedUser = new User();
    savedUser.setId(1L);
    savedUser.setName(request.getName());
    savedUser.setEmail(request.getEmail());
    savedUser.setPassword("encodedPassword");
    savedUser.setRole(Role.USER);

    when(userRepository.save(any(User.class)))
            .thenReturn(savedUser);

    AuthenticationResponse response = authService.register(request);

    assertNotNull(response);

    verify(userRepository, times(1)).findByEmail(request.getEmail());
    verify(passwordEncoder, times(1)).encode(request.getPassword());
    verify(userRepository, times(1)).save(any(User.class));
}
}

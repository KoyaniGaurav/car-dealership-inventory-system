package com.cidsystem.cardealershipinventory.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cidsystem.cardealershipinventory.dto.AuthenticationResponse;
import com.cidsystem.cardealershipinventory.dto.LoginRequest;
import com.cidsystem.cardealershipinventory.dto.RegisterRequest;
import com.cidsystem.cardealershipinventory.entity.Role;
import com.cidsystem.cardealershipinventory.entity.User;
import com.cidsystem.cardealershipinventory.repository.UserRepository;
import com.cidsystem.cardealershipinventory.security.JwtService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.util.Optional;


@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthServiceImpl authService;

    private RegisterRequest createRegisterRequest() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Gaurav");
        request.setEmail("gaurav@example.com");
        request.setPassword("password123");
        return request;
    }

    private LoginRequest createLoginRequest() {
        LoginRequest request = new LoginRequest();
        request.setEmail("gaurav@example.com");
        request.setPassword("password123");
        return request;
    }
    
    @Test
    void shouldRegisterUserSuccessfully() {
        RegisterRequest request = createRegisterRequest();

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

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {
        RegisterRequest request = createRegisterRequest();
        User existingUser = new User();
        existingUser.setEmail(request.getEmail());

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.of(existingUser));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.register(request));

        assertEquals("Email already exists", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    void shouldEncodePasswordBeforeSaving() {
        RegisterRequest request = createRegisterRequest();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword()))
                .thenReturn("encodedPassword");

        authService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertEquals("encodedPassword", savedUser.getPassword());
        assertNotEquals(request.getPassword(), savedUser.getPassword());
    }

    @Test
    void shouldAssignUserRoleByDefault() {
        RegisterRequest request = createRegisterRequest();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword()))
                .thenReturn("encodedPassword");

        authService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertEquals(Role.USER, savedUser.getRole());
    }

    @Test
    void shouldSaveUserWithCorrectDetails() {
        RegisterRequest request = createRegisterRequest();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword()))
                .thenReturn("encodedPassword");

        authService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertEquals(request.getName(), savedUser.getName());
        assertEquals(request.getEmail(), savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());
        assertEquals(Role.USER, savedUser.getRole());
    }

    @Test
    void shouldReturnJwtTokenWhenLoginIsSuccessful() {
        LoginRequest request = createLoginRequest();
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword("encodedPassword");

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.getPassword(), user.getPassword()))
                .thenReturn(true);
        when(jwtService.generateToken(request.getEmail()))
                .thenReturn("jwt-token");

        AuthenticationResponse response = authService.login(request);

        assertEquals("jwt-token", response.getToken());
        assertEquals("Bearer", response.getType());
        verify(jwtService).generateToken(request.getEmail());
    }

    
}

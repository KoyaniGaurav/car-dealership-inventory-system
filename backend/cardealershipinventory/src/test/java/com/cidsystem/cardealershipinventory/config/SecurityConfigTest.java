package com.cidsystem.cardealershipinventory.config;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cidsystem.cardealershipinventory.controller.AuthController;
import com.cidsystem.cardealershipinventory.dto.AuthenticationResponse;
import com.cidsystem.cardealershipinventory.dto.LoginRequest;
import com.cidsystem.cardealershipinventory.dto.RegisterRequest;
import com.cidsystem.cardealershipinventory.security.JwtService;
import com.cidsystem.cardealershipinventory.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.userdetails.UserDetailsService;

@WebMvcTest(controllers = { AuthController.class, SecurityConfigTest.SecuredTestController.class })
@Import(SecurityConfig.class)
public class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    void shouldAllowRegisterWithoutToken() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setName("Gaurav");
        request.setEmail("gaurav@example.com");
        request.setPassword("password123");

        AuthenticationResponse response = new AuthenticationResponse();
        response.setMessage("Registration successful");

        when(authService.register(any(RegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/register")
                .contentType(APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldAllowLoginWithoutToken() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("gaurav@example.com");
        request.setPassword("password123");

        AuthenticationResponse response = new AuthenticationResponse();
        response.setToken("jwt-token");
        response.setType("Bearer");

        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                .contentType(APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void shouldRequireTokenForOtherEndpoints() throws Exception {
        mockMvc.perform(get("/api/secure"))
                .andExpect(status().isUnauthorized());
    }

    @RestController
    static class SecuredTestController {
        @GetMapping("/api/secure")
        ResponseEntity<String> securedEndpoint() {
            return ResponseEntity.ok("secured");
        }
    }
}

package com.cidsystem.cardealershipinventory.config;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @Test
    @WithMockUser(roles = "USER")
    void shouldAllowUserVehicleReadAndPurchaseEndpoints() throws Exception {
        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/vehicles/search"))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/vehicles/1/purchase"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "USER")
    void shouldRejectUserFromAdminVehicleEndpoints() throws Exception {
        mockMvc.perform(post("/api/vehicles"))
                .andExpect(status().isForbidden());

        mockMvc.perform(put("/api/vehicles/1"))
                .andExpect(status().isForbidden());

        mockMvc.perform(delete("/api/vehicles/1"))
                .andExpect(status().isForbidden());

        mockMvc.perform(post("/api/vehicles/1/restock"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldAllowAdminAllVehicleEndpoints() throws Exception {
        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/vehicles/search"))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/vehicles/1/purchase"))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/vehicles"))
                .andExpect(status().isOk());

        mockMvc.perform(put("/api/vehicles/1"))
                .andExpect(status().isOk());

        mockMvc.perform(delete("/api/vehicles/1"))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/vehicles/1/restock"))
                .andExpect(status().isOk());
    }

    @RestController
    static class SecuredTestController {
        @GetMapping("/api/secure")
        ResponseEntity<String> securedEndpoint() {
            return ResponseEntity.ok("secured");
        }

        @GetMapping("/api/vehicles")
        ResponseEntity<String> getVehicles() {
            return ResponseEntity.ok("vehicles");
        }

        @GetMapping("/api/vehicles/search")
        ResponseEntity<String> searchVehicles() {
            return ResponseEntity.ok("vehicles");
        }

        @PostMapping("/api/vehicles/{id}/purchase")
        ResponseEntity<String> purchaseVehicle(@PathVariable Long id) {
            return ResponseEntity.ok("vehicle");
        }

        @PostMapping("/api/vehicles")
        ResponseEntity<String> addVehicle() {
            return ResponseEntity.ok("vehicle");
        }

        @PutMapping("/api/vehicles/{id}")
        ResponseEntity<String> updateVehicle(@PathVariable Long id) {
            return ResponseEntity.ok("vehicle");
        }

        @DeleteMapping("/api/vehicles/{id}")
        ResponseEntity<String> deleteVehicle(@PathVariable Long id) {
            return ResponseEntity.ok("vehicle");
        }

        @PostMapping("/api/vehicles/{id}/restock")
        ResponseEntity<String> restockVehicle(@PathVariable Long id) {
            return ResponseEntity.ok("vehicle");
        }
    }
}

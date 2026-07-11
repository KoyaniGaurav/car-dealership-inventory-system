package com.cidsystem.cardealershipinventory.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class JwtServiceTest {

    private final JwtService jwtService = new JwtService(
            "my-test-secret-key-my-test-secret-key",
            3600000L);

    @Test
    void shouldExtractUsernameFromGeneratedToken() {
        String token = jwtService.generateToken("gaurav@example.com");

        String username = jwtService.extractUsername(token);

        assertEquals("gaurav@example.com", username);
    }

    @Test
    void shouldValidateGeneratedTokenForSameUsername() {
        String token = jwtService.generateToken("gaurav@example.com");

        boolean valid = jwtService.isTokenValid(token, "gaurav@example.com");

        assertTrue(valid);
    }
}

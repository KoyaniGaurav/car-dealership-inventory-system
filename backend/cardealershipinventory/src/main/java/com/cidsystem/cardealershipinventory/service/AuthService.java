package com.cidsystem.cardealershipinventory.service;

import com.cidsystem.cardealershipinventory.dto.AuthenticationResponse;
import com.cidsystem.cardealershipinventory.dto.LoginRequest;
import com.cidsystem.cardealershipinventory.dto.RegisterRequest;

public interface AuthService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(LoginRequest request);
}

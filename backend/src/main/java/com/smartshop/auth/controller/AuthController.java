package com.smartshop.auth.controller;

import com.smartshop.auth.AuthService;
import com.smartshop.auth.LoginRequest;
import com.smartshop.auth.RegisterRequest;
import com.smartshop.auth.OtpService;
import com.smartshop.auth.VerifyOtpRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(AuthService authService, OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return Map.of("message", "User registered successfully");
    }

    @PostMapping("/verify")
    public Map<String, String> verify(@RequestBody VerifyOtpRequest request) {
        boolean ok = otpService.verifyOtp(request.email, request.code);
        if (ok) return Map.of("message", "Account verified");
        return Map.of("message", "Invalid or expired code");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        return Map.of("token", token);
    }
}

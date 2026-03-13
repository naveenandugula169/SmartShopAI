package com.smartshop.auth;

import com.smartshop.security.JwtUtil;
import com.smartshop.user.model.User;
import com.smartshop.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;

    public AuthService(UserRepository userRepository,
                       BCryptPasswordEncoder encoder,
                       JwtUtil jwtUtil,
                       OtpService otpService) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.otpService = otpService;
    }

    public void register(RegisterRequest request) {
        // Prevent ugly database constraint errors by validating uniqueness first
        if (userRepository.existsByUsername(request.username)) {
            throw new RuntimeException("Username already exists. Please choose a different name or sign in.");
        }
        if (userRepository.existsByEmail(request.email)) {
            throw new RuntimeException("Email already registered. Please sign in or use a different email.");
        }

        User user = new User();
        user.setUsername(request.username);
        user.setEmail(request.email);
        user.setPhoneNumber(request.phoneNumber);
        user.setPassword(encoder.encode(request.password));
        user.setRoles(Set.of("ROLE_USER"));
        user.setEnabled(true); // account is active immediately, no OTP flow
        userRepository.save(user);
    }

    public String login(LoginRequest request) {
        // Allow login using username, email, or phone number
        String identifier = request.username != null && !request.username.isBlank()
                ? request.username
                : (request.email != null && !request.email.isBlank()
                    ? request.email
                    : request.phoneNumber);

        if (identifier == null || identifier.isBlank()) {
            throw new RuntimeException("Please provide email or phone number to login.");
        }

        User user = userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .or(() -> userRepository.findByPhoneNumber(identifier))
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getUsername());
    }
}

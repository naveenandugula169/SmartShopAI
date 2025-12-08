package com.smartshop.auth.controller;

import com.smartshop.common.ApiResponse;
import com.smartshop.user.model.User;
import com.smartshop.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<User>> register(@RequestBody User user) {
		User createdUser = userService.createUser(user);
		return ResponseEntity.ok(ApiResponse.success("User registered successfully", createdUser));
	}
	
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<Map<String, Object>>> login(@RequestBody Map<String, String> credentials) {
		String username = credentials.get("username");
		String password = credentials.get("password");
		
		Optional<User> userOpt = userService.getUserByUsername(username);
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			// Simple password check (in production, use BCrypt)
			if (user.getPassword().equals(password)) {
				Map<String, Object> response = new HashMap<>();
				response.put("user", user);
				response.put("message", "Login successful");
				return ResponseEntity.ok(ApiResponse.success(response));
			}
		}
		return ResponseEntity.ok(ApiResponse.error("Invalid credentials"));
	}
}


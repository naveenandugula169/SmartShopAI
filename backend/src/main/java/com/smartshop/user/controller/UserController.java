package com.smartshop.user.controller;

import com.smartshop.common.ApiResponse;
import com.smartshop.user.model.User;
import com.smartshop.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
		Optional<User> user = userService.getUserById(id);
		if (user.isPresent()) {
			return ResponseEntity.ok(ApiResponse.success(user.get()));
		}
		return ResponseEntity.ok(ApiResponse.error("User not found"));
	}
	
	@GetMapping("/username/{username}")
	public ResponseEntity<ApiResponse<User>> getUserByUsername(@PathVariable String username) {
		Optional<User> user = userService.getUserByUsername(username);
		if (user.isPresent()) {
			return ResponseEntity.ok(ApiResponse.success(user.get()));
		}
		return ResponseEntity.ok(ApiResponse.error("User not found"));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable Long id, @RequestBody User user) {
		User updatedUser = userService.updateUser(id, user);
		return ResponseEntity.ok(ApiResponse.success("User updated successfully", updatedUser));
	}
}

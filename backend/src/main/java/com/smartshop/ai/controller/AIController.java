package com.smartshop.ai.controller;

import com.smartshop.ai.service.AIChatService;
import com.smartshop.ai.service.AIRecommendationService;
import com.smartshop.common.ApiResponse;
import com.smartshop.product.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {
	
	@Autowired
	private AIRecommendationService recommendationService;
	
	@Autowired
	private AIChatService chatService;
	
	@GetMapping("/recommendations/{userId}")
	public ResponseEntity<ApiResponse<List<Product>>> getRecommendations(@PathVariable Long userId) {
		List<Product> recommendations = recommendationService.getRecommendations(userId);
		return ResponseEntity.ok(ApiResponse.success(recommendations));
	}
	
	@GetMapping("/similar/{productId}")
	public ResponseEntity<ApiResponse<List<Product>>> getSimilarProducts(@PathVariable Long productId) {
		List<Product> similarProducts = recommendationService.getSimilarProducts(productId);
		return ResponseEntity.ok(ApiResponse.success(similarProducts));
	}
	
	@PostMapping("/chat")
	public ResponseEntity<ApiResponse<Map<String, Object>>> chat(
		@RequestBody Map<String, String> request) {
		String message = request.get("message");
		Long userId = Long.valueOf(request.getOrDefault("userId", "1").toString());
		
		Map<String, Object> response = chatService.processChatMessage(message, userId);
		return ResponseEntity.ok(ApiResponse.success(response));
	}
}


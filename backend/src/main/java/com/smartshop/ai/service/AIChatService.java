package com.smartshop.ai.service;

import com.smartshop.product.model.Product;
import com.smartshop.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIChatService {
	
	@Autowired
	private ProductRepository productRepository;
	
	// Placeholder for AI chat logic
	// In production, this would integrate with OpenAI/LangChain4j
	public Map<String, Object> processChatMessage(String message, Long userId) {
		Map<String, Object> response = new HashMap<>();
		
		// Simple keyword-based responses for now
		String lowerMessage = message.toLowerCase();
		
		if (lowerMessage.contains("price") || lowerMessage.contains("cost")) {
			List<Product> products = productRepository.findAll();
			response.put("message", "We have products ranging from affordable to premium. Browse our catalog!");
			response.put("products", products.stream().limit(5).toList());
		} else if (lowerMessage.contains("category") || lowerMessage.contains("type")) {
			response.put("message", "We offer various categories. Please browse our products!");
		} else {
			response.put("message", "I'm here to help you find products. Try asking about prices, categories, or specific items!");
		}
		
		return response;
	}
}


package com.smartshop.ai.service;

import com.smartshop.product.model.Product;
import com.smartshop.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIRecommendationService {
	
	@Autowired
	private ProductRepository productRepository;
	
	// Placeholder for AI recommendation logic
	// In production, this would use embeddings and vector search
	public List<Product> getRecommendations(Long userId) {
		// For now, return random products or trending products
		List<Product> allProducts = productRepository.findAll();
		return allProducts.stream()
			.limit(10)
			.collect(Collectors.toList());
	}
	
	public List<Product> getSimilarProducts(Long productId) {
		Product product = productRepository.findById(productId)
			.orElseThrow(() -> new IllegalArgumentException("Product not found"));
		
		// Return products from same category
		return productRepository.findByCategory(product.getCategory())
			.stream()
			.filter(p -> !p.getId().equals(productId))
			.limit(5)
			.collect(Collectors.toList());
	}
}



package com.smartshop.product.service;

import com.smartshop.product.model.Product;
import com.smartshop.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	public Optional<Product> getProductById(Long id) {
		return productRepository.findById(id);
	}
	
	public List<Product> getProductsByCategory(String category) {
		return productRepository.findByCategory(category);
	}
	
	public List<Product> searchProducts(String keyword) {
		return productRepository.searchProducts(keyword);
	}
	
	public Product createProduct(Product product) {
		return productRepository.save(product);
	}
	
	public Product updateProduct(Long id, Product productDetails) {
		Product product = productRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("Product not found"));
		product.setName(productDetails.getName());
		product.setDescription(productDetails.getDescription());
		product.setPrice(productDetails.getPrice());
		product.setCategory(productDetails.getCategory());
		product.setStockQuantity(productDetails.getStockQuantity());
		return productRepository.save(product);
	}
	
	public void deleteProduct(Long id) {
		productRepository.deleteById(id);
	}
}



package com.smartshop.product.controller;

import com.smartshop.common.ApiResponse;
import com.smartshop.product.model.Product;
import com.smartshop.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@GetMapping
	public ResponseEntity<ApiResponse<List<Product>>> getAllProducts() {
		List<Product> products = productService.getAllProducts();
		return ResponseEntity.ok(ApiResponse.success(products));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Long id) {
		return productService.getProductById(id)
			.map(product -> ResponseEntity.ok(ApiResponse.success(product)))
			.orElse(ResponseEntity.ok(ApiResponse.error("Product not found")));
	}
	
	@GetMapping("/category/{category}")
	public ResponseEntity<ApiResponse<List<Product>>> getProductsByCategory(@PathVariable String category) {
		List<Product> products = productService.getProductsByCategory(category);
		return ResponseEntity.ok(ApiResponse.success(products));
	}
	
	@GetMapping("/search")
	public ResponseEntity<ApiResponse<List<Product>>> searchProducts(@RequestParam String keyword) {
		List<Product> products = productService.searchProducts(keyword);
		return ResponseEntity.ok(ApiResponse.success(products));
	}
	
	@PostMapping
	public ResponseEntity<ApiResponse<Product>> createProduct(@RequestBody Product product) {
		Product createdProduct = productService.createProduct(product);
		return ResponseEntity.ok(ApiResponse.success("Product created successfully", createdProduct));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<Product>> updateProduct(@PathVariable Long id, @RequestBody Product product) {
		Product updatedProduct = productService.updateProduct(id, product);
		return ResponseEntity.ok(ApiResponse.success("Product updated successfully", updatedProduct));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Object>> deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
	}
}



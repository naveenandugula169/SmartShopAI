package com.smartshop.cart.controller;

import com.smartshop.cart.model.Cart;
import com.smartshop.cart.service.CartService;
import com.smartshop.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	@GetMapping("/{userId}")
	public ResponseEntity<ApiResponse<Cart>> getCart(@PathVariable Long userId) {
		Cart cart = cartService.getOrCreateCart(userId);
		return ResponseEntity.ok(ApiResponse.success(cart));
	}
	
	@PostMapping("/{userId}/add")
	public ResponseEntity<ApiResponse<Cart>> addToCart(
		@PathVariable Long userId,
		@RequestParam Long productId,
		@RequestParam(defaultValue = "1") Integer quantity) {
		Cart cart = cartService.addItemToCart(userId, productId, quantity);
		return ResponseEntity.ok(ApiResponse.success("Item added to cart", cart));
	}
	
	@DeleteMapping("/{userId}/item/{itemId}")
	public ResponseEntity<ApiResponse<Cart>> removeFromCart(
		@PathVariable Long userId,
		@PathVariable Long itemId) {
		Cart cart = cartService.removeItemFromCart(userId, itemId);
		return ResponseEntity.ok(ApiResponse.success("Item removed from cart", cart));
	}
	
	@DeleteMapping("/{userId}/clear")
	public ResponseEntity<ApiResponse<Object>> clearCart(@PathVariable Long userId) {
		cartService.clearCart(userId);
		return ResponseEntity.ok(ApiResponse.success("Cart cleared", null));
	}
}


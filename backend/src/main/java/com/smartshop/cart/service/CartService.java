package com.smartshop.cart.service;

import com.smartshop.cart.model.Cart;
import com.smartshop.cart.model.CartItem;
import com.smartshop.cart.repository.CartRepository;
import com.smartshop.product.model.Product;
import com.smartshop.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CartService {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	public Cart getOrCreateCart(Long userId) {
		return cartRepository.findByUserId(userId)
			.orElseGet(() -> {
				Cart cart = new Cart();
				cart.setUserId(userId);
				return cartRepository.save(cart);
			});
	}
	
	@Transactional
	public Cart addItemToCart(Long userId, Long productId, Integer quantity) {
		Product product = productRepository.findById(productId)
			.orElseThrow(() -> new IllegalArgumentException("Product not found"));
		
		Cart cart = getOrCreateCart(userId);
		
		Optional<CartItem> existingItem = cart.getItems().stream()
			.filter(item -> item.getProductId().equals(productId))
			.findFirst();
		
		if (existingItem.isPresent()) {
			CartItem item = existingItem.get();
			item.setQuantity(item.getQuantity() + quantity);
		} else {
			CartItem newItem = new CartItem();
			newItem.setCart(cart);
			newItem.setProductId(productId);
			newItem.setProductName(product.getName());
			newItem.setPrice(product.getPrice());
			newItem.setQuantity(quantity);
			cart.getItems().add(newItem);
		}
		
		cart.calculateTotal();
		return cartRepository.save(cart);
	}
	
	@Transactional
	public Cart removeItemFromCart(Long userId, Long itemId) {
		Cart cart = getOrCreateCart(userId);
		cart.getItems().removeIf(item -> item.getId().equals(itemId));
		cart.calculateTotal();
		return cartRepository.save(cart);
	}
	
	@Transactional
	public Cart clearCart(Long userId) {
		Cart cart = getOrCreateCart(userId);
		cart.getItems().clear();
		cart.setTotalAmount(java.math.BigDecimal.ZERO);
		return cartRepository.save(cart);
	}
}


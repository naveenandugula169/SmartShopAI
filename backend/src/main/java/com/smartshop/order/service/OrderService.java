package com.smartshop.order.service;

import com.smartshop.cart.model.Cart;
import com.smartshop.cart.model.CartItem;
import com.smartshop.cart.repository.CartRepository;
import com.smartshop.order.model.Order;
import com.smartshop.order.model.OrderItem;
import com.smartshop.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	public List<Order> getOrdersByUserId(Long userId) {
		return orderRepository.findByUserId(userId);
	}
	
	public Optional<Order> getOrderById(Long id) {
		return orderRepository.findById(id);
	}
	
	@Transactional
	public Order createOrderFromCart(Long userId, String shippingAddress, String paymentMethod) {
		Cart cart = cartRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("Cart is empty"));
		
		if (cart.getItems().isEmpty()) {
			throw new IllegalArgumentException("Cannot create order from empty cart");
		}
		
		Order order = new Order();
		order.setUserId(userId);
		order.setTotalAmount(cart.getTotalAmount());
		order.setShippingAddress(shippingAddress);
		order.setPaymentMethod(paymentMethod);
		order.setStatus(Order.OrderStatus.PENDING);
		
		for (CartItem cartItem : cart.getItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(order);
			orderItem.setProductId(cartItem.getProductId());
			orderItem.setProductName(cartItem.getProductName());
			orderItem.setPrice(cartItem.getPrice());
			orderItem.setQuantity(cartItem.getQuantity());
			order.getItems().add(orderItem);
		}
		
		Order savedOrder = orderRepository.save(order);
		
		// Clear cart after order creation
		cart.getItems().clear();
		cart.setTotalAmount(java.math.BigDecimal.ZERO);
		cartRepository.save(cart);
		
		return savedOrder;
	}
	
	@Transactional
	public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
		Order order = orderRepository.findById(orderId)
			.orElseThrow(() -> new IllegalArgumentException("Order not found"));
		order.setStatus(status);
		return orderRepository.save(order);
	}
}



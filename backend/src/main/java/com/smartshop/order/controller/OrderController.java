package com.smartshop.order.controller;

import com.smartshop.common.ApiResponse;
import com.smartshop.order.model.Order;
import com.smartshop.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<ApiResponse<List<Order>>> getOrdersByUserId(@PathVariable Long userId) {
		List<Order> orders = orderService.getOrdersByUserId(userId);
		return ResponseEntity.ok(ApiResponse.success(orders));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<Order>> getOrderById(@PathVariable Long id) {
		return orderService.getOrderById(id)
			.map(order -> ResponseEntity.ok(ApiResponse.success(order)))
			.orElse(ResponseEntity.ok(ApiResponse.error("Order not found")));
	}
	
	@PostMapping("/create")
	public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody Map<String, Object> request) {
		Long userId = Long.valueOf(request.get("userId").toString());
		String shippingAddress = request.get("shippingAddress").toString();
		String paymentMethod = request.getOrDefault("paymentMethod", "CASH").toString();
		
		Order order = orderService.createOrderFromCart(userId, shippingAddress, paymentMethod);
		return ResponseEntity.ok(ApiResponse.success("Order created successfully", order));
	}
	
	@PutMapping("/{id}/status")
	public ResponseEntity<ApiResponse<Order>> updateOrderStatus(
		@PathVariable Long id,
		@RequestParam String status) {
		Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
		Order order = orderService.updateOrderStatus(id, orderStatus);
		return ResponseEntity.ok(ApiResponse.success("Order status updated", order));
	}
}



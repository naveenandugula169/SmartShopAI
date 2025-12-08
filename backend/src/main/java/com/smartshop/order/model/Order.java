package com.smartshop.order.model;

import com.smartshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@EqualsAndHashCode(callSuper = true)
public class Order extends BaseEntity {
	
	@Column(nullable = false)
	private Long userId;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> items = new ArrayList<>();
	
	@Column(nullable = false)
	private BigDecimal totalAmount;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus status = OrderStatus.PENDING;
	
	private String shippingAddress;
	
	private String paymentMethod;
	
	public enum OrderStatus {
		PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
	}
}



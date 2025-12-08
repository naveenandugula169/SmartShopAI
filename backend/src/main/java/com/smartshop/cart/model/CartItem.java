package com.smartshop.cart.model;

import com.smartshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items")
@Data
@EqualsAndHashCode(callSuper = true)
public class CartItem extends BaseEntity {
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cart_id", nullable = false)
	private Cart cart;
	
	@Column(nullable = false)
	private Long productId;
	
	private String productName;
	
	private BigDecimal price;
	
	private Integer quantity = 1;
}


package com.smartshop.product.model;

import com.smartshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseEntity {
	
	@Column(nullable = false)
	private String name;
	
	@Column(length = 1000)
	private String description;
	
	@Column(nullable = false)
	private BigDecimal price;
	
	private String category;
	
	private String imageUrl;
	
	private Integer stockQuantity;
	
	private Double rating = 0.0;
}



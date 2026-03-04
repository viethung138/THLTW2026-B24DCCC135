import { useEffect, useState } from 'react';
import type { Order, Product } from '../types';

const initProducts: Product[] = [
	{ id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
	{ id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
	{ id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
	{ id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
	{ id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
	{ id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
];

export default function useStore() {
	const [products, setProducts] = useState<Product[]>(() => {
		return JSON.parse(localStorage.getItem('products') || 'null') ?? initProducts;
	});
	const [orders, setOrders] = useState<Order[]>(() => {
		return JSON.parse(localStorage.getItem('orders') || '[]');
	});

	useEffect(() => {
		setProducts(JSON.parse(localStorage.getItem('products') || 'null') ?? initProducts);
		setOrders(JSON.parse(localStorage.getItem('orders') || '[]'));
	}, []);

	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(products));
	}, [products]);

	useEffect(() => {
		localStorage.setItem('orders', JSON.stringify(orders));
	}, [orders]);

	return { products, setProducts, orders, setOrders };
}
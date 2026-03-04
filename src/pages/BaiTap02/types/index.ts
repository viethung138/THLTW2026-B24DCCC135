export interface Product {
	id: number;
	name: string;
	category: string;
	price: number;
	quantity: number;
}

export interface OrderProduct {
	productId: number;
	productName: string;
	quantity: number;
	price: number;
}

export type OrderStatus = 'Chờ xử lý' | 'Đang giao' | 'Hoàn thành' | 'Đã hủy';

export interface Order {
	id: string;
	customerName: string;
	phone: string;
	address: string;
	products: OrderProduct[];
	totalAmount: number;
	status: OrderStatus;
	createdAt: string;
}
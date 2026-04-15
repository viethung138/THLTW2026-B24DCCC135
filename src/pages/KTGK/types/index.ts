export interface Customer {
	id: number;
	name: string;
	phone: string;
	address: string;
}

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
	total: number;
}

export type OrderStatus = 'Chờ xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Hủy';

export interface Order {
	id: string;
	customerId: number;
	customerName: string;
	phone: string;
	address: string;
	products: OrderProduct[];
	totalAmount: number;
	status: OrderStatus;
	createdAt: string;
	updatedAt: string;
}

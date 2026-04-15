import { Button, Card, Statistic, Row, Col, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import useStore from './models/store';
import type { Order } from './types';
import OrderTable from './components/OrderTable';
import OrderFormModal from './components/OrderForm';

const KTGK: React.FC = () => {
	const { customers, products, orders, setOrders } = useStore();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	const handleAddOrder = () => {
		setSelectedOrder(null);
		setIsModalVisible(true);
	};

	const handleEditOrder = (order: Order) => {
		setSelectedOrder(order);
		setIsModalVisible(true);
	};

	const handleDeleteOrder = (orderId: string) => {
		const updatedOrders = orders.filter((o: Order) => o.id !== orderId);
		setOrders(updatedOrders);
		message.success('Hủy đơn hàng thành công');
	};

	const handleSaveOrder = (order: Order) => {
		const existingIndex = orders.findIndex((o: Order) => o.id === order.id);

		if (existingIndex >= 0) {
			const updatedOrders = [...orders];
			updatedOrders[existingIndex] = order;
			setOrders(updatedOrders);
		} else {
			setOrders([...orders, order]);
		}

		setIsModalVisible(false);
	};

	const completedOrders = orders.filter((o: Order) => o.status === 'Hoàn thành').length;
	const totalRevenue = orders
		.filter((o: Order) => o.status === 'Hoàn thành')
		.reduce((sum: number, o: Order) => sum + o.totalAmount, 0);
	const pendingOrders = orders.filter((o: Order) => o.status === 'Chờ xác nhận').length;

	const existingOrderIds = orders.map((o: Order) => o.id);

	return (
		<div>
			<Row gutter={16} style={{ marginBottom: 24 }}>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic title='Tổng đơn hàng' value={orders.length} />
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic title='Đơn chờ xác nhận' value={pendingOrders} />
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic title='Đơn hoàn thành' value={completedOrders} />
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title='Doanh thu'
							value={totalRevenue}
							formatter={(value) =>
								(value as number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
							}
						/>
					</Card>
				</Col>
			</Row>


			<Card title='Quản lý đơn hàng'>
				<Space style={{ marginBottom: 16 }}>
					<Button type='primary' icon={<PlusOutlined />} onClick={handleAddOrder}>
						Thêm đơn hàng
					</Button>
				</Space>

				<OrderTable orders={orders} onEdit={handleEditOrder} onDelete={handleDeleteOrder} />
			</Card>

			<OrderFormModal
				visible={isModalVisible}
				order={selectedOrder}
				customers={customers}
				products={products}
				existingOrderIds={existingOrderIds}
				onSave={handleSaveOrder}
				onCancel={() => setIsModalVisible(false)}
			/>
		</div>
	);
};

export default KTGK;

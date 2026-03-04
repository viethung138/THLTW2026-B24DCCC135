import { Card, Col, Progress, Row, Statistic } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import type { Order, Product } from '../types';

const Dashboard: React.FC = () => {
	const { products, orders } = useModel('store') as unknown as {
		products: Product[];
		orders: Order[];
	};

	const revenue = orders
		.filter((order) => order.status === 'Hoàn thành')
		.reduce((sum, order) => sum + order.totalAmount, 0);

	const statusCount = (status: string): number => orders.filter((order) => order.status === status).length;

	const completedPercent = orders.length === 0 ? 0 : Math.min(100, (statusCount('Hoàn thành') / orders.length) * 100);

	return (
		<Row gutter={16}>
			<Col span={6}>
				<Card>
					<Statistic title='Tổng sản phẩm' value={products.length} />
				</Card>
			</Col>

			<Col span={6}>
				<Card>
					<Statistic title='Tổng đơn hàng' value={orders.length} />
				</Card>
			</Col>

			<Col span={6}>
				<Card>
					<Statistic title='Doanh thu' value={revenue} />
				</Card>
			</Col>

			<Col span={6}>
				<Card title='Trạng thái đơn'>
					<Progress percent={completedPercent} status='success' />
				</Card>
			</Col>
		</Row>
	);
};

export default Dashboard;
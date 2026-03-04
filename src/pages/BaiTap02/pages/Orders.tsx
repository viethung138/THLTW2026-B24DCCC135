import { Table, Tag } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import type { Order } from '../types';

const Orders: React.FC = () => {
	const { orders } = useModel('store') as unknown as {
		orders: Order[];
	};

	return (
		<Table<Order>
			rowKey='id'
			dataSource={orders}
			columns={[
				{
					title: 'Mã đơn',
					dataIndex: 'id',
				},
				{
					title: 'Khách hàng',
					dataIndex: 'customerName',
				},
				{
					title: 'Số sản phẩm',
					render: (_, record) => record.products.length,
				},
				{
					title: 'Tổng tiền',
					dataIndex: 'totalAmount',
					render: (v: number) => v.toLocaleString('vi-VN'),
				},
				{
					title: 'Trạng thái',
					dataIndex: 'status',
					render: (status: Order['status']) => {
						const colorMap: Record<Order['status'], string> = {
							'Chờ xử lý': 'default',
							'Đang giao': 'blue',
							'Hoàn thành': 'green',
							'Đã hủy': 'red',
						};

						return <Tag color={colorMap[status]}>{status}</Tag>;
					},
				},
				{
					title: 'Ngày tạo',
					dataIndex: 'createdAt',
				},
			]}
		/>
	);
};

export default Orders;
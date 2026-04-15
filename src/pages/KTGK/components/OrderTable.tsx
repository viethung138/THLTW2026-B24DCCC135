import { Button, Input, Popconfirm, Select, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Order } from '../types';

interface OrderTableProps {
	orders: Order[];
	onEdit: (order: Order) => void;
	onDelete: (orderId: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onEdit, onDelete }) => {
	const [searchText, setSearchText] = useState('');
	const [statusFilter, setStatusFilter] = useState<string | undefined>();
	const [sortBy, setSortBy] = useState<'createdAt' | 'totalAmount'>('createdAt');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

	const filteredOrders = useMemo(() => {
		let filtered = orders.filter((order) => {
			const matchSearch =
				order.id.toLowerCase().includes(searchText.toLowerCase()) ||
				order.customerName.toLowerCase().includes(searchText.toLowerCase());
			const matchStatus = !statusFilter || order.status === statusFilter;
			return matchSearch && matchStatus;
		});

		filtered.sort((a, b) => {
			let aValue = sortBy === 'createdAt' ? new Date(a.createdAt).getTime() : a.totalAmount;
			let bValue = sortBy === 'createdAt' ? new Date(b.createdAt).getTime() : b.totalAmount;

			if (sortOrder === 'asc') {
				return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
			} else {
				return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
			}
		});

		return filtered;
	}, [orders, searchText, statusFilter, sortBy, sortOrder]);

	const columns: ColumnsType<Order> = [
		{
			title: 'Mã đơn hàng',
			dataIndex: 'id',
			key: 'id',
			width: 120,
		},
		{
			title: 'Khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
			width: 150,
		},
		{
			title: 'Điện thoại',
			dataIndex: 'phone',
			key: 'phone',
			width: 120,
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Số sản phẩm',
			key: 'productCount',
			render: (_, record) => record.products.length,
			width: 100,
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'totalAmount',
			key: 'totalAmount',
			width: 120,
			render: (value: number) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
		},
		{
			title: 'Ngày đặt',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 120,
			render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			width: 120,
			render: (status: string) => {
				const colorMap: Record<string, string> = {
					'Chờ xác nhận': 'blue',
					'Đang giao': 'orange',
					'Hoàn thành': 'green',
					'Hủy': 'red',
				};
				return <Tag color={colorMap[status]}>{status}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 120,
			render: (_, record) => (
				<Space>
					<Button
						type='primary'
						size='small'
						icon={<EditOutlined />}
						onClick={() => onEdit(record)}
						title='Chỉnh sửa'
					/>
					<Popconfirm
						title={
							record.status === 'Chờ xác nhận'
								? 'Bạn có chắc chắn muốn hủy đơn hàng này?'
								: `Không thể hủy đơn hàng ở trạng thái "${record.status}"`
						}
						onConfirm={() => {
							if (record.status === 'Chờ xác nhận') {
								onDelete(record.id);
							}
						}}
						okText='Có'
						cancelText='Không'
						okButtonProps={{ danger: true }}
						disabled={record.status !== 'Chờ xác nhận'}
					>
						<Button
							danger
							size='small'
							icon={<DeleteOutlined />}
							disabled={record.status !== 'Chờ xác nhận'}
							title={record.status === 'Chờ xác nhận' ? 'Hủy' : 'Chỉ hủy được ở trạng thái "Chờ xác nhận"'}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div>
			<Space style={{ marginBottom: 16 }} wrap>
				<Input
					placeholder='Tìm kiếm theo mã đơn hoặc khách hàng...'
					prefix={<SearchOutlined />}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					style={{ width: 300 }}
				/>
				<Select
					placeholder='Lọc theo trạng thái'
					style={{ width: 150 }}
					allowClear
					value={statusFilter}
					onChange={setStatusFilter}
					options={[
						{ label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
						{ label: 'Đang giao', value: 'Đang giao' },
						{ label: 'Hoàn thành', value: 'Hoàn thành' },
						{ label: 'Hủy', value: 'Hủy' },
					]}
				/>
				<Select
					value={sortBy}
					onChange={setSortBy}
					style={{ width: 150 }}
					options={[
						{ label: 'Sắp xếp theo ngày', value: 'createdAt' },
						{ label: 'Sắp xếp theo tiền', value: 'totalAmount' },
					]}
				/>
				<Select
					value={sortOrder}
					onChange={setSortOrder}
					style={{ width: 120 }}
					options={[
						{ label: 'Mới nhất', value: 'desc' },
						{ label: 'Cũ nhất', value: 'asc' },
					]}
				/>
			</Space>
			<Table<Order>
				rowKey='id'
				dataSource={filteredOrders}
				columns={columns}
				pagination={{
					pageSize: 10,
					showTotal: (total) => `Tổng ${total} đơn hàng`,
				}}
				scroll={{ x: 1200 }}
			/>
		</div>
	);
};

export default OrderTable;

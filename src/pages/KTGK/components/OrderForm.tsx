import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, Table, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import type { Moment } from 'moment';
import type { Customer, Order, OrderProduct, Product } from '../types';

interface OrderFormModalProps {
	visible: boolean;
	order: Order | null;
	customers: Customer[];
	products: Product[];
	existingOrderIds: string[];
	onSave: (order: Order) => void;
	onCancel: () => void;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({
	visible,
	order,
	customers,
	products,
	existingOrderIds,
	onSave,
	onCancel,
}) => {
	const [form] = Form.useForm();
	const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
	const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
	const [selectedProductId, setSelectedProductId] = useState<number | undefined>();
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
	const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

	useEffect(() => {
		if (visible && order) {
			const customer = customers.find((c) => c.id === order.customerId);
			setSelectedCustomer(customer || null);
			setSelectedProducts(order.products);
			setSelectedDate(moment(order.createdAt));
			form.setFieldsValue({
				id: order.id,
				customerId: order.customerId,
				status: order.status,
				createdAt: moment(order.createdAt),
			});
		} else if (visible) {
			form.resetFields();
			setSelectedProducts([]);
			setSelectedCustomer(null);
			setSelectedProductId(undefined);
			setSelectedQuantity(1);
			setSelectedDate(moment());
		}
	}, [visible, order, customers, form]);

	const totalAmount = useMemo(() => {
		return selectedProducts.reduce((sum, p) => sum + p.total, 0);
	}, [selectedProducts]);

	const handleAddProduct = () => {
		if (!selectedProductId || selectedQuantity <= 0) {
			message.error('Vui lòng chọn sản phẩm và nhập số lượng');
			return;
		}

		const product = products.find((p) => p.id === selectedProductId);
		if (!product) {
			message.error('Sản phẩm không tồn tại');
			return;
		}

		if (selectedQuantity > product.quantity) {
			message.error(`Số lượng tồn kho chỉ có ${product.quantity}`);
			return;
		}

		const existingProductIndex = selectedProducts.findIndex((p) => p.productId === selectedProductId);
		if (existingProductIndex >= 0) {
			message.warning('Sản phẩm này đã được chọn');
			return;
		}

		const newProduct: OrderProduct = {
			productId: product.id,
			productName: product.name,
			quantity: selectedQuantity,
			price: product.price,
			total: product.price * selectedQuantity,
		};

		setSelectedProducts([...selectedProducts, newProduct]);
		setSelectedProductId(undefined);
		setSelectedQuantity(1);
	};

	const handleRemoveProduct = (productId: number) => {
		setSelectedProducts(selectedProducts.filter((p) => p.productId !== productId));
	};

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();

			if (!selectedCustomer) {
				message.error('Vui lòng chọn khách hàng');
				return;
			}

			if (!values.status) {
				message.error('Vui lòng chọn trạng thái đơn hàng');
				return;
			}

			if (selectedProducts.length === 0) {
				message.error('Vui lòng chọn ít nhất một sản phẩm');
				return;
			}

			if (!order && existingOrderIds.includes(values.id)) {
				message.error('Mã đơn hàng đã tồn tại');
				return;
			}

			const createdDate = selectedDate?.toISOString() || moment().toISOString();

			const newOrder: Order = {
				id: values.id || `ORD-${Date.now()}`,
				customerId: selectedCustomer.id,
				customerName: selectedCustomer.name,
				phone: selectedCustomer.phone,
				address: selectedCustomer.address,
				products: selectedProducts,
				totalAmount,
				status: values.status,
				createdAt: order?.createdAt || createdDate,
				updatedAt: new Date().toISOString(),
			};

			onSave(newOrder);
			message.success(order ? 'Cập nhật đơn hàng thành công' : 'Thêm đơn hàng thành công');
		} catch {}
	}

	const productColumns: ColumnsType<OrderProduct> = [
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
			width: 80,
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			width: 100,
			render: (value: number) => value.toLocaleString('vi-VN'),
		},
		{
			title: 'Thành tiền',
			dataIndex: 'total',
			key: 'total',
			width: 110,
			render: (value: number) => value.toLocaleString('vi-VN'),
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 80,
			render: (_, record) => (
				<Button
					danger
					size='small'
					icon={<DeleteOutlined />}
					onClick={() => handleRemoveProduct(record.productId)}
				/>
			),
		},
	];

	return (
		<Modal
			title={order ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'}
			visible={visible}
			onOk={handleSubmit}
			onCancel={onCancel}
			width={900}
			okText='Lưu'
			cancelText='Hủy'
		>
			<Form form={form} layout='vertical'>
				<Form.Item
					label='Mã đơn hàng'
					name='id'
					rules={[
						{ required: !order, message: 'Vui lòng nhập mã đơn hàng' },
						{ min: 3, message: 'Mã đơn hàng phải có ít nhất 3 ký tự' },
					]}
				>
					<Input placeholder='ORD-001' disabled={!!order} />
				</Form.Item>

				<Form.Item label='Khách hàng' required>
					<Select
						placeholder='Chọn khách hàng'
						value={selectedCustomer?.id}
						onChange={(customerId) => {
							const customer = customers.find((c) => c.id === customerId);
							setSelectedCustomer(customer || null);
						}}
						options={customers.map((c) => ({
							label: `${c.name} - ${c.phone}`,
							value: c.id,
						}))}
					/>
				</Form.Item>

				<Form.Item
					label='Ngày đặt hàng'
					name='createdAt'
					rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng' }]}
				>
					<DatePicker
						placeholder='Chọn ngày'
						style={{ width: '100%' }}
						value={selectedDate}
						onChange={(date) => setSelectedDate(date)}
						format='DD/MM/YYYY'
					/>
				</Form.Item>

				<div style={{ marginBottom: 16 }}>
					<label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
						Chọn sản phẩm
					</label>
					<Space wrap>
						<Select
							placeholder='Chọn sản phẩm'
							style={{ width: 300 }}
							value={selectedProductId}
							onChange={setSelectedProductId}
							options={products
								.filter((p) => !selectedProducts.find((sp) => sp.productId === p.id))
								.map((p) => ({
									label: `${p.name} - ${p.price.toLocaleString('vi-VN')} (Tồn: ${p.quantity})`,
									value: p.id,
								}))}
						/>
						<InputNumber
							placeholder='Số lượng'
							value={selectedQuantity}
							onChange={(val) => setSelectedQuantity(val || 1)}
							min={1}
							style={{ width: 100 }}
						/>
						<Button
							type='primary'
							icon={<PlusOutlined />}
							onClick={handleAddProduct}
						>
							Thêm
						</Button>
					</Space>
				</div>

				<Table<OrderProduct>
					rowKey='productId'
					dataSource={selectedProducts}
					columns={productColumns}
					pagination={false}
					scroll={{ x: 600 }}
					style={{ marginBottom: 16 }}
				/>

				<div style={{ textAlign: 'right', marginBottom: 16, fontSize: 16, fontWeight: 'bold' }}>
					Tổng tiền: {totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
				</div>

				<Form.Item label='Trạng thái' name='status' rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng' }]}>
					<Select
						placeholder='Chọn trạng thái'
						options={[
							{ label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
							{ label: 'Đang giao', value: 'Đang giao' },
							{ label: 'Hoàn thành', value: 'Hoàn thành' },
							{ label: 'Hủy', value: 'Hủy' },
						]}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default OrderFormModal;

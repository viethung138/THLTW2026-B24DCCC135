import { useModel } from 'umi';
import { Input, Select, Slider, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import type { Product } from '../types';

const Products: React.FC = () => {
	const { products } = useModel('store');
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState<string>();
	const [price, setPrice] = useState<[number, number]>([0, 50000000]);

	const getStatus = (q: number) => {
		if (q === 0) return <Tag color='red'>Hết hàng</Tag>;
		if (q <= 10) return <Tag color='orange'>Sắp hết</Tag>;
		return <Tag color='green'>Còn hàng</Tag>;
	};

	const filtered = useMemo(() => {
		return products.filter(
			(p: Product) =>
				p.name.toLowerCase().includes(keyword.toLowerCase()) &&
				(!category || p.category === category) &&
				p.price >= price[0] &&
				p.price <= price[1],
		);
	}, [products, keyword, category, price]);

	const columns: ColumnsType<Product> = [
		{ title: 'STT', render: (_, __, i) => i + 1 },
		{ title: 'Tên', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
		{ title: 'Danh mục', dataIndex: 'category' },
		{ title: 'Giá', dataIndex: 'price', sorter: (a, b) => a.price - b.price },
		{ title: 'Tồn kho', dataIndex: 'quantity', sorter: (a, b) => a.quantity - b.quantity },
		{ title: 'Trạng thái', render: (_, r) => getStatus(r.quantity) },
	];

	return (
		<>
			<Input.Search placeholder='Tìm tên sản phẩm' onSearch={setKeyword} />
			<Select placeholder='Danh mục' onChange={setCategory} allowClear style={{ width: 200 }} />
			<Slider range max={50000000} onChange={setPrice} />
			<Table rowKey='id' columns={columns} dataSource={filtered} pagination={{ pageSize: 5 }} />
		</>
	);
};

export default Products;
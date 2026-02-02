import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import DrawerSanPham from './components/DrawerSanPham';
import BangSanPham from './components/Table';

const TrangSanPham = () => {
	const { danhSachSanPham } = useModel('BaiTap01.sanpham');

	const [searchText, setSearchText] = useState<string>('');
	const [moDrawer, setMoDrawer] = useState<boolean>(false);

	const danhSachLoc = danhSachSanPham.filter((sp) => sp.ten.toLowerCase().includes(searchText.toLowerCase()));

	return (
		<div style={{ padding: 24 }}>
			<Space style={{ marginBottom: 16 }}>
				<Input.Search
					placeholder='Tìm kiếm theo tên sản phẩm'
					allowClear
					onChange={(e) => setSearchText(e.target.value)}
					style={{ width: 300 }}
				/>

				<Button type='primary' icon={<PlusOutlined />} onClick={() => setMoDrawer(true)}>
					Thêm sản phẩm
				</Button>
			</Space>

			<BangSanPham duLieu={danhSachLoc} />

			<DrawerSanPham mo={moDrawer} dong={() => setMoDrawer(false)} />
		</div>
	);
};

export default TrangSanPham;
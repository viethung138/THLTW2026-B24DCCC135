
import { Button, message, Popconfirm, Table } from 'antd';
import { useModel } from 'umi';
import type { SanPham } from '../models/sanpham';

interface Props {
	duLieu: SanPham[];
}

const BangSanPham = ({ duLieu }: Props) => {
	const { xoaSanPham } = useModel('BaiTap01.sanpham');

	const cot = [
		{
			title: 'STT',
			render: (_: unknown, __: unknown, index: number) => index + 1,
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'ten',
		},
		{
			title: 'Giá (VNĐ)',
			dataIndex: 'gia',
			render: (gia: number) => gia.toLocaleString(),
		},
		{
			title: 'Số lượng',
			dataIndex: 'soLuong',
		},
		{
			title: 'Thao tác',
			render: (_: unknown, record: SanPham) => (
				<>
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa?'
						onConfirm={() => {
							xoaSanPham(record.id);
							message.success('Xóa sản phẩm thành công');
						}}
					>
						<Button type='link' danger>
							Xóa
						</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return <Table<SanPham> rowKey='id' columns={cot} dataSource={duLieu} />;
};

export default BangSanPham;

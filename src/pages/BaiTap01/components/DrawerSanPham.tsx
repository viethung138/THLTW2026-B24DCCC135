import { Button, Drawer, Form, Input, InputNumber, message } from 'antd';
import { useModel } from 'umi';
import type { SanPham } from '../models/sanpham';

interface Props {
	mo: boolean;
	dong: () => void;
}

const DrawerSanPham: React.FC<Props> = ({ mo, dong }) => {
	const [form] = Form.useForm<SanPham>();
	const { themSanPham } = useModel('BaiTap01.sanpham');

	const xuLyLuu = (giaTri: SanPham) => {
		themSanPham({
			...giaTri,
			id: Date.now(),
		});
		message.success('Thêm sản phẩm thành công');
		form.resetFields();
		dong();
	};

	return (
		<Drawer
			title='Thêm sản phẩm'
			visible={mo}
			onClose={dong}
			width={400}
			footer={
				<Button type='primary' onClick={() => form.submit()}>
					Lưu
				</Button>
			}
		>
			<Form layout='vertical' form={form} onFinish={xuLyLuu}>
				<Form.Item label='Tên sản phẩm' name='ten' rules={[{ required: true, message: 'Bắt buộc nhập tên' }]}>
					<Input />
				</Form.Item>

				<Form.Item
					label='Giá'
					name='gia'
					rules={[{ required: true }, { type: 'number', min: 1, message: 'Giá phải > 0' }]}
				>
					<InputNumber style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					label='Số lượng'
					name='soLuong'
					rules={[{ required: true }, { type: 'number', min: 1, message: 'Số lượng phải > 0' }]}
				>
					<InputNumber style={{ width: '100%' }} />
				</Form.Item>
			</Form>
		</Drawer>
	);
};

export default DrawerSanPham;
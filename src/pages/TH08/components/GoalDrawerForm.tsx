import { useEffect } from 'react';
import { Drawer, Form, Input, Select, InputNumber, DatePicker, Button, Space } from 'antd';
import moment from 'moment';
import type { Goal } from '../types';

interface GoalDrawerFormProps {
  open: boolean;
  onSubmit: (goal: Goal) => void;
  onClose: () => void;
}

export default function GoalDrawerForm({ open, onSubmit, onClose }: GoalDrawerFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({
        status: 'in_progress',
        deadline: moment().add(1, 'month'),
        currentValue: 0,
      });
    }
  }, [open, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const goal: Goal = {
        id: `g_${Date.now()}`,
        name: values.name,
        type: values.type,
        targetValue: values.targetValue,
        currentValue: values.currentValue || 0,
        unit: values.unit,
        deadline: values.deadline.format('YYYY-MM-DD'),
        status: values.status,
      };
      onSubmit(goal);
      form.resetFields();
    });
  };

  return (
    <Drawer
      title="Thêm mục tiêu mới"
      open={open}
      onClose={onClose}
      width={480}
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" onClick={handleSubmit}>
            Tạo mục tiêu
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên mục tiêu"
          rules={[{ required: true, message: 'Vui lòng nhập tên mục tiêu' }]}
        >
          <Input placeholder="Ví dụ: Giảm cân xuống 70kg" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại mục tiêu"
          rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
        >
          <Select placeholder="Chọn loại mục tiêu">
            <Select.Option value="weight_loss">Giảm cân</Select.Option>
            <Select.Option value="muscle_gain">Tăng cơ</Select.Option>
            <Select.Option value="endurance">Cải thiện sức bền</Select.Option>
            <Select.Option value="other">Khác</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="targetValue"
          label="Giá trị mục tiêu"
          rules={[{ required: true, message: 'Vui lòng nhập giá trị mục tiêu' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Ví dụ: 70" />
        </Form.Item>

        <Form.Item name="currentValue" label="Giá trị hiện tại">
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Ví dụ: 75" />
        </Form.Item>

        <Form.Item
          name="unit"
          label="Đơn vị"
          rules={[{ required: true, message: 'Vui lòng nhập đơn vị' }]}
        >
          <Input placeholder="Ví dụ: kg, phút, buổi" />
        </Form.Item>

        <Form.Item
          name="deadline"
          label="Deadline"
          rules={[{ required: true, message: 'Vui lòng chọn deadline' }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select>
            <Select.Option value="in_progress">Đang thực hiện</Select.Option>
            <Select.Option value="achieved">Đã đạt</Select.Option>
            <Select.Option value="cancelled">Đã hủy</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
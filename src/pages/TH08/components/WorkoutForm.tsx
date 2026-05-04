import { useEffect } from 'react';
import { Modal, Form, DatePicker, Select, InputNumber, Input, Radio } from 'antd';
import moment from 'moment';
import type { Workout } from '../types';

interface WorkoutFormProps {
  open: boolean;
  workout: Workout | null;
  onSubmit: (workout: Workout) => void;
  onCancel: () => void;
}

export default function WorkoutForm({ open, workout, onSubmit, onCancel }: WorkoutFormProps) {
  const [form] = Form.useForm();
  const isEdit = !!workout;

  useEffect(() => {
    if (open) {
      if (workout) {
        form.setFieldsValue({
          ...workout,
          date: moment(workout.date),
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          date: moment(),
          status: 'completed',
        });
      }
    }
  }, [open, workout, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const result: Workout = {
        id: workout?.id || `w_${Date.now()}`,
        date: values.date.format('YYYY-MM-DD'),
        type: values.type,
        duration: values.duration,
        calories: values.calories,
        note: values.note || '',
        status: values.status,
      };
      onSubmit(result);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={isEdit ? 'Sửa buổi tập' : 'Thêm buổi tập mới'}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText={isEdit ? 'Cập nhật' : 'Thêm'}
      cancelText="Hủy"
      destroyOnClose
      width={520}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="date"
          label="Ngày tập"
          rules={[{ required: true, message: 'Vui lòng chọn ngày tập' }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại bài tập"
          rules={[{ required: true, message: 'Vui lòng chọn loại bài tập' }]}
        >
          <Select placeholder="Chọn loại bài tập">
            <Select.Option value="Cardio">Cardio</Select.Option>
            <Select.Option value="Strength">Strength</Select.Option>
            <Select.Option value="Yoga">Yoga</Select.Option>
            <Select.Option value="HIIT">HIIT</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="duration"
          label="Thời lượng (phút)"
          rules={[{ required: true, message: 'Vui lòng nhập thời lượng' }]}
        >
          <InputNumber min={1} max={480} style={{ width: '100%' }} placeholder="Ví dụ: 45" />
        </Form.Item>

        <Form.Item
          name="calories"
          label="Calo đốt (kcal)"
          rules={[{ required: true, message: 'Vui lòng nhập calo' }]}
        >
          <InputNumber min={0} max={5000} style={{ width: '100%' }} placeholder="Ví dụ: 350" />
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea rows={3} placeholder="Ghi chú thêm về buổi tập..." />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Radio.Group>
            <Radio value="completed">Hoàn thành</Radio>
            <Radio value="missed">Bỏ lỡ</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
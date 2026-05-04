import { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import type { Exercise, MuscleGroup } from '../types';

interface ExerciseFormProps {
  open: boolean;
  exercise: Exercise | null;
  onSubmit: (exercise: Exercise) => void;
  onCancel: () => void;
}

const muscleGroups: MuscleGroup[] = [
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Core',
  'Full Body',
];

export default function ExerciseForm({ open, exercise, onSubmit, onCancel }: ExerciseFormProps) {
  const [form] = Form.useForm();
  const isEdit = !!exercise;

  useEffect(() => {
    if (open) {
      if (exercise) {
        form.setFieldsValue(exercise);
      } else {
        form.resetFields();
      }
    }
  }, [open, exercise, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const result: Exercise = {
        id: exercise?.id || `e_${Date.now()}`,
        name: values.name,
        muscleGroup: values.muscleGroup,
        difficulty: values.difficulty,
        description: values.description,
        instructions: values.instructions,
        avgCaloriesPerHour: values.avgCaloriesPerHour,
      };
      onSubmit(result);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={isEdit ? 'Sửa bài tập' : 'Thêm bài tập mới'}
      visible={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText={isEdit ? 'Cập nhật' : 'Thêm'}
      cancelText="Hủy"
      destroyOnClose
      width={560}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên bài tập"
          rules={[{ required: true, message: 'Vui lòng nhập tên bài tập' }]}
        >
          <Input placeholder="Ví dụ: Bench Press" />
        </Form.Item>

        <Form.Item
          name="muscleGroup"
          label="Nhóm cơ tác động"
          rules={[{ required: true, message: 'Vui lòng chọn nhóm cơ' }]}
        >
          <Select placeholder="Chọn nhóm cơ">
            {muscleGroups.map((mg) => (
              <Select.Option key={mg} value={mg}>
                {mg}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="difficulty"
          label="Mức độ khó"
          rules={[{ required: true, message: 'Vui lòng chọn mức độ' }]}
        >
          <Select placeholder="Chọn mức độ">
            <Select.Option value="easy">Dễ</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="hard">Khó</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả ngắn"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea rows={2} placeholder="Mô tả ngắn gọn về bài tập" />
        </Form.Item>

        <Form.Item
          name="instructions"
          label="Hướng dẫn thực hiện"
          rules={[{ required: true, message: 'Vui lòng nhập hướng dẫn' }]}
        >
          <Input.TextArea rows={5} placeholder="Hướng dẫn chi tiết từng bước..." />
        </Form.Item>

        <Form.Item
          name="avgCaloriesPerHour"
          label="Calo đốt trung bình/giờ (kcal)"
          rules={[{ required: true, message: 'Vui lòng nhập calo' }]}
        >
          <InputNumber min={50} max={1500} style={{ width: '100%' }} placeholder="Ví dụ: 350" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
import { useEffect, useState } from 'react';
import { Modal, Form, DatePicker, InputNumber, Tag, Space, Typography } from 'antd';
import moment from 'moment';
import type { HealthMetric } from '../types';

const { Text } = Typography;

interface HealthMetricFormProps {
  open: boolean;
  metric: HealthMetric | null;
  onSubmit: (metric: HealthMetric) => void;
  onCancel: () => void;
}

function calcBmi(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
}

function getBmiInfo(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Thiếu cân', color: 'blue' };
  if (bmi < 25) return { label: 'Bình thường', color: 'green' };
  if (bmi < 30) return { label: 'Thừa cân', color: 'gold' };
  return { label: 'Béo phì', color: 'red' };
}

export default function HealthMetricForm({ open, metric, onSubmit, onCancel }: HealthMetricFormProps) {
  const [form] = Form.useForm();
  const isEdit = !!metric;
  const [bmiPreview, setBmiPreview] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      if (metric) {
        form.setFieldsValue({
          ...metric,
          date: moment(metric.date),
        });
        setBmiPreview(metric.bmi);
      } else {
        form.resetFields();
        form.setFieldsValue({ date: moment() });
        setBmiPreview(null);
      }
    }
  }, [open, metric, form]);

  const handleValuesChange = (_: any, allValues: any) => {
    const { weight, height } = allValues;
    if (weight && height && height > 0) {
      setBmiPreview(calcBmi(weight, height));
    } else {
      setBmiPreview(null);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const bmi = calcBmi(values.weight, values.height);
      const result: HealthMetric = {
        id: metric?.id || `h_${Date.now()}`,
        date: values.date.format('YYYY-MM-DD'),
        weight: values.weight,
        height: values.height,
        bmi: Math.round(bmi * 100) / 100,
        heartRate: values.heartRate,
        sleepHours: values.sleepHours,
      };
      onSubmit(result);
      form.resetFields();
      setBmiPreview(null);
    });
  };

  const bmiInfo = bmiPreview ? getBmiInfo(bmiPreview) : null;

  return (
    <Modal
      title={isEdit ? 'Sửa chỉ số sức khỏe' : 'Thêm chỉ số sức khỏe'}
      visible={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText={isEdit ? 'Cập nhật' : 'Thêm'}
      cancelText="Hủy"
      destroyOnClose
      width={480}
    >
      <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
        <Form.Item
          name="date"
          label="Ngày"
          rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Cân nặng (kg)"
          rules={[{ required: true, message: 'Vui lòng nhập cân nặng' }]}
        >
          <InputNumber min={20} max={300} step={0.1} style={{ width: '100%' }} placeholder="Ví dụ: 72.5" />
        </Form.Item>

        <Form.Item
          name="height"
          label="Chiều cao (cm)"
          rules={[{ required: true, message: 'Vui lòng nhập chiều cao' }]}
        >
          <InputNumber min={100} max={250} style={{ width: '100%' }} placeholder="Ví dụ: 175" />
        </Form.Item>

        {/* BMI Preview */}
        {bmiPreview !== null && (
          <div
            style={{
              padding: '12px 16px',
              background: '#fafafa',
              borderRadius: 8,
              marginBottom: 16,
              border: '1px solid #f0f0f0',
            }}
          >
            <Space>
              <Text strong>BMI:</Text>
              <Text style={{ fontSize: 18 }}>{bmiPreview.toFixed(2)}</Text>
              {bmiInfo && <Tag color={bmiInfo.color}>{bmiInfo.label}</Tag>}
            </Space>
          </div>
        )}

        <Form.Item
          name="heartRate"
          label="Nhịp tim lúc nghỉ (bpm)"
          rules={[{ required: true, message: 'Vui lòng nhập nhịp tim' }]}
        >
          <InputNumber min={30} max={200} style={{ width: '100%' }} placeholder="Ví dụ: 68" />
        </Form.Item>

        <Form.Item
          name="sleepHours"
          label="Giờ ngủ"
          rules={[{ required: true, message: 'Vui lòng nhập giờ ngủ' }]}
        >
          <InputNumber min={0} max={24} step={0.5} style={{ width: '100%' }} placeholder="Ví dụ: 7.5" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
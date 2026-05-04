import { useState, useMemo } from 'react';
import { Table, Button, Tag, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import HealthMetricForm from './HealthMetricForm';
import type { HealthMetric } from '../types';

interface HealthMetricsProps {
  metrics: HealthMetric[];
  onSave: (metric: HealthMetric) => void;
  onDelete: (id: string) => void;
}

function getBmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Thiếu cân', color: 'blue' };
  if (bmi < 25) return { label: 'Bình thường', color: 'green' };
  if (bmi < 30) return { label: 'Thừa cân', color: 'gold' };
  return { label: 'Béo phì', color: 'red' };
}

export default function HealthMetrics({ metrics, onSave, onDelete }: HealthMetricsProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMetric, setEditingMetric] = useState<HealthMetric | null>(null);

  const sortedMetrics = useMemo(
    () => [...metrics].sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()),
    [metrics],
  );

  const handleAdd = () => {
    setEditingMetric(null);
    setModalVisible(true);
  };

  const handleEdit = (record: HealthMetric) => {
    setEditingMetric(record);
    setModalVisible(true);
  };

  const handleFormSubmit = (metric: HealthMetric) => {
    onSave(metric);
    setModalVisible(false);
    setEditingMetric(null);
  };

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => moment(date).format('DD/MM/YYYY'),
      sorter: (a: HealthMetric, b: HealthMetric) =>
        moment(a.date).valueOf() - moment(b.date).valueOf(),
    },
    {
      title: 'Cân nặng (kg)',
      dataIndex: 'weight',
      key: 'weight',
      width: 130,
      render: (val: number) => `${val} kg`,
      sorter: (a: HealthMetric, b: HealthMetric) => a.weight - b.weight,
    },
    {
      title: 'Chiều cao (cm)',
      dataIndex: 'height',
      key: 'height',
      width: 130,
      render: (val: number) => `${val} cm`,
    },
    {
      title: 'BMI',
      dataIndex: 'bmi',
      key: 'bmi',
      width: 180,
      render: (bmi: number) => {
        const cat = getBmiCategory(bmi);
        return (
          <Space>
            <span>{bmi.toFixed(2)}</span>
            <Tag color={cat.color}>{cat.label}</Tag>
          </Space>
        );
      },
      sorter: (a: HealthMetric, b: HealthMetric) => a.bmi - b.bmi,
    },
    {
      title: 'Nhịp tim (bpm)',
      dataIndex: 'heartRate',
      key: 'heartRate',
      width: 130,
      render: (val: number) => `${val} bpm`,
    },
    {
      title: 'Giờ ngủ',
      dataIndex: 'sleepHours',
      key: 'sleepHours',
      width: 110,
      render: (val: number) => `${val}h`,
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 120,
      render: (_: any, record: HealthMetric) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Bạn có chắc muốn xóa bản ghi này?"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm chỉ số
        </Button>
      </div>

      <Table
        dataSource={sortedMetrics}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        bordered
        size="middle"
      />

      <HealthMetricForm
        open={modalVisible}
        metric={editingMetric}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setModalVisible(false);
          setEditingMetric(null);
        }}
      />
    </div>
  );
}
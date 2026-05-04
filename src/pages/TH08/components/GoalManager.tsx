import { useState, useMemo } from 'react';
import {
  Row,
  Col,
  Card,
  Tag,
  Progress,
  InputNumber,
  Button,
  Popconfirm,
  Space,
  Typography,
  Empty,
  Segmented,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import GoalDrawerForm from './GoalDrawerForm';
import type { Goal, GoalStatus, GoalType } from '../types';

const { Text, Title } = Typography;

interface GoalManagerProps {
  goals: Goal[];
  onSave: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onUpdateValue: (id: string, currentValue: number) => void;
}

const goalTypeLabels: Record<GoalType, string> = {
  weight_loss: 'Giảm cân',
  muscle_gain: 'Tăng cơ',
  endurance: 'Sức bền',
  other: 'Khác',
};

const goalTypeColors: Record<GoalType, string> = {
  weight_loss: 'volcano',
  muscle_gain: 'purple',
  endurance: 'blue',
  other: 'cyan',
};

const statusLabels: Record<GoalStatus, string> = {
  in_progress: 'Đang thực hiện',
  achieved: 'Đã đạt',
  cancelled: 'Đã hủy',
};

const statusConfig: Record<GoalStatus, { color: string; icon: React.ReactNode }> = {
  in_progress: { color: 'processing', icon: <SyncOutlined spin /> },
  achieved: { color: 'success', icon: <CheckCircleOutlined /> },
  cancelled: { color: 'error', icon: <CloseCircleOutlined /> },
};

const segmentOptions = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang thực hiện', value: 'in_progress' },
  { label: 'Đã đạt', value: 'achieved' },
  { label: 'Đã hủy', value: 'cancelled' },
];

export default function GoalManager({ goals, onSave, onDelete, onUpdateValue }: GoalManagerProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredGoals = useMemo(() => {
    if (statusFilter === 'all') return goals;
    return goals.filter((g) => g.status === statusFilter);
  }, [goals, statusFilter]);

  const handleFormSubmit = (goal: Goal) => {
    onSave(goal);
    setDrawerVisible(false);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }} wrap>
        <Segmented
          options={segmentOptions}
          value={statusFilter}
          onChange={(val) => setStatusFilter(val as string)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerVisible(true)}>
          Thêm mục tiêu
        </Button>
      </Space>

      {filteredGoals.length === 0 ? (
        <Empty description="Không có mục tiêu nào" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredGoals.map((goal) => {
            const progress = Math.min(
              Math.round((goal.currentValue / goal.targetValue) * 100),
              100,
            );
            const sCfg = statusConfig[goal.status];
            const isDeadlinePassed = moment(goal.deadline).isBefore(moment(), 'day');

            return (
              <Col xs={24} sm={12} lg={8} key={goal.id}>
                <Card
                  hoverable
                  style={{
                    borderLeft: `4px solid ${
                      goal.status === 'achieved'
                        ? '#52c41a'
                        : goal.status === 'cancelled'
                        ? '#ff4d4f'
                        : '#1890ff'
                    }`,
                  }}
                  actions={[
                    <Popconfirm
                      key="delete"
                      title="Bạn có chắc muốn xóa mục tiêu này?"
                      onConfirm={() => onDelete(goal.id)}
                      okText="Xóa"
                      cancelText="Hủy"
                    >
                      <Button type="text" danger icon={<DeleteOutlined />}>
                        Xóa
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <Title level={5} style={{ marginBottom: 8 }}>
                    {goal.name}
                  </Title>

                  <Space wrap style={{ marginBottom: 12 }}>
                    <Tag color={goalTypeColors[goal.type]}>{goalTypeLabels[goal.type]}</Tag>
                    <Tag icon={sCfg.icon} color={sCfg.color}>
                      {statusLabels[goal.status]}
                    </Tag>
                  </Space>

                  <Progress
                    percent={progress}
                    status={
                      goal.status === 'achieved'
                        ? 'success'
                        : goal.status === 'cancelled'
                        ? 'exception'
                        : 'active'
                    }
                    style={{ marginBottom: 12 }}
                  />

                  <div style={{ marginBottom: 8 }}>
                    <Text type="secondary">Giá trị hiện tại: </Text>
                    {goal.status === 'in_progress' ? (
                      <InputNumber
                        size="small"
                        value={goal.currentValue}
                        min={0}
                        step={0.5}
                        style={{ width: 100 }}
                        onChange={(val) => {
                          if (val !== null) onUpdateValue(goal.id, val);
                        }}
                      />
                    ) : (
                      <Text strong>
                        {goal.currentValue} {goal.unit}
                      </Text>
                    )}
                    <Text type="secondary">
                      {' '}
                      / {goal.targetValue} {goal.unit}
                    </Text>
                  </div>

                  <div>
                    <CalendarOutlined style={{ marginRight: 4 }} />
                    <Text type={isDeadlinePassed ? 'danger' : 'secondary'}>
                      Deadline: {moment(goal.deadline).format('DD/MM/YYYY')}
                      {isDeadlinePassed && goal.status === 'in_progress' && ' (Quá hạn!)'}
                    </Text>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <GoalDrawerForm
        open={drawerVisible}
        onSubmit={handleFormSubmit}
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  );
}
import { useState, useMemo } from 'react';
import { Table, Button, Input, Select, DatePicker, Tag, Space, Popconfirm, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import WorkoutForm from './WorkoutForm';
import type { Workout, WorkoutType } from '../types';

const { RangePicker } = DatePicker;

interface WorkoutLogProps {
  workouts: Workout[];
  onSave: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

const workoutTypeColors: Record<WorkoutType, string> = {
  Cardio: 'blue',
  Strength: 'purple',
  Yoga: 'green',
  HIIT: 'volcano',
  Other: 'cyan',
};

export default function WorkoutLog({ workouts, onSave, onDelete }: WorkoutLogProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);

  const filteredWorkouts = useMemo(() => {
    let result = [...workouts];

    if (searchText) {
      const lower = searchText.toLowerCase();
      result = result.filter(
        (w) =>
          w.type.toLowerCase().includes(lower) ||
          w.note.toLowerCase().includes(lower),
      );
    }

    if (filterType) {
      result = result.filter((w) => w.type === filterType);
    }

    if (dateRange) {
      const [start, end] = dateRange;
      result = result.filter((w) => {
        const d = moment(w.date);
        return d.isSameOrAfter(start, 'day') && d.isSameOrBefore(end, 'day');
      });
    }

    return result.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
  }, [workouts, searchText, filterType, dateRange]);

  const handleAdd = () => {
    setEditingWorkout(null);
    setModalVisible(true);
  };

  const handleEdit = (record: Workout) => {
    setEditingWorkout(record);
    setModalVisible(true);
  };

  const handleFormSubmit = (workout: Workout) => {
    onSave(workout);
    setModalVisible(false);
    setEditingWorkout(null);
  };

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => moment(date).format('DD/MM/YYYY'),
      sorter: (a: Workout, b: Workout) => moment(a.date).valueOf() - moment(b.date).valueOf(),
    },
    {
      title: 'Loại bài tập',
      dataIndex: 'type',
      key: 'type',
      width: 130,
      render: (type: WorkoutType) => <Tag color={workoutTypeColors[type]}>{type}</Tag>,
    },
    {
      title: 'Thời lượng (phút)',
      dataIndex: 'duration',
      key: 'duration',
      width: 140,
      sorter: (a: Workout, b: Workout) => a.duration - b.duration,
    },
    {
      title: 'Calo đốt',
      dataIndex: 'calories',
      key: 'calories',
      width: 110,
      render: (cal: number) => `${cal} kcal`,
      sorter: (a: Workout, b: Workout) => a.calories - b.calories,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string) =>
        status === 'completed' ? (
          <Badge status="success" text="Hoàn thành" />
        ) : (
          <Badge status="error" text="Bỏ lỡ" />
        ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 120,
      render: (_: any, record: Workout) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa buổi tập này?"
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
      {/* Toolbar */}
      <Space wrap style={{ marginBottom: 16, width: '100%' }}>
        <Input
          placeholder="Tìm kiếm bài tập..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 220 }}
          allowClear
        />
        <Select
          placeholder="Lọc loại bài tập"
          value={filterType}
          onChange={setFilterType}
          allowClear
          style={{ width: 160 }}
        >
          <Select.Option value="Cardio">Cardio</Select.Option>
          <Select.Option value="Strength">Strength</Select.Option>
          <Select.Option value="Yoga">Yoga</Select.Option>
          <Select.Option value="HIIT">HIIT</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
        <RangePicker
          onChange={(dates) =>
            setDateRange(dates ? [dates[0]!, dates[1]!] : null)
          }
          format="DD/MM/YYYY"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm buổi tập
        </Button>
      </Space>

      {/* Table */}
      <Table
        dataSource={filteredWorkouts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        bordered
        size="middle"
      />

      {/* Modal */}
      <WorkoutForm
        open={modalVisible}
        workout={editingWorkout}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setModalVisible(false);
          setEditingWorkout(null);
        }}
      />
    </div>
  );
}
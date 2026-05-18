import React, { useState, useMemo } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Popconfirm,
  Tooltip,
  Badge,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  Task,
  TaskStatus,
  TaskPriority,
  STATUS_LABELS,
  STATUS_COLORS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
} from '../types';
import TaskFormModal from '../components/TaskFormModal';

interface TaskListPageProps {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const TaskListPage: React.FC<TaskListPageProps> = ({ tasks, onUpdate, onDelete, onAdd }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) => {
        const matchSearch = search === '' || t.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || t.status === statusFilter;
        const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
        return matchSearch && matchStatus && matchPriority;
      }),
    [tasks, search, statusFilter, priorityFilter],
  );

  const isOverdue = (task: Task) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return new Date(task.deadline) < now && task.status !== 'done';
  };

  const columns: ColumnsType<Task> = [
    {
      title: 'STT',
      key: 'index',
      width: 56,
      align: 'center',
      render: (_: unknown, __: Task, idx: number) => (
        <span style={{ color: '#8c8c8c' }}>{idx + 1}</span>
      ),
    },
    {
      title: 'Tên Task',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string, record: Task) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>
            {isOverdue(record) && (
              <Tooltip title="Task đã quá hạn">
                <WarningOutlined style={{ color: '#ff4d4f', marginRight: 5, fontSize: 12 }} />
              </Tooltip>
            )}
            {name}
          </div>
          {record.description && (
            <div
              style={{
                fontSize: 12,
                color: '#8c8c8c',
                marginTop: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 280,
              }}
            >
              {record.description}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      align: 'center',
      filters: [
        { text: 'Cần làm', value: 'todo' },
        { text: 'Đang làm', value: 'inprogress' },
        { text: 'Hoàn thành', value: 'done' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: TaskStatus) => (
        <Badge color={STATUS_COLORS[status]} text={<span style={{ fontSize: 12 }}>{STATUS_LABELS[status]}</span>} />
      ),
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      width: 110,
      align: 'center',
      filters: [
        { text: 'Cao', value: 'high' },
        { text: 'Trung bình', value: 'medium' },
        { text: 'Thấp', value: 'low' },
      ],
      onFilter: (value, record) => record.priority === value,
      sorter: (a, b) => ({ high: 0, medium: 1, low: 2 }[a.priority] - { high: 0, medium: 1, low: 2 }[b.priority]),
      render: (priority: TaskPriority) => (
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: PRIORITY_COLORS[priority],
          }}
        >
          {PRIORITY_LABELS[priority]}
        </span>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
      align: 'center',
      sorter: (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      defaultSortOrder: 'ascend',
      render: (deadline: string, record: Task) => {
        const over = isOverdue(record);
        return (
          <span style={{ fontSize: 13, color: over ? '#ff4d4f' : '#595959', fontWeight: over ? 600 : 400 }}>
            {new Date(deadline).toLocaleDateString('vi-VN')}
          </span>
        );
      },
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 160,
      render: (tags: string[]) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {tags.slice(0, 2).map((tag) => (
            <Tag key={tag} style={{ margin: 0, fontSize: 11, padding: '0 5px', lineHeight: '18px', borderRadius: 3 }}>
              {tag}
            </Tag>
          ))}
          {tags.length > 2 && (
            <Tooltip title={tags.slice(2).join(', ')}>
              <Tag style={{ margin: 0, fontSize: 11, borderRadius: 3 }}>+{tags.length - 2}</Tag>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 90,
      align: 'center',
      render: (_: unknown, record: Task) => (
        <Space size={4}>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => { setEditingTask(record); setModalVisible(true); }}
            style={{ color: '#595959' }}
          />
          <Popconfirm
            title="Xóa task này?"
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
            onConfirm={() => onDelete(record.id)}
          >
            <Button type="text" icon={<DeleteOutlined />} size="small" style={{ color: '#595959' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, flex: 1, flexWrap: 'wrap' }}>
          <Input
            placeholder="Tìm kiếm theo tên task..."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            style={{ maxWidth: 260, height: 32 }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
            size="middle"
          >
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="todo">Cần làm</Select.Option>
            <Select.Option value="inprogress">Đang làm</Select.Option>
            <Select.Option value="done">Hoàn thành</Select.Option>
          </Select>
          <Select
            value={priorityFilter}
            onChange={setPriorityFilter}
            style={{ width: 140 }}
            size="middle"
          >
            <Select.Option value="all">Tất cả ưu tiên</Select.Option>
            <Select.Option value="high">Cao</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="low">Thấp</Select.Option>
          </Select>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => { setEditingTask(null); setModalVisible(true); }}
        >
          Thêm Task
        </Button>
      </div>

      <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 10 }}>
        Hiển thị <strong>{filteredTasks.length}</strong> / {tasks.length} task
      </div>

      <Table
        dataSource={filteredTasks}
        columns={columns}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 8, showSizeChanger: true, showTotal: (total) => `Tổng ${total} task` }}
        rowClassName={(record) => (isOverdue(record) ? 'overdue-row' : '')}
        scroll={{ x: 800 }}
      />

      <style>{`
        .overdue-row td { background: #fff9f9 !important; }
        .overdue-row:hover td { background: #fff2f0 !important; }
      `}</style>

      <TaskFormModal
        visible={modalVisible}
        editingTask={editingTask}
        onClose={() => setModalVisible(false)}
        onSubmit={(values) => {
          if (editingTask) onUpdate(editingTask.id, values);
          else onAdd(values);
        }}
      />
    </div>
  );
};

export default TaskListPage;
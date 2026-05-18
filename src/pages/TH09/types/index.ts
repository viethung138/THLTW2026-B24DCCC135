export type TaskStatus = 'todo' | 'inprogress' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  name: string;
  description: string;
  deadline: string; // ISO date string
  priority: TaskPriority;
  tags: string[];
  status: TaskStatus;
  createdAt: string;
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Cần làm',
  inprogress: 'Đang làm',
  done: 'Hoàn thành',
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: 'Cao',
  medium: 'Trung bình',
  low: 'Thấp',
};

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  high: '#ff4d4f',
  medium: '#faad14',
  low: '#52c41a',
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: '#1890ff',
  inprogress: '#fa8c16',
  done: '#52c41a',
};
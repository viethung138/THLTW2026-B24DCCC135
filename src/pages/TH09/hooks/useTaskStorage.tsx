import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

const STORAGE_KEY = 'th09_kanban_tasks';

const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    name: 'Thiết kế giao diện trang chủ',
    description: 'Tạo wireframe và prototype cho trang chủ sản phẩm',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'high',
    tags: ['UI/UX', 'Design'],
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Viết API backend xác thực người dùng',
    description: 'Implement JWT authentication, refresh token',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'high',
    tags: ['Backend', 'API'],
    status: 'inprogress',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Kiểm thử unit test cho module thanh toán',
    description: 'Viết unit test với Jest, đạt coverage >= 80%',
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'medium',
    tags: ['Testing', 'Backend'],
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Tối ưu performance database',
    description: 'Thêm index, tối ưu query chậm',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'medium',
    tags: ['Database', 'Performance'],
    status: 'done',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Viết tài liệu API',
    description: 'Swagger documentation cho toàn bộ API endpoints',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'low',
    tags: ['Documentation'],
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Setup CI/CD pipeline',
    description: 'Cấu hình GitHub Actions deploy tự động',
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'high',
    tags: ['DevOps', 'CI/CD'],
    status: 'inprogress',
    createdAt: new Date().toISOString(),
  },
];

export function useTaskStorage() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as Task[];
      return SAMPLE_TASKS;
    } catch {
      return SAMPLE_TASKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((id: string, status: Task['status']) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  return { tasks, addTask, updateTask, deleteTask, moveTask, setTasks };
}
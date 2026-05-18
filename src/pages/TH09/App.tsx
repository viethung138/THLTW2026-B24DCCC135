import { useState } from 'react';
import { Tabs, Typography } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useTaskStorage } from './hooks/useTaskStorage';
import DashboardPage from './pages/DashboardPage';
import KanbanPage from './pages/KanbanPage';
import TaskListPage from './pages/TaskListPage';

const { Title } = Typography;

export default function TH09App() {
    const { tasks, addTask, updateTask, deleteTask, moveTask, setTasks } = useTaskStorage();
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabItems = [
        {
        key: 'dashboard',
        label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <DashboardOutlined />
            Dashboard
            </span>
        ),
        children: <DashboardPage tasks={tasks} />,
        },
        {
        key: 'kanban',
        label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <AppstoreOutlined />
            Kanban Board
            </span>
        ),
        children: (
            <KanbanPage
            tasks={tasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onAdd={addTask}
            onMove={moveTask}
            onSetTasks={setTasks}
            />
        ),
        },
        {
        key: 'list',
        label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <UnorderedListOutlined />
            Danh sách Task
            </span>
        ),
        children: (
            <TaskListPage
            tasks={tasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onAdd={addTask}
            />
        ),
        },
    ];

    const overdueCount = tasks.filter((t) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return new Date(t.deadline) < now && t.status !== 'done';
    }).length;

    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
        <div
            style={{
            background: '#fff',
            borderBottom: '1px solid #e8e8e8',
            padding: '16px 32px 0',
            }}
        >
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>📋</span>
                <div>
                    <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
                    TaskFlow
                    </Title>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>Quản lý công việc cá nhân</div>
                </div>
                </div>

                <div style={{ display: 'flex', gap: 24 }}>
                {[
                    { label: 'Tổng', value: tasks.length },
                    { label: 'Hoàn thành', value: tasks.filter((t) => t.status === 'done').length },
                    { label: 'Quá hạn', value: overdueCount, red: true },
                ].map((s) => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: s.red && s.value > 0 ? '#ff4d4f' : '#1a1a1a' }}>
                        {s.value}
                    </div>
                    <div style={{ fontSize: 11, color: '#8c8c8c' }}>{s.label}</div>
                    </div>
                ))}
                </div>
            </div>

            <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 0 }}>
                {tabItems.map((item) => (
                <Tabs.TabPane tab={item.label} key={item.key}>
                    {item.children}
                </Tabs.TabPane>
                ))}
            </Tabs>
            </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 32px' }}>
            {tabItems.find((t) => t.key === activeTab)?.children}
        </div>
        </div>
    );
}
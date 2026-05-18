import React, { useMemo } from 'react';
import { Row, Col, Card, Statistic, Progress, Tag, Empty } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Task, PRIORITY_LABELS, PRIORITY_COLORS } from '../types';

interface DashboardPageProps {
  tasks: Task[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === 'done').length;
    const inprogress = tasks.filter((t) => t.status === 'inprogress').length;
    const todo = tasks.filter((t) => t.status === 'todo').length;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const overdue = tasks.filter((t) => new Date(t.deadline) < now && t.status !== 'done').length;
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, inprogress, todo, overdue, completionRate };
  }, [tasks]);

  const recentTasks = useMemo(
    () => [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [tasks],
  );

  const cardStyle: React.CSSProperties = {
    borderRadius: 8,
    border: '1px solid #e8e8e8',
    boxShadow: 'none',
  };

  const statCards = [
    { title: 'Tổng số task', value: stats.total, icon: <UnorderedListOutlined />, sub: `${stats.todo} cần làm · ${stats.inprogress} đang làm` },
    { title: 'Hoàn thành', value: stats.done, icon: <CheckCircleOutlined />, sub: `Tỉ lệ ${stats.completionRate}%` },
    { title: 'Đang thực hiện', value: stats.inprogress, icon: <ClockCircleOutlined />, sub: 'task đang xử lý' },
    { title: 'Quá hạn', value: stats.overdue, icon: <ExclamationCircleOutlined />, sub: 'cần xử lý', danger: true },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {statCards.map((s) => (
          <Col xs={24} sm={12} lg={6} key={s.title}>
            <Card style={cardStyle}>
              <Statistic
                title={<span style={{ fontSize: 13, color: '#595959' }}>{s.title}</span>}
                value={s.value}
                prefix={<span style={{ color: s.danger && s.value > 0 ? '#ff4d4f' : '#595959' }}>{s.icon}</span>}
                valueStyle={{ fontSize: 28, fontWeight: 700, color: s.danger && s.value > 0 ? '#ff4d4f' : '#1a1a1a' }}
              />
              <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>{s.sub}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <Card title="Tiến độ hoàn thành" style={cardStyle}>
            <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
              <Progress
                type="circle"
                percent={stats.completionRate}
                width={140}
                strokeColor="#1890ff"
                format={(p) => (
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>{p}%</div>
                    <div style={{ fontSize: 11, color: '#8c8c8c' }}>Hoàn thành</div>
                  </div>
                )}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Cần làm', value: stats.todo, color: '#1890ff' },
                { label: 'Đang làm', value: stats.inprogress, color: '#fa8c16' },
                { label: 'Hoàn thành', value: stats.done, color: '#52c41a' },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 72, fontSize: 12, color: '#595959', flexShrink: 0 }}>{row.label}</span>
                  <Progress
                    percent={stats.total > 0 ? Math.round((row.value / stats.total) * 100) : 0}
                    strokeColor={row.color}
                    size="small"
                    style={{ flex: 1, margin: 0 }}
                    format={() => row.value}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card title="Task mới nhất" style={{ ...cardStyle, height: '100%' }}>
            {recentTasks.length === 0 ? (
              <Empty description="Chưa có task nào" />
            ) : (
              recentTasks.map((task) => {
                const overdue = new Date(task.deadline) < new Date() && task.status !== 'done';
                return (
                  <div
                    key={task.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid #f0f0f0',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: PRIORITY_COLORS[task.priority],
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: '#1a1a1a',
                        }}
                      >
                        {task.name}
                      </div>
                      <div style={{ fontSize: 11, color: overdue ? '#ff4d4f' : '#8c8c8c', marginTop: 2 }}>
                        {overdue ? '⚠ Quá hạn: ' : ''}
                        {new Date(task.deadline).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                    <Tag
                      style={{
                        borderRadius: 4,
                        fontSize: 11,
                        margin: 0,
                        color: PRIORITY_COLORS[task.priority],
                        borderColor: PRIORITY_COLORS[task.priority] + '44',
                        background: PRIORITY_COLORS[task.priority] + '11',
                      }}
                    >
                      {PRIORITY_LABELS[task.priority]}
                    </Tag>
                  </div>
                );
              })
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
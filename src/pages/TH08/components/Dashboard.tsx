import { useMemo } from 'react';
import { Row, Col, Card, Statistic, Timeline, Typography, Tag, Empty, Tooltip } from 'antd';
import {
  CalendarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import type { Workout, HealthMetric, Goal } from '../types';

const { Title, Text } = Typography;

interface DashboardProps {
  workouts: Workout[];
  healthMetrics: HealthMetric[];
  goals: Goal[];
}

// ===== Simple Bar Chart Component =====
function SimpleBarChart({ data }: { data: { label: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 220, padding: '20px 0' }}>
      {data.map((item, index) => {
        const heightPercent = (item.value / maxValue) * 100;
        return (
          <div
            key={index}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Text strong style={{ marginBottom: 4, color: '#1890ff', fontSize: 16 }}>
              {item.value}
            </Text>
            <Tooltip title={`${item.label}: ${item.value} buổi`}>
              <div
                style={{
                  width: '60%',
                  minWidth: 40,
                  height: `${Math.max(heightPercent, 5)}%`,
                  background: `linear-gradient(180deg, #1890ff 0%, #096dd9 100%)`,
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.6s ease',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>
            <Text type="secondary" style={{ marginTop: 8, fontSize: 13 }}>
              {item.label}
            </Text>
          </div>
        );
      })}
    </div>
  );
}

// ===== Simple Line Chart Component =====
function SimpleLineChart({ data }: { data: { label: string; value: number }[] }) {
  if (data.length < 2) return <Empty description="Cần ít nhất 2 điểm dữ liệu" />;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) - 1;
  const maxVal = Math.max(...values) + 1;
  const range = maxVal - minVal || 1;

  const svgWidth = 600;
  const svgHeight = 220;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - ((d.value - minVal) / range) * chartHeight,
    label: d.label,
    value: d.value,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Y-axis ticks
  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) => minVal + (range / (yTicks - 1)) * i);

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 250 }}>
      {/* Grid lines */}
      {yTickValues.map((val, i) => {
        const y = padding.top + chartHeight - ((val - minVal) / range) * chartHeight;
        return (
          <g key={i}>
            <line x1={padding.left} y1={y} x2={svgWidth - padding.right} y2={y} stroke="#f0f0f0" strokeDasharray="4,4" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#999">
              {val.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Area */}
      <path d={areaPath} fill="url(#areaGradient)" opacity={0.3} />
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff4d4f" />
          <stop offset="100%" stopColor="#ff4d4f" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Line */}
      <path d={linePath} fill="none" stroke="#ff4d4f" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

      {/* Points + Labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="#ff4d4f" stroke="#fff" strokeWidth={2} />
          {/* X-axis labels (show every other for space) */}
          {(i % Math.ceil(data.length / 8) === 0 || i === data.length - 1) && (
            <text x={p.x} y={svgHeight - 5} textAnchor="middle" fontSize="10" fill="#999">
              {p.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function Dashboard({ workouts, healthMetrics, goals }: DashboardProps) {
  const now = moment();
  const currentMonth = now.month();
  const currentYear = now.year();

  // Monthly stats
  const monthlyWorkouts = useMemo(
    () =>
      workouts.filter((w) => {
        const d = moment(w.date);
        return d.month() === currentMonth && d.year() === currentYear && w.status === 'completed';
      }),
    [workouts, currentMonth, currentYear],
  );

  const totalSessions = monthlyWorkouts.length;
  const totalCalories = monthlyWorkouts.reduce((sum, w) => sum + w.calories, 0);

  // Streak
  const streak = useMemo(() => {
    const sorted = workouts
      .filter((w) => w.status === 'completed')
      .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
    if (sorted.length === 0) return 0;

    let count = 0;
    let checkDate = moment().startOf('day');

    for (const w of sorted) {
      const wDate = moment(w.date).startOf('day');
      const diff = checkDate.diff(wDate, 'days');
      if (diff === 0 || diff === 1) {
        count++;
        checkDate = wDate;
      } else {
        break;
      }
    }
    return count;
  }, [workouts]);

  // Goal completion
  const goalCompletion = useMemo(() => {
    if (goals.length === 0) return 0;
    const achieved = goals.filter((g) => g.status === 'achieved').length;
    return Math.round((achieved / goals.length) * 100);
  }, [goals]);

  // Weekly bar data
  const weeklyData = useMemo(() => {
    const weeks = [
      { label: 'Tuần 1', value: 0 },
      { label: 'Tuần 2', value: 0 },
      { label: 'Tuần 3', value: 0 },
      { label: 'Tuần 4', value: 0 },
    ];
    monthlyWorkouts.forEach((w) => {
      const day = moment(w.date).date();
      if (day <= 7) weeks[0].value++;
      else if (day <= 14) weeks[1].value++;
      else if (day <= 21) weeks[2].value++;
      else weeks[3].value++;
    });
    return weeks;
  }, [monthlyWorkouts]);

  // Weight line data
  const weightData = useMemo(
    () =>
      [...healthMetrics]
        .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
        .map((m) => ({
          label: moment(m.date).format('DD/MM'),
          value: m.weight,
        })),
    [healthMetrics],
  );

  // Recent workouts
  const recentWorkouts = useMemo(
    () =>
      [...workouts]
        .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
        .slice(0, 5),
    [workouts],
  );

  const typeColorMap: Record<string, string> = {
    Cardio: '#1890ff',
    Strength: '#722ed1',
    Yoga: '#52c41a',
    HIIT: '#fa541c',
    Other: '#13c2c2',
  };

  return (
    <div>
      {/* 4 Stat Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ borderTop: '3px solid #1890ff' }}>
            <Statistic
              title="Tổng buổi tập trong tháng"
              value={totalSessions}
              prefix={<CalendarOutlined style={{ color: '#1890ff' }} />}
              suffix="buổi"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ borderTop: '3px solid #fa541c' }}>
            <Statistic
              title="Tổng calo đã đốt"
              value={totalCalories}
              prefix={<FireOutlined style={{ color: '#fa541c' }} />}
              suffix="kcal"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ borderTop: '3px solid #faad14' }}>
            <Statistic
              title="Streak tập liên tiếp"
              value={streak}
              prefix={<ThunderboltOutlined style={{ color: '#faad14' }} />}
              suffix="ngày"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ borderTop: '3px solid #52c41a' }}>
            <Statistic
              title="Mục tiêu hoàn thành"
              value={goalCompletion}
              prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={<Title level={5} style={{ margin: 0 }}>Số buổi tập theo tuần</Title>}>
            <SimpleBarChart data={weeklyData} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<Title level={5} style={{ margin: 0 }}>Thay đổi cân nặng (kg)</Title>}>
            {weightData.length > 1 ? (
              <SimpleLineChart data={weightData} />
            ) : (
              <Empty description="Chưa có dữ liệu cân nặng" style={{ padding: 40 }} />
            )}
          </Card>
        </Col>
      </Row>

      {/* Timeline */}
      <Card title={<Title level={5} style={{ margin: 0 }}>5 buổi tập gần nhất</Title>}>
        {recentWorkouts.length > 0 ? (
          <Timeline mode="left" style={{ marginTop: 16 }}>
            {recentWorkouts.map((w) => (
              <Timeline.Item
                key={w.id}
                color={w.status === 'completed' ? 'green' : 'red'}
                dot={<ClockCircleOutlined />}
                label={<Text strong>{moment(w.date).format('DD/MM/YYYY')}</Text>}
              >
                <div>
                  <Tag color={typeColorMap[w.type]}>{w.type}</Tag>
                  <Text>{w.duration} phút</Text>
                  <Text type="secondary"> • </Text>
                  <Text>
                    <FireOutlined style={{ color: '#fa541c' }} /> {w.calories} kcal
                  </Text>
                  {w.note && (
                    <div>
                      <Text type="secondary">{w.note}</Text>
                    </div>
                  )}
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Empty description="Chưa có buổi tập nào" />
        )}
      </Card>
    </div>
  );
}
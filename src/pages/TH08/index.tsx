import { useState, useCallback } from 'react';
import { Tabs, Typography } from 'antd';
import Dashboard from './components/Dashboard';
import WorkoutLog from './components/WorkoutLog';
import HealthMetrics from './components/HealthMetrics';
import GoalManager from './components/GoalManager';
import ExerciseLibrary from './components/ExerciseLibrary';
import { initialWorkouts, initialHealthMetrics, initialGoals, initialExercises } from './data/initialData';
import type { Workout, HealthMetric, Goal, Exercise } from './types';

const { Title } = Typography;

export default function TH08Page() {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>(initialHealthMetrics);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [activeTab, setActiveTab] = useState('1');

  // ===== Workout handlers =====
  const handleSaveWorkout = useCallback((workout: Workout) => {
    setWorkouts((prev) => {
      const exists = prev.find((w) => w.id === workout.id);
      if (exists) return prev.map((w) => (w.id === workout.id ? workout : w));
      return [workout, ...prev];
    });
  }, []);

  const handleDeleteWorkout = useCallback((id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  }, []);

  // ===== Health Metric handlers =====
  const handleSaveHealthMetric = useCallback((metric: HealthMetric) => {
    setHealthMetrics((prev) => {
      const exists = prev.find((m) => m.id === metric.id);
      if (exists) return prev.map((m) => (m.id === metric.id ? metric : m));
      return [metric, ...prev];
    });
  }, []);

  const handleDeleteHealthMetric = useCallback((id: string) => {
    setHealthMetrics((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ===== Goal handlers =====
  const handleSaveGoal = useCallback((goal: Goal) => {
    setGoals((prev) => {
      const exists = prev.find((g) => g.id === goal.id);
      if (exists) return prev.map((g) => (g.id === goal.id ? goal : g));
      return [goal, ...prev];
    });
  }, []);

  const handleDeleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const handleUpdateGoalValue = useCallback((id: string, currentValue: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const progress = (currentValue / g.targetValue) * 100;
        return {
          ...g,
          currentValue,
          status: progress >= 100 ? 'achieved' : g.status,
        };
      }),
    );
  }, []);

  // ===== Exercise handlers =====
  const handleSaveExercise = useCallback((exercise: Exercise) => {
    setExercises((prev) => {
      const exists = prev.find((e) => e.id === exercise.id);
      if (exists) return prev.map((e) => (e.id === exercise.id ? exercise : e));
      return [exercise, ...prev];
    });
  }, []);

  const handleDeleteExercise = useCallback((id: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Ứng dụng Thể dục & Theo dõi Sức khỏe
      </Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        size="large"
      >
        <Tabs.TabPane key="1" tab="Dashboard">
          <Dashboard workouts={workouts} healthMetrics={healthMetrics} goals={goals} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Nhật ký tập luyện">
          <WorkoutLog
            workouts={workouts}
            onSave={handleSaveWorkout}
            onDelete={handleDeleteWorkout}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Chỉ số sức khỏe">
          <HealthMetrics
            metrics={healthMetrics}
            onSave={handleSaveHealthMetric}
            onDelete={handleDeleteHealthMetric}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="4" tab="Mục tiêu">
          <GoalManager
            goals={goals}
            onSave={handleSaveGoal}
            onDelete={handleDeleteGoal}
            onUpdateValue={handleUpdateGoalValue}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="5" tab="Thư viện bài tập">
          <ExerciseLibrary
            exercises={exercises}
            onSave={handleSaveExercise}
            onDelete={handleDeleteExercise}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
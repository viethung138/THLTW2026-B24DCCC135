// ===== Workout Types =====
export type WorkoutType = 'Cardio' | 'Strength' | 'Yoga' | 'HIIT' | 'Other';
export type WorkoutStatus = 'completed' | 'missed';

export interface Workout {
  id: string;
  date: string; // ISO date string
  type: WorkoutType;
  duration: number; // minutes
  calories: number;
  note: string;
  status: WorkoutStatus;
}

// ===== Health Metric Types =====
export interface HealthMetric {
  id: string;
  date: string;
  weight: number; // kg
  height: number; // cm
  bmi: number;
  heartRate: number; // bpm
  sleepHours: number;
}

// ===== Goal Types =====
export type GoalType = 'weight_loss' | 'muscle_gain' | 'endurance' | 'other';
export type GoalStatus = 'in_progress' | 'achieved' | 'cancelled';

export interface Goal {
  id: string;
  name: string;
  type: GoalType;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: GoalStatus;
}

// ===== Exercise Library Types =====
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  difficulty: DifficultyLevel;
  description: string;
  instructions: string;
  avgCaloriesPerHour: number;
}
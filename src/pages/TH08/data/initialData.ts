import type { Workout, HealthMetric, Goal, Exercise } from '../types';

export const initialWorkouts: Workout[] = [
  { id: 'w1', date: '2026-04-01', type: 'Cardio', duration: 45, calories: 400, note: 'Chạy bộ buổi sáng', status: 'completed' },
  { id: 'w2', date: '2026-04-02', type: 'Strength', duration: 60, calories: 350, note: 'Tập ngực + tay', status: 'completed' },
  { id: 'w3', date: '2026-04-03', type: 'Yoga', duration: 30, calories: 150, note: 'Yoga phục hồi', status: 'completed' },
  { id: 'w4', date: '2026-04-04', type: 'HIIT', duration: 25, calories: 320, note: 'Tabata 4 rounds', status: 'completed' },
  { id: 'w5', date: '2026-04-05', type: 'Cardio', duration: 50, calories: 450, note: 'Đạp xe', status: 'completed' },
  { id: 'w6', date: '2026-04-06', type: 'Other', duration: 40, calories: 200, note: 'Bơi lội', status: 'completed' },
  { id: 'w7', date: '2026-04-07', type: 'Strength', duration: 55, calories: 380, note: 'Tập lưng + vai', status: 'missed' },
  { id: 'w8', date: '2026-04-08', type: 'Cardio', duration: 35, calories: 300, note: 'Chạy interval', status: 'completed' },
  { id: 'w9', date: '2026-04-09', type: 'HIIT', duration: 30, calories: 350, note: 'Burpee + Squat jump', status: 'completed' },
  { id: 'w10', date: '2026-04-10', type: 'Yoga', duration: 45, calories: 180, note: 'Yoga flow buổi tối', status: 'completed' },
  { id: 'w11', date: '2026-04-12', type: 'Strength', duration: 65, calories: 420, note: 'Tập chân nặng', status: 'completed' },
  { id: 'w12', date: '2026-04-14', type: 'Cardio', duration: 40, calories: 380, note: 'Chạy bộ 5km', status: 'completed' },
  { id: 'w13', date: '2026-04-15', type: 'HIIT', duration: 20, calories: 280, note: 'EMOM 20 phút', status: 'completed' },
  { id: 'w14', date: '2026-04-16', type: 'Strength', duration: 50, calories: 340, note: 'Push day', status: 'missed' },
  { id: 'w15', date: '2026-04-18', type: 'Cardio', duration: 60, calories: 500, note: 'Đạp xe leo đồi', status: 'completed' },
  { id: 'w16', date: '2026-04-20', type: 'Yoga', duration: 40, calories: 160, note: 'Power Yoga', status: 'completed' },
  { id: 'w17', date: '2026-04-22', type: 'Strength', duration: 55, calories: 390, note: 'Pull day', status: 'completed' },
  { id: 'w18', date: '2026-04-24', type: 'HIIT', duration: 25, calories: 310, note: 'Circuit training', status: 'completed' },
  { id: 'w19', date: '2026-04-26', type: 'Cardio', duration: 45, calories: 420, note: 'Chạy bộ 6km', status: 'completed' },
  { id: 'w20', date: '2026-04-28', type: 'Strength', duration: 60, calories: 400, note: 'Leg day', status: 'completed' },
];

export const initialHealthMetrics: HealthMetric[] = [
  { id: 'h1', date: '2026-04-01', weight: 75.0, height: 175, bmi: 24.49, heartRate: 72, sleepHours: 7.5 },
  { id: 'h2', date: '2026-04-03', weight: 74.8, height: 175, bmi: 24.42, heartRate: 70, sleepHours: 8.0 },
  { id: 'h3', date: '2026-04-05', weight: 74.5, height: 175, bmi: 24.33, heartRate: 68, sleepHours: 7.0 },
  { id: 'h4', date: '2026-04-07', weight: 74.3, height: 175, bmi: 24.26, heartRate: 71, sleepHours: 6.5 },
  { id: 'h5', date: '2026-04-09', weight: 74.0, height: 175, bmi: 24.16, heartRate: 69, sleepHours: 7.5 },
  { id: 'h6', date: '2026-04-11', weight: 73.8, height: 175, bmi: 24.10, heartRate: 67, sleepHours: 8.0 },
  { id: 'h7', date: '2026-04-13', weight: 73.5, height: 175, bmi: 24.00, heartRate: 70, sleepHours: 7.0 },
  { id: 'h8', date: '2026-04-15', weight: 73.2, height: 175, bmi: 23.90, heartRate: 68, sleepHours: 7.5 },
  { id: 'h9', date: '2026-04-17', weight: 73.0, height: 175, bmi: 23.84, heartRate: 66, sleepHours: 8.0 },
  { id: 'h10', date: '2026-04-19', weight: 72.8, height: 175, bmi: 23.77, heartRate: 65, sleepHours: 7.0 },
  { id: 'h11', date: '2026-04-21', weight: 72.5, height: 175, bmi: 23.67, heartRate: 67, sleepHours: 7.5 },
  { id: 'h12', date: '2026-04-23', weight: 72.3, height: 175, bmi: 23.61, heartRate: 66, sleepHours: 8.0 },
  { id: 'h13', date: '2026-04-25', weight: 72.0, height: 175, bmi: 23.51, heartRate: 64, sleepHours: 7.5 },
  { id: 'h14', date: '2026-04-27', weight: 71.8, height: 175, bmi: 23.45, heartRate: 65, sleepHours: 7.0 },
  { id: 'h15', date: '2026-04-29', weight: 71.5, height: 175, bmi: 23.35, heartRate: 63, sleepHours: 8.0 },
];

export const initialGoals: Goal[] = [
  {
    id: 'g1', name: 'Giảm cân xuống 70kg', type: 'weight_loss',
    targetValue: 70, currentValue: 71.5, unit: 'kg',
    deadline: '2026-06-30', status: 'in_progress',
  },
  {
    id: 'g2', name: 'Bench Press 80kg', type: 'muscle_gain',
    targetValue: 80, currentValue: 65, unit: 'kg',
    deadline: '2026-08-31', status: 'in_progress',
  },
  {
    id: 'g3', name: 'Chạy 10km dưới 50 phút', type: 'endurance',
    targetValue: 50, currentValue: 55, unit: 'phút',
    deadline: '2026-07-15', status: 'in_progress',
  },
  {
    id: 'g4', name: 'Tập 20 buổi/tháng', type: 'other',
    targetValue: 20, currentValue: 20, unit: 'buổi',
    deadline: '2026-04-30', status: 'achieved',
  },
  {
    id: 'g5', name: 'Plank 5 phút', type: 'endurance',
    targetValue: 5, currentValue: 3.5, unit: 'phút',
    deadline: '2026-05-31', status: 'in_progress',
  },
];

export const initialExercises: Exercise[] = [
  {
    id: 'e1', name: 'Bench Press', muscleGroup: 'Chest', difficulty: 'medium',
    description: 'Bài tập đẩy ngực cơ bản với thanh tạ.',
    instructions: '1. Nằm trên ghế phẳng, hai chân đặt vững trên sàn.\n2. Nắm thanh tạ rộng hơn vai, hạ thanh tạ xuống ngực.\n3. Đẩy thanh tạ lên cho đến khi tay duỗi thẳng.\n4. Lặp lại 8-12 reps x 3-4 sets.\n\nLưu ý: Giữ lưng hơi cong tự nhiên, không nhấc mông khỏi ghế.',
    avgCaloriesPerHour: 360,
  },
  {
    id: 'e2', name: 'Squat', muscleGroup: 'Legs', difficulty: 'medium',
    description: 'Bài tập chân toàn diện, tập trung vào đùi trước và mông.',
    instructions: '1. Đứng thẳng, hai chân rộng bằng vai.\n2. Đặt thanh tạ trên vai (hoặc tập không tạ).\n3. Hạ thấp người bằng cách gập đầu gối và đẩy hông ra sau.\n4. Hạ xuống cho đến khi đùi song song với sàn.\n5. Đẩy lên trở lại vị trí ban đầu.\n\nLưu ý: Giữ đầu gối không vượt quá mũi chân.',
    avgCaloriesPerHour: 400,
  },
  {
    id: 'e3', name: 'Deadlift', muscleGroup: 'Back', difficulty: 'hard',
    description: 'Bài tập kéo nặng, phát triển toàn bộ chuỗi sau cơ thể.',
    instructions: '1. Đứng sát thanh tạ, hai chân rộng bằng hông.\n2. Gập người xuống nắm thanh tạ.\n3. Giữ lưng thẳng, đẩy hông về phía trước và đứng thẳng.\n4. Hạ thanh tạ xuống có kiểm soát.\n\nLưu ý: KHÔNG được cong lưng trong suốt động tác.',
    avgCaloriesPerHour: 450,
  },
  {
    id: 'e4', name: 'Pull-up', muscleGroup: 'Back', difficulty: 'hard',
    description: 'Bài tập kéo xà đơn, phát triển lưng xô và cơ tay.',
    instructions: '1. Nắm xà với tay rộng hơn vai, lòng bàn tay hướng ra ngoài.\n2. Treo lơ lửng, siết cơ core.\n3. Kéo cơ thể lên cho đến khi cằm vượt qua xà.\n4. Hạ xuống từ từ, có kiểm soát.\n\nBiến thể: Chin-up (lòng bàn tay hướng vào trong) để tập biceps nhiều hơn.',
    avgCaloriesPerHour: 400,
  },
  {
    id: 'e5', name: 'Plank', muscleGroup: 'Core', difficulty: 'easy',
    description: 'Bài tập giữ thăng bằng tĩnh, tăng cường cơ core.',
    instructions: '1. Chống khuỷu tay xuống sàn, vai trên khuỷu tay.\n2. Duỗi thẳng chân ra sau, chống mũi chân.\n3. Giữ cơ thể thành một đường thẳng.\n4. Siết bụng và giữ vị trí 30-60 giây.\n\nLưu ý: Không để hông xệ xuống hoặc nâng quá cao.',
    avgCaloriesPerHour: 200,
  },
  {
    id: 'e6', name: 'Overhead Press', muscleGroup: 'Shoulders', difficulty: 'medium',
    description: 'Bài tập đẩy vai với thanh tạ hoặc tạ đơn.',
    instructions: '1. Đứng thẳng, nắm tạ ngang vai.\n2. Đẩy tạ lên trên đầu cho đến khi tay duỗi thẳng.\n3. Hạ tạ xuống vị trí ban đầu.\n4. Lặp lại 8-12 reps x 3 sets.\n\nLưu ý: Giữ core siết chặt, không cong lưng quá mức.',
    avgCaloriesPerHour: 300,
  },
  {
    id: 'e7', name: 'Bicep Curl', muscleGroup: 'Arms', difficulty: 'easy',
    description: 'Bài tập cách ly cơ bắp tay trước.',
    instructions: '1. Đứng thẳng, nắm tạ đơn hai bên.\n2. Giữ khuỷu tay sát thân, cuốn tạ lên.\n3. Siết cơ bắp tay ở đỉnh động tác.\n4. Hạ xuống từ từ.\n\nLưu ý: Không lắc thân người để lấy đà.',
    avgCaloriesPerHour: 240,
  },
  {
    id: 'e8', name: 'Burpee', muscleGroup: 'Full Body', difficulty: 'hard',
    description: 'Bài tập cardio cường độ cao, tác động toàn thân.',
    instructions: '1. Đứng thẳng, hai tay dọc thân.\n2. Ngồi xổm, đặt hai tay xuống sàn.\n3. Nhảy chân ra sau thành tư thế plank.\n4. Thực hiện 1 cái push-up.\n5. Nhảy chân về phía trước.\n6. Nhảy lên cao, hai tay giơ lên trời.\n\nThực hiện: 10-15 reps x 3-4 sets.',
    avgCaloriesPerHour: 500,
  },
  {
    id: 'e9', name: 'Lunge', muscleGroup: 'Legs', difficulty: 'easy',
    description: 'Bài tập bước lunge, phát triển đùi và mông.',
    instructions: '1. Đứng thẳng, hai chân rộng bằng hông.\n2. Bước một chân về phía trước.\n3. Hạ thấp cho đến khi đầu gối sau gần chạm sàn.\n4. Đẩy lên và trở lại vị trí ban đầu.\n5. Đổi chân và lặp lại.\n\nBiến thể: Walking lunge, Reverse lunge, Bulgarian split squat.',
    avgCaloriesPerHour: 350,
  },
  {
    id: 'e10', name: 'Russian Twist', muscleGroup: 'Core', difficulty: 'medium',
    description: 'Bài tập xoay người, tác động cơ bụng chéo.',
    instructions: '1. Ngồi trên sàn, gập đầu gối 45 độ.\n2. Nghiêng người ra sau khoảng 45 độ.\n3. Cầm tạ hoặc bóng trước ngực.\n4. Xoay thân sang trái, rồi sang phải.\n5. Mỗi lần xoay = 1 rep.\n\nThực hiện: 20-30 reps x 3 sets.',
    avgCaloriesPerHour: 280,
  },
  {
    id: 'e11', name: 'Mountain Climber', muscleGroup: 'Full Body', difficulty: 'medium',
    description: 'Bài tập cardio động, kết hợp core và toàn thân.',
    instructions: '1. Bắt đầu ở tư thế plank cao.\n2. Kéo đầu gối phải về phía ngực.\n3. Nhanh chóng đổi chân, kéo đầu gối trái lên.\n4. Tiếp tục luân phiên nhanh như đang chạy.\n\nThực hiện: 30-45 giây x 3-4 sets.',
    avgCaloriesPerHour: 380,
  },
  {
    id: 'e12', name: 'Dumbbell Row', muscleGroup: 'Back', difficulty: 'easy',
    description: 'Bài tập kéo tạ đơn, phát triển cơ lưng giữa.',
    instructions: '1. Đặt một tay và một đầu gối lên ghế.\n2. Tay còn lại cầm tạ đơn, thả xuống.\n3. Kéo tạ lên sát hông, siết cơ lưng.\n4. Hạ xuống từ từ.\n5. Lặp lại 10-12 reps mỗi bên x 3 sets.\n\nLưu ý: Giữ lưng phẳng, không xoay thân.',
    avgCaloriesPerHour: 300,
  },
];
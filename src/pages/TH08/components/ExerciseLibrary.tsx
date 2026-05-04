import { useState, useMemo } from 'react';
import {
  Row,
  Col,
  Card,
  Tag,
  Input,
  Select,
  Space,
  Button,
  Modal,
  Typography,
  Empty,
  Popconfirm,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FireOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import ExerciseForm from './ExerciseForm';
import type { Exercise, MuscleGroup, DifficultyLevel } from '../types';

const { Text, Title, Paragraph } = Typography;

interface ExerciseLibraryProps {
  exercises: Exercise[];
  onSave: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

const difficultyLabels: Record<DifficultyLevel, string> = {
  easy: 'Dễ',
  medium: 'Trung bình',
  hard: 'Khó',
};

const difficultyColors: Record<DifficultyLevel, string> = {
  easy: 'green',
  medium: 'orange',
  hard: 'red',
};

const muscleGroups: MuscleGroup[] = [
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Core',
  'Full Body',
];

export default function ExerciseLibrary({ exercises, onSave, onDelete }: ExerciseLibraryProps) {
  const [formVisible, setFormVisible] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [detailExercise, setDetailExercise] = useState<Exercise | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterMuscle, setFilterMuscle] = useState<string | undefined>(undefined);
  const [filterDifficulty, setFilterDifficulty] = useState<string | undefined>(undefined);

  const filteredExercises = useMemo(() => {
    let result = [...exercises];

    if (searchText) {
      const lower = searchText.toLowerCase();
      result = result.filter((e) => e.name.toLowerCase().includes(lower));
    }

    if (filterMuscle) {
      result = result.filter((e) => e.muscleGroup === filterMuscle);
    }

    if (filterDifficulty) {
      result = result.filter((e) => e.difficulty === filterDifficulty);
    }

    return result;
  }, [exercises, searchText, filterMuscle, filterDifficulty]);

  const handleAdd = () => {
    setEditingExercise(null);
    setFormVisible(true);
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setFormVisible(true);
  };

  const handleFormSubmit = (exercise: Exercise) => {
    onSave(exercise);
    setFormVisible(false);
    setEditingExercise(null);
  };

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
          placeholder="Nhóm cơ"
          value={filterMuscle}
          onChange={setFilterMuscle}
          allowClear
          style={{ width: 150 }}
        >
          {muscleGroups.map((mg) => (
            <Select.Option key={mg} value={mg}>
              {mg}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Mức độ khó"
          value={filterDifficulty}
          onChange={setFilterDifficulty}
          allowClear
          style={{ width: 140 }}
        >
          <Select.Option value="easy">Dễ</Select.Option>
          <Select.Option value="medium">Trung bình</Select.Option>
          <Select.Option value="hard">Khó</Select.Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm bài tập
        </Button>
      </Space>

      {/* Card Grid */}
      {filteredExercises.length === 0 ? (
        <Empty description="Không tìm thấy bài tập nào" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredExercises.map((exercise) => (
            <Col xs={24} sm={12} lg={8} key={exercise.id}>
              <Card
                hoverable
                onClick={() => setDetailExercise(exercise)}
                actions={[
                  <Button
                    key="view"
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailExercise(exercise);
                    }}
                  >
                    Chi tiết
                  </Button>,
                  <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(exercise);
                    }}
                  >
                    Sửa
                  </Button>,
                  <Popconfirm
                    key="delete"
                    title="Bạn có chắc muốn xóa bài tập này?"
                    onConfirm={(e) => {
                      e?.stopPropagation();
                      onDelete(exercise.id);
                    }}
                    onCancel={(e) => e?.stopPropagation()}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Xóa
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <Title level={5} style={{ marginBottom: 8 }}>
                  {exercise.name}
                </Title>
                <Space wrap style={{ marginBottom: 8 }}>
                  <Tag color="blue">{exercise.muscleGroup}</Tag>
                  <Tag color={difficultyColors[exercise.difficulty]}>
                    {difficultyLabels[exercise.difficulty]}
                  </Tag>
                </Space>
                <Paragraph
                  type="secondary"
                  ellipsis={{ rows: 2 }}
                  style={{ marginBottom: 8 }}
                >
                  {exercise.description}
                </Paragraph>
                <div>
                  <FireOutlined style={{ color: '#fa541c', marginRight: 4 }} />
                  <Text strong>{exercise.avgCaloriesPerHour}</Text>
                  <Text type="secondary"> kcal/giờ</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Detail Modal */}
      <Modal
        title={detailExercise?.name}
        visible={!!detailExercise}
        onCancel={() => setDetailExercise(null)}
        footer={[
          <Button key="close" onClick={() => setDetailExercise(null)}>
            Đóng
          </Button>,
        ]}
        width={600}
      >
        {detailExercise && (
          <div>
            <Space wrap style={{ marginBottom: 16 }}>
              <Tag color="blue">{detailExercise.muscleGroup}</Tag>
              <Tag color={difficultyColors[detailExercise.difficulty]}>
                {difficultyLabels[detailExercise.difficulty]}
              </Tag>
              <Tag icon={<FireOutlined />} color="volcano">
                {detailExercise.avgCaloriesPerHour} kcal/giờ
              </Tag>
            </Space>

            <Title level={5}>Mô tả</Title>
            <Paragraph>{detailExercise.description}</Paragraph>

            <Title level={5}>Hướng dẫn thực hiện</Title>
            <Paragraph style={{ whiteSpace: 'pre-line' }}>
              {detailExercise.instructions}
            </Paragraph>
          </div>
        )}
      </Modal>

      {/* Form Modal */}
      <ExerciseForm
        open={formVisible}
        exercise={editingExercise}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setFormVisible(false);
          setEditingExercise(null);
        }}
      />
    </div>
  );
}
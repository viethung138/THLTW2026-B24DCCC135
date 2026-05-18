import React, { useState } from 'react';
import { Button, Tag, Tooltip, Popconfirm } from 'antd';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { Task, TaskStatus, PRIORITY_COLORS } from '../types';
import TaskFormModal from '../components/TaskFormModal';

interface KanbanPageProps {
    tasks: Task[];
    onUpdate: (id: string, updates: Partial<Task>) => void;
    onDelete: (id: string) => void;
    onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    onMove: (id: string, status: TaskStatus) => void;
    onSetTasks: (tasks: Task[]) => void;
}

const COLUMNS: { id: TaskStatus; label: string }[] = [
    { id: 'todo', label: 'Cần làm' },
    { id: 'inprogress', label: 'Đang làm' },
    { id: 'done', label: 'Hoàn thành' },
    ];

    const KanbanPage: React.FC<KanbanPageProps> = ({ tasks, onUpdate, onDelete, onAdd, onMove, onSetTasks }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');

    const tasksByStatus = (status: TaskStatus) => tasks.filter((t) => t.status === status);

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const sourceStatus = source.droppableId as TaskStatus;
        const destStatus = destination.droppableId as TaskStatus;

        if (sourceStatus === destStatus) {
        const colTasks = tasksByStatus(sourceStatus);
        const reordered = Array.from(colTasks);
        const [moved] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, moved);
        onSetTasks([...tasks.filter((t) => t.status !== sourceStatus), ...reordered]);
        } else {
        onMove(draggableId, destStatus);
        }
    };

    const isOverdue = (task: Task) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return new Date(task.deadline) < now && task.status !== 'done';
    };

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => { setEditingTask(null); setDefaultStatus('todo'); setModalVisible(true); }}
            >
            Thêm Task
            </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'start' }}>
            {COLUMNS.map((col) => {
                const colTasks = tasksByStatus(col.id);
                return (
                <div key={col.id}>
                    <div
                    style={{
                        background: '#fff',
                        border: '1px solid #e8e8e8',
                        borderBottom: 'none',
                        borderRadius: '8px 8px 0 0',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{col.label}</span>
                        <span
                        style={{
                            background: '#f0f0f0',
                            color: '#595959',
                            borderRadius: 20,
                            padding: '0 8px',
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                        >
                        {colTasks.length}
                        </span>
                    </div>
                    <Tooltip title={`Thêm vào "${col.label}"`}>
                        <Button
                        type="text"
                        icon={<PlusOutlined />}
                        size="small"
                        onClick={() => { setEditingTask(null); setDefaultStatus(col.id); setModalVisible(true); }}
                        style={{ color: '#8c8c8c' }}
                        />
                    </Tooltip>
                    </div>

                    <Droppable droppableId={col.id}>
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            minHeight: 100,
                            background: snapshot.isDraggingOver ? '#f5f5f5' : '#fafafa',
                            border: '1px solid #e8e8e8',
                            borderTop: 'none',
                            borderRadius: '0 0 8px 8px',
                            padding: 8,
                            transition: 'background 0.15s',
                        }}
                        >
                        {colTasks.map((task, index) => {
                            const overdue = isOverdue(task);
                            return (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(drag, dragSnapshot) => (
                                <div
                                    ref={drag.innerRef}
                                    {...drag.draggableProps}
                                    {...drag.dragHandleProps}
                                    style={{
                                    background: '#fff',
                                    borderRadius: 6,
                                    padding: '10px 12px',
                                    marginBottom: 8,
                                    border: overdue ? '1px solid #ffa39e' : '1px solid #e8e8e8',
                                    boxShadow: dragSnapshot.isDragging ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
                                    cursor: 'grab',
                                    ...drag.draggableProps.style,
                                    }}
                                >
                                    <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a', marginBottom: 4 }}>
                                    {overdue && <WarningOutlined style={{ color: '#ff4d4f', marginRight: 5, fontSize: 12 }} />}
                                    {task.name}
                                    </div>

                                    {/* Description */}
                                    {task.description && (
                                    <div
                                        style={{
                                        fontSize: 12,
                                        color: '#8c8c8c',
                                        marginBottom: 8,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {task.description}
                                    </div>
                                    )}

                                    {/* Tags */}
                                    {task.tags.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                                        {task.tags.slice(0, 3).map((tag) => (
                                        <Tag key={tag} style={{ margin: 0, fontSize: 11, padding: '0 5px', lineHeight: '18px', borderRadius: 3 }}>
                                            {tag}
                                        </Tag>
                                        ))}
                                        {task.tags.length > 3 && (
                                        <Tag style={{ margin: 0, fontSize: 11, borderRadius: 3 }}>+{task.tags.length - 3}</Tag>
                                        )}
                                    </div>
                                    )}

                                    {/* Footer */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span
                                        style={{
                                            display: 'inline-block',
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: PRIORITY_COLORS[task.priority],
                                            flexShrink: 0,
                                        }}
                                        />
                                        <span style={{ fontSize: 11, color: overdue ? '#ff4d4f' : '#8c8c8c' }}>
                                        {new Date(task.deadline).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 2 }}>
                                        <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        size="small"
                                        onClick={(e) => { e.stopPropagation(); setEditingTask(task); setModalVisible(true); }}
                                        style={{ color: '#8c8c8c', height: 22, width: 22 }}
                                        />
                                        <Popconfirm
                                        title="Xóa task này?"
                                        okText="Xóa"
                                        cancelText="Hủy"
                                        onConfirm={(e) => { e?.stopPropagation(); onDelete(task.id); }}
                                        >
                                        <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            size="small"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ color: '#8c8c8c', height: 22, width: 22 }}
                                        />
                                        </Popconfirm>
                                    </div>
                                    </div>
                                </div>
                                )}
                            </Draggable>
                            );
                        })}
                        {provided.placeholder}
                        {colTasks.length === 0 && !snapshot.isDraggingOver && (
                            <div style={{ textAlign: 'center', padding: '20px 0', color: '#bfbfbf', fontSize: 12 }}>
                            Kéo task vào đây
                            </div>
                        )}
                        </div>
                    )}
                    </Droppable>
                </div>
                );
            })}
            </div>
        </DragDropContext>

        <TaskFormModal
            visible={modalVisible}
            editingTask={editingTask}
            defaultStatus={defaultStatus}
            onClose={() => setModalVisible(false)}
            onSubmit={(values) => {
            if (editingTask) onUpdate(editingTask.id, values);
            else onAdd(values);
            }}
        />
        </div>
    );
};

export default KanbanPage;
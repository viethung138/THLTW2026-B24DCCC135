import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, Tag, Modal, Divider } from 'antd';
import moment from 'moment';
import { Task, TaskStatus } from '../types';

interface TaskFormModalProps {
    visible: boolean;
    editingTask?: Task | null;
    defaultStatus?: TaskStatus;
    onClose: () => void;
    onSubmit: (values: Omit<Task, 'id' | 'createdAt'>) => void;
}

const TAG_PRESETS = ['Frontend', 'Backend', 'UI/UX', 'API', 'Database', 'Testing', 'DevOps', 'Design', 'Documentation', 'Mobile'];

const TaskFormModal: React.FC<TaskFormModalProps> = ({
    visible,
    editingTask,
    defaultStatus = 'todo',
    onClose,
    onSubmit,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
        if (editingTask) {
            form.setFieldsValue({
            ...editingTask,
            deadline: editingTask.deadline ? moment(editingTask.deadline) : undefined,
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ status: defaultStatus, priority: 'medium', tags: [] });
        }
        }
    }, [visible, editingTask, defaultStatus, form]);

    const handleSubmit = async () => {
        try {
        const values = await form.validateFields();
        onSubmit({
            ...values,
            deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : '',
            tags: values.tags || [],
        });
        form.resetFields();
        onClose();
        } catch {
        }
    };

    return (
        <Modal
        visible={visible}
        title={editingTask ? 'Chỉnh sửa Task' : 'Thêm Task mới'}
        onCancel={onClose}
        onOk={handleSubmit}
        okText={editingTask ? 'Lưu thay đổi' : 'Thêm task'}
        cancelText="Hủy"
        width={520}
        >
        <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
            <Form.Item
            label="Tên task"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên task' }]}
            >
            <Input placeholder="Nhập tên task..." maxLength={100} showCount />
            </Form.Item>

            <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Mô tả chi tiết..." rows={3} maxLength={500} showCount />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Form.Item
                label="Deadline"
                name="deadline"
                rules={[{ required: true, message: 'Vui lòng chọn deadline' }]}
            >
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày" />
            </Form.Item>

            <Form.Item
                label="Mức độ ưu tiên"
                name="priority"
                rules={[{ required: true, message: 'Vui lòng chọn mức độ' }]}
            >
                <Select placeholder="Chọn mức độ">
                <Select.Option value="high">Cao</Select.Option>
                <Select.Option value="medium">Trung bình</Select.Option>
                <Select.Option value="low">Thấp</Select.Option>
                </Select>
            </Form.Item>
            </div>

            <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            >
            <Select placeholder="Chọn trạng thái">
                <Select.Option value="todo">Cần làm</Select.Option>
                <Select.Option value="inprogress">Đang làm</Select.Option>
                <Select.Option value="done">Hoàn thành</Select.Option>
            </Select>
            </Form.Item>

            <Form.Item label="Tags" name="tags">
            <Select
                mode="tags"
                placeholder="Nhập hoặc chọn tag..."
                tokenSeparators={[',']}
                dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: '6px 0' }} />
                    <div style={{ padding: '4px 8px 8px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {TAG_PRESETS.map((tag) => (
                        <Tag
                        key={tag}
                        style={{ cursor: 'pointer', userSelect: 'none', fontSize: 11 }}
                        onClick={() => {
                            const curr: string[] = form.getFieldValue('tags') || [];
                            if (!curr.includes(tag)) form.setFieldsValue({ tags: [...curr, tag] });
                        }}
                        >
                        {tag}
                        </Tag>
                    ))}
                    </div>
                </>
                )}
            />
            </Form.Item>
        </Form>
        </Modal>
    );
};

export default TaskFormModal;
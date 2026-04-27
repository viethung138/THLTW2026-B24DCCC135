import { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Typography,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Tag, BlogPost } from '../types';
import { getPostCountByTag } from '../utils/storage';

const { Title, Paragraph } = Typography;

type Props = {
  tags: Tag[];
  posts: BlogPost[];
  onSave: (tag: Tag) => void;
  onDelete: (id: string) => void;
};

export default function TagManager({ tags, posts, onSave, onDelete }: Props) {
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<Tag | null>(null);
  const [form] = Form.useForm<{ name: string }>();

  const openModal = (tag?: Tag) => {
    if (tag) {
      setEditing(tag);
      form.setFieldsValue({ name: tag.name });
    } else {
      setEditing(null);
      form.resetFields();
    }
    setVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Kiểm tra trùng tên
      const duplicate = tags.find(
        (t) => t.name.toLowerCase() === values.name.toLowerCase() && t.id !== editing?.id,
      );
      if (duplicate) {
        message.error('Tên thẻ đã tồn tại!');
        return;
      }

      const tag: Tag = {
        id: editing ? editing.id : `${Date.now()}`,
        name: values.name,
      };
      onSave(tag);
      setVisible(false);
      setEditing(null);
      form.resetFields();
      message.success(editing ? 'Cập nhật thẻ thành công!' : 'Thêm thẻ thành công!');
    } catch (err) {
      // validation failed
    }
  };

  const handleDelete = (id: string) => {
    const count = getPostCountByTag(posts, id);
    if (count > 0) {
      message.warning(`Thẻ này đang được sử dụng trong ${count} bài viết. Vẫn xóa!`);
    }
    onDelete(id);
    message.success('Xóa thẻ thành công!');
  };

  const tagsWithCount = useMemo(() => {
    return tags.map((tag) => ({
      ...tag,
      postCount: getPostCountByTag(posts, tag.id),
    }));
  }, [tags, posts]);

  const columns = [
    {
      title: 'Tên thẻ',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: 'Số bài viết',
      dataIndex: 'postCount',
      key: 'postCount',
      width: 150,
      sorter: (a: any, b: any) => a.postCount - b.postCount,
      render: (count: number) => `${count} bài viết`,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_: any, record: Tag & { postCount: number }) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => openModal(record)}
          />
          <Popconfirm
            title={
              record.postCount > 0
                ? `Thẻ đang được sử dụng trong ${record.postCount} bài viết. Bạn có chắc muốn xóa?`
                : 'Bạn có chắc muốn xóa thẻ này?'
            }
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Quản lý thẻ</Title>
      <Paragraph>Thêm, sửa, xóa các thẻ (tag) để phân loại bài viết.</Paragraph>

      <Card
        title={`Danh sách thẻ (${tags.length})`}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
            Thêm thẻ
          </Button>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tagsWithCount}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editing ? 'Sửa thẻ' : 'Thêm thẻ mới'}
        visible={visible}
        onOk={handleSave}
        onCancel={() => {
          setVisible(false);
          setEditing(null);
          form.resetFields();
        }}
        width={480}
        okText={editing ? 'Cập nhật' : 'Thêm mới'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên thẻ"
            rules={[
              { required: true, message: 'Vui lòng nhập tên thẻ' },
              { min: 2, message: 'Tên thẻ phải có ít nhất 2 ký tự' },
            ]}
          >
            <Input placeholder="Nhập tên thẻ (ví dụ: React, CSS, ...)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
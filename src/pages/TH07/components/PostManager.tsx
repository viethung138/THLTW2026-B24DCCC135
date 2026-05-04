import { useCallback, useMemo, useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Modal,
  Form,
  Typography,
  message,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { BlogPost, Tag as TagType, PostStatus } from '../types';
import {
  formatDate,
  generateSlug,
  getTagNames,
  statusColors,
  statusLabels,
} from '../utils/storage';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

type Props = {
  posts: BlogPost[];
  tags: TagType[];
  onSave: (post: BlogPost) => void;
  onDelete: (id: string) => void;
};

type PostFormValues = {
  title: string;
  slug: string;
  content: string;
  summary: string;
  coverImage: string;
  tags: string[];
  status: PostStatus;
};

export default function PostManager({ posts, tags, onSave, onDelete }: Props) {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form] = Form.useForm<PostFormValues>();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [posts, searchText, filterStatus]);

  const openModal = useCallback(
    (post?: BlogPost) => {
      if (post) {
        setEditing(post);
        form.setFieldsValue({
          title: post.title,
          slug: post.slug,
          content: post.content,
          summary: post.summary,
          coverImage: post.coverImage,
          tags: post.tags,
          status: post.status,
        });
      } else {
        setEditing(null);
        form.resetFields();
      }
      setVisible(true);
    },
    [form],
  );

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date().toISOString();
      const post: BlogPost = {
        id: editing ? editing.id : `${Date.now()}`,
        title: values.title,
        slug: values.slug,
        content: values.content,
        summary: values.summary,
        coverImage: values.coverImage,
        tags: values.tags,
        status: values.status,
        author: editing ? editing.author : 'Phạm Minh Tuấn',
        views: editing ? editing.views : 0,
        createdAt: editing ? editing.createdAt : now,
        updatedAt: now,
      };
      onSave(post);
      setVisible(false);
      setEditing(null);
      form.resetFields();
      message.success(editing ? 'Cập nhật bài viết thành công!' : 'Thêm bài viết thành công!');
    } catch (err) {
      // validation failed
    }
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    message.success('Xóa bài viết thành công!');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!editing) {
      form.setFieldsValue({ slug: generateSlug(title) });
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 280,
      ellipsis: true,
      render: (title: string) => <strong>{title}</strong>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: PostStatus) => (
        <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>
      ),
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      key: 'tags',
      width: 220,
      render: (tagIds: string[]) => (
        <Space wrap size={[4, 4]}>
          {getTagNames(tags, tagIds).map((name) => (
            <Tag key={name} color="blue">
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      sorter: (a: BlogPost, b: BlogPost) => a.views - b.views,
      render: (views: number) => (
        <Space>
          <EyeOutlined />
          {views}
        </Space>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      sorter: (a: BlogPost, b: BlogPost) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_: any, record: BlogPost) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => openModal(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa bài viết này?"
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
      <Title level={3}>Quản lý bài viết</Title>
      <Paragraph>Thêm, sửa, xóa và quản lý trạng thái các bài viết trên blog.</Paragraph>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size={12}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm theo tiêu đề..."
            allowClear
            style={{ width: 280 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 160 }}
          >
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="published">Đã đăng</Select.Option>
            <Select.Option value="draft">Nháp</Select.Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
            Thêm bài viết
          </Button>
        </Space>
      </Card>

      <Card>
        <Table<BlogPost>
          rowKey="id"
          columns={columns}
          dataSource={filteredPosts}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editing ? 'Sửa bài viết' : 'Thêm bài viết mới'}
        visible={visible}
        onOk={handleSave}
        onCancel={() => {
          setVisible(false);
          setEditing(null);
          form.resetFields();
        }}
        width={800}
        okText={editing ? 'Cập nhật' : 'Thêm mới'}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'draft', tags: [] }}
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" onChange={handleTitleChange} />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug (URL)"
            rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
          >
            <Input placeholder="tieu-de-bai-viet" />
          </Form.Item>

          <Form.Item
            name="summary"
            label="Tóm tắt"
            rules={[{ required: true, message: 'Vui lòng nhập tóm tắt' }]}
          >
            <TextArea rows={2} placeholder="Tóm tắt ngắn về bài viết" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung (Markdown)"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <TextArea rows={10} placeholder="Viết nội dung bài viết bằng Markdown..." />
          </Form.Item>

          <Form.Item
            name="coverImage"
            label="Ảnh đại diện (URL)"
            rules={[{ required: true, message: 'Vui lòng nhập URL ảnh đại diện' }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Thẻ"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một thẻ' }]}
          >
            <Select mode="multiple" placeholder="Chọn thẻ">
              {tags.map((tag) => (
                <Select.Option key={tag.id} value={tag.id}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select>
              <Select.Option value="draft">Nháp</Select.Option>
              <Select.Option value="published">Đã đăng</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
import { useMemo, useState } from "react";
import { Card, Row, Col, Table, Button, Space, Statistic, Tag, Modal, Form, Input, InputNumber, Select, Upload, Typography, Divider, Progress, List } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { data as initialData, monthlySchedules, typeLabels } from "../utils/storage";
import type { Destination } from "../types";
import type { UploadFile } from "antd/es/upload/interface";

const { Title, Paragraph } = Typography;

type DestinationFormValues = Omit<Destination, 'id'>;

export default function Dashboard() {
  const [destinations, setDestinations] = useState<Destination[]>(initialData);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<Destination | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [form] = Form.useForm<DestinationFormValues>();

  const stats = useMemo(() => {
    const totalRevenue = destinations.reduce((sum, item) => sum + item.price, 0);
    const averageRating = destinations.length ? destinations.reduce((sum, item) => sum + item.rating, 0) / destinations.length : 0;
    const typeCounts = destinations.reduce<Record<string, number>>((counts, item) => {
      counts[item.type] = (counts[item.type] || 0) + 1;
      return counts;
    }, {});
    const popularType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const totalFood = destinations.reduce((sum, item) => sum + item.foodCost, 0);
    const totalLodging = destinations.reduce((sum, item) => sum + item.lodgingCost, 0);
    const totalTransport = destinations.reduce((sum, item) => sum + item.transportCost, 0);

    return {
      totalRevenue,
      averageRating,
      popularType,
      totalFood,
      totalLodging,
      totalTransport,
    };
  }, [destinations]);

  const openModal = (destination?: Destination) => {
    if (destination) {
      setEditing(destination);
      setPreviewImage(destination.image);
      form.setFieldsValue(destination);
      setFileList([]);
    } else {
      setEditing(null);
      setPreviewImage("");
      setFileList([]);
      form.resetFields();
    }
    setVisible(true);
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const image = previewImage || values.image;
    const newDestination: Destination = {
      id: editing ? editing.id : `${Date.now()}`,
      ...values,
      image,
    };

    if (editing) {
      setDestinations((current) => current.map((item) => (item.id === editing.id ? newDestination : item)));
    } else {
      setDestinations((current) => [newDestination, ...current]);
    }

    setVisible(false);
    setEditing(null);
    setFileList([]);
    setPreviewImage("");
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    setDestinations((current) => current.filter((destination) => destination.id !== id));
  };

  const uploadProps = {
    beforeUpload: (file: UploadFile) => {
      setFileList([file]);
      const raw = file as unknown as Blob;
      const url = URL.createObjectURL(raw);
      setPreviewImage(url);
      return false;
    },
    onRemove: () => {
      setFileList([]);
      setPreviewImage("");
      return true;
    },
    fileList,
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 110,
      render: (image: string) => <img alt="destination" src={image} style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 8 }} />,
    },
    { title: "Tên điểm đến", dataIndex: "name", key: "name" },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <Tag>{typeLabels[type as keyof typeof typeLabels]}</Tag>,
    },
    { title: "Giá", dataIndex: "price", key: "price", render: (value: number) => `${value}$` },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    {
      title: "Thao tác",
      key: "actions",
      width: 180,
      render: (_: any, record: Destination) => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" onClick={() => openModal(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  const popularTypeLabel = typeLabels[stats.popularType as keyof typeof typeLabels] || 'N/A';

  return (
    <div>
      <Title level={3}>Quản trị điểm đến</Title>
      <Paragraph>Thêm, sửa, xóa điểm đến và xem chỉ số thống kê cho trang du lịch.</Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Số điểm đến" value={destinations.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Doanh thu ước tính" value={stats.totalRevenue} suffix="$" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Loại phổ biến" value={popularTypeLabel} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Rating trung bình" value={stats.averageRating.toFixed(1)} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Chi phí theo hạng mục" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
              Thêm mới
            </Button>}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Statistic title="Ăn uống" value={`${stats.totalFood}$`} />
              <Progress percent={stats.totalRevenue ? (stats.totalFood / stats.totalRevenue) * 100 : 0} status="active" />
              <Statistic title="Lưu trú" value={`${stats.totalLodging}$`} />
              <Progress percent={stats.totalRevenue ? (stats.totalLodging / stats.totalRevenue) * 100 : 0} status="active" />
              <Statistic title="Di chuyển" value={`${stats.totalTransport}$`} />
              <Progress percent={stats.totalRevenue ? (stats.totalTransport / stats.totalRevenue) * 100 : 0} status="active" />
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Lịch trình theo tháng">
            <List
              dataSource={monthlySchedules}
              renderItem={(item) => (
                <List.Item>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <span>{item.month}</span>
                    <span>{item.count} lịch trình</span>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Card title="Danh sách điểm đến">
        <Table<Destination> rowKey="id" columns={columns} dataSource={destinations} pagination={{ pageSize: 5 }} />
      </Card>

      <Modal
        title={editing ? "Sửa điểm đến" : "Thêm điểm đến"}
        visible={visible}
        onOk={handleSave}
        onCancel={() => setVisible(false)}
        width={760}
      >
        <Form form={form} layout="vertical" initialValues={{ type: 'beach', rating: 4.5, visitDuration: 6, travelTime: 1, foodCost: 100, lodgingCost: 150, transportCost: 80 }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label="Tên điểm đến" rules={[{ required: true, message: 'Nhập tên điểm đến' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="type" label="Loại" rules={[{ required: true, message: 'Chọn loại điểm đến' }]}>
                <Select>
                  <Select.Option value="beach">Biển</Select.Option>
                  <Select.Option value="mountain">Núi</Select.Option>
                  <Select.Option value="city">Thành phố</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Nhập giá' }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Nhập rating' }]}>
                <InputNumber style={{ width: '100%' }} min={0} max={5} step={0.1} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item name="foodCost" label="Chi phí ăn uống" rules={[{ required: true, message: 'Nhập chi phí ăn uống' }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="lodgingCost" label="Chi phí lưu trú" rules={[{ required: true, message: 'Nhập chi phí lưu trú' }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="transportCost" label="Chi phí di chuyển" rules={[{ required: true, message: 'Nhập chi phí di chuyển' }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="visitDuration" label="Thời gian tham quan (giờ)" rules={[{ required: true, message: 'Nhập thời gian tham quan' }]}>
                <InputNumber style={{ width: '100%' }} min={1} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="travelTime" label="Thời gian di chuyển (giờ)" rules={[{ required: true, message: 'Nhập thời gian di chuyển' }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="image" label="URL hình ảnh" rules={[{ required: true, message: 'Nhập URL hình ảnh hoặc upload' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Upload hình ảnh">
            <Upload {...uploadProps} listType="picture-card">
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          {previewImage && (
            <div style={{ marginBottom: 16 }}>
              <img alt="preview" src={previewImage} style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 8 }} />
            </div>
          )}

          <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Nhập mô tả điểm đến' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
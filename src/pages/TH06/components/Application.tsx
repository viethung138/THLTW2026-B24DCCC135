import { useMemo, useState } from "react";
import { Card, Row, Col, Select, InputNumber, Button, Table, Space, Typography, Alert, Progress } from "antd";
import { PlusOutlined, ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from "@ant-design/icons";
import { data, typeLabels } from "../utils/storage";
import type { Destination } from "../types";

const { Title, Text, Paragraph } = Typography;

type ItineraryItem = {
  key: string;
  day: number;
  destination: Destination;
};

export default function Application() {
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [budget, setBudget] = useState<number>(0);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  const availableDestinations = data.filter((destination) => !itinerary.some((item) => item.destination.id === destination.id));

  const itineraryTotals = useMemo(() => {
    const totalFood = itinerary.reduce((sum, item) => sum + item.destination.foodCost, 0);
    const totalLodging = itinerary.reduce((sum, item) => sum + item.destination.lodgingCost, 0);
    const totalTransport = itinerary.reduce((sum, item) => sum + item.destination.transportCost, 0);
    const totalPrice = itinerary.reduce((sum, item) => sum + item.destination.price, 0);
    const totalVisit = itinerary.reduce((sum, item) => sum + item.destination.visitDuration, 0);
    const totalTravelTime = itinerary.reduce((sum, item) => sum + item.destination.travelTime, 0) + Math.max(0, itinerary.length - 1) * 1;

    return {
      totalFood,
      totalLodging,
      totalTransport,
      totalPrice,
      totalVisit,
      totalTravelTime,
    };
  }, [itinerary]);

  const warning = budget > 0 && itineraryTotals.totalPrice > budget;

  const handleAddDestination = () => {
    if (!selectedDestination) return;
    const destination = data.find((item) => item.id === selectedDestination);
    if (!destination) return;

    setItinerary((current) => [
      ...current,
      {
        key: `${destination.id}-${current.length}`,
        day: selectedDay,
        destination,
      },
    ]);
    setSelectedDestination("");
    setSelectedDay(1);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    setItinerary((current) => {
      const next = [...current];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return next;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const deleteItem = (key: string) => {
    setItinerary((current) => current.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Ngày",
      dataIndex: "day",
      key: "day",
      width: 90,
    },
    {
      title: "Điểm đến",
      dataIndex: ["destination", "name"],
      key: "name",
      render: (value: string, record: ItineraryItem) => (
        <div>
          <Text strong>{value}</Text>
          <div>
            <Text type="secondary">{typeLabels[record.destination.type]}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Chi phí",
      key: "price",
      width: 120,
      render: (record: ItineraryItem) => `${record.destination.price}$`,
    },
    {
      title: "Thời gian",
      key: "time",
      width: 120,
      render: (record: ItineraryItem) => `${record.destination.visitDuration}h`,
    },
    {
      title: "Hành động",
      key: "actions",
      width: 180,
      render: (_: any, record: ItineraryItem, index: number) => (
        <Space>
          <Button icon={<ArrowUpOutlined />} size="small" disabled={index === 0} onClick={() => moveItem(index, 'up')} />
          <Button icon={<ArrowDownOutlined />} size="small" disabled={index === itinerary.length - 1} onClick={() => moveItem(index, 'down')} />
          <Button icon={<DeleteOutlined />} size="small" danger onClick={() => deleteItem(record.key)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Tạo lịch trình du lịch</Title>
      <Paragraph>Thêm điểm đến theo ngày, điều chỉnh thứ tự và theo dõi chi phí chuyến đi.</Paragraph>

      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Text strong>Chọn điểm đến</Text>
            <Select
              value={selectedDestination}
              onChange={setSelectedDestination}
              placeholder="Chọn điểm đến"
              style={{ width: '100%' }}
            >
              {availableDestinations.map((destination) => (
                <Select.Option key={destination.id} value={destination.id}>
                  {destination.name} - {typeLabels[destination.type]}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} md={6}>
            <Text strong>Ngày</Text>
            <InputNumber value={selectedDay} min={1} max={14} onChange={(value) => setSelectedDay(Number(value || 1))} style={{ width: '100%' }} />
          </Col>

          <Col xs={24} md={8}>
            <Text strong>Ngân sách dự kiến</Text>
            <InputNumber
              value={budget}
              min={0}
              formatter={(value) => `${value}`}
              parser={(value) => Number(value || 0)}
              onChange={(value) => setBudget(Number(value || 0))}
              style={{ width: '100%' }}
            />
          </Col>

          <Col xs={24} md={2}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDestination} disabled={!selectedDestination} style={{ width: '100%' }}>
              Thêm
            </Button>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Lịch trình hiện tại" bordered>
            <Table<ItineraryItem>
              rowKey="key"
              columns={columns}
              dataSource={itinerary}
              pagination={false}
              locale={{ emptyText: 'Chưa có điểm đến trong lịch trình' }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Quản lý ngân sách" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Tổng chi phí dự kiến</Text>
              <Title level={4}>{itineraryTotals.totalPrice}$</Title>
              <Text>Thời gian tham quan: {itineraryTotals.totalVisit} giờ</Text>
              <Text>Thời gian di chuyển ước tính: {itineraryTotals.totalTravelTime} giờ</Text>
              {warning && <Alert message="Ngân sách đã vượt giới hạn" type="error" showIcon />}
              <div>
                <Text strong>Ăn uống: {itineraryTotals.totalFood}$</Text>
                <Progress percent={itineraryTotals.totalPrice ? (itineraryTotals.totalFood / itineraryTotals.totalPrice) * 100 : 0} status="active" />
              </div>
              <div>
                <Text strong>Lưu trú: {itineraryTotals.totalLodging}$</Text>
                <Progress percent={itineraryTotals.totalPrice ? (itineraryTotals.totalLodging / itineraryTotals.totalPrice) * 100 : 0} status="active" />
              </div>
              <div>
                <Text strong>Di chuyển: {itineraryTotals.totalTransport}$</Text>
                <Progress percent={itineraryTotals.totalPrice ? (itineraryTotals.totalTransport / itineraryTotals.totalPrice) * 100 : 0} status="active" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
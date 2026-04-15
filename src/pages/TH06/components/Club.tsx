import { useMemo, useState } from "react";
import { Card, Row, Col, Select, Input, Tag, Rate, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { data, filterByPriceRange, sortByField, typeLabels } from "../utils/storage";

const { Text, Paragraph, Title } = Typography;

export default function Club() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("rating");
  const [searchText, setSearchText] = useState<string>("");

  const list = useMemo(() => {
    const filtered = data.filter((destination) => {
      const matchesType = !selectedType || destination.type === selectedType;
      const matchesSearch = destination.name.toLowerCase().includes(searchText.toLowerCase());
      return matchesType && matchesSearch;
    });

    const priced = filterByPriceRange(filtered, selectedPrice);
    return sortByField(priced, selectedSort);
  }, [selectedType, selectedPrice, selectedSort, searchText]);

  return (
    <div>
      <Title level={3}>Khám phá điểm đến</Title>
      <Paragraph>Chọn điểm đến yêu thích và lập kế hoạch chuyến du lịch của bạn.</Paragraph>

      <Space wrap style={{ marginBottom: 20 }}>
        <Select value={selectedType} onChange={setSelectedType} placeholder="Chọn loại điểm đến" style={{ minWidth: 180 }}>
          <Select.Option value="">Tất cả</Select.Option>
          <Select.Option value="beach">Biển</Select.Option>
          <Select.Option value="mountain">Núi</Select.Option>
          <Select.Option value="city">Thành phố</Select.Option>
        </Select>

        <Select value={selectedPrice} onChange={setSelectedPrice} style={{ minWidth: 180 }}>
          <Select.Option value="all">Tất cả giá</Select.Option>
          <Select.Option value="low">Dưới 300</Select.Option>
          <Select.Option value="medium">300 - 450</Select.Option>
          <Select.Option value="high">Trên 450</Select.Option>
        </Select>

        <Select value={selectedSort} onChange={setSelectedSort} style={{ minWidth: 180 }}>
          <Select.Option value="rating">Sắp xếp theo rating</Select.Option>
          <Select.Option value="price">Sắp xếp theo giá</Select.Option>
          <Select.Option value="name">Sắp xếp theo tên</Select.Option>
        </Select>

        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm điểm đến"
          allowClear
          style={{ minWidth: 240 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>

      <Row gutter={[16, 16]}>
        {list.map((destination) => (
          <Col xs={24} sm={12} md={8} key={destination.id}>
            <Card
              hoverable
              cover={<img alt={destination.name} src={destination.image} style={{ height: 180, objectFit: "cover" }} />}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={4}>{destination.name}</Title>
                <Text type="secondary">{typeLabels[destination.type]}</Text>
                <Paragraph ellipsis={{ rows: 2 }}>{destination.description}</Paragraph>
                <Space>
                  <Tag color="blue">{typeLabels[destination.type]}</Tag>
                  <Tag color="green">{destination.price}$</Tag>
                </Space>
                <Space align="center" split={<span>|</span>}>
                  <Rate disabled allowHalf defaultValue={destination.rating} />
                  <Text>{destination.rating.toFixed(1)}</Text>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
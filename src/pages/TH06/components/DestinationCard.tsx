import { Card, Rate, Button } from "antd";
import { Destination } from "../types/storage";

interface Props {
  data: Destination;
  onAdd?: (d: Destination) => void;
}

const DestinationCard: React.FC<Props> = ({ data, onAdd }) => {
  return (
    <Card
      hoverable
      cover={<img src={data.image} alt={data.name} />}
    >
      {/* Tên */}
      <h3>{data.name}</h3>

      {/* Rating */}
      <Rate disabled defaultValue={data.rating} />

      {/* Giá */}
      <p>Giá: {data.price}$</p>

      {/* Nút thêm */}
      {onAdd && (
        <Button type="primary" onClick={() => onAdd(data)}>
          Thêm
        </Button>
      )}
    </Card>
  );
};

export default DestinationCard;
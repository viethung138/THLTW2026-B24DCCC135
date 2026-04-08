import React, { useState } from 'react';
import { Select, Button, List, InputNumber } from 'antd';

const destinations = [
  { name: 'Đà Nẵng', price: 200, time: 2 },
  { name: 'Sapa', price: 150, time: 3 },
];

interface Item {
  name: string;
  day: number;
  price: number;
  time: number;
}

const Planner: React.FC = () => {
  const [list, setList] = useState<Item[]>([]);
  const [selected, setSelected] = useState<any>();
  const [day, setDay] = useState(1);

  const add = () => {
    if (!selected) return;
    setList([...list, { ...selected, day }]);
  };

  const remove = (i: number) => {
    setList(list.filter((_, idx) => idx !== i));
  };

  // tính tổng
  const totalCost = list.reduce((sum, i) => sum + i.price, 0);
  const totalTime = list.reduce((sum, i) => sum + i.time, 0);

  return (
    <>
      <Select
        placeholder="Chọn điểm đến"
        style={{ width: 200 }}
        onChange={(v) => setSelected(destinations.find(d => d.name === v))}
      >
        {destinations.map(d => (
          <Select.Option key={d.name}>{d.name}</Select.Option>
        ))}
      </Select>

      Ngày: <InputNumber min={1} onChange={(v) => setDay(Number(v))} />

      <Button onClick={add}>Thêm</Button>

      <List
        dataSource={list}
        renderItem={(item, i) => (
          <List.Item actions={[<Button danger onClick={() => remove(i)}>Xóa</Button>]}>
            Ngày {item.day} - {item.name}
          </List.Item>
        )}
      />

      <h3>Tổng tiền: {totalCost}</h3>
      <h3>Tổng thời gian: {totalTime} ngày</h3>
    </>
  );
};

export default Planner;
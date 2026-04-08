import React, { useState } from 'react';
import { Input, Button, List, InputNumber } from 'antd';

interface Item {
  name: string;
  price: number;
  rating: number;
}

const Admin: React.FC = () => {
  const [list, setList] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);

  const add = () => {
    setList([...list, { name, price, rating }]);
  };

  const remove = (i: number) => {
    setList(list.filter((_, idx) => idx !== i));
  };

  return (
    <>
      <Input placeholder="Tên" onChange={e => setName(e.target.value)} />
      <InputNumber placeholder="Giá" onChange={v => setPrice(Number(v))} />
      <InputNumber placeholder="Rating" onChange={v => setRating(Number(v))} />

      <Button onClick={add}>Thêm</Button>

      <List
        dataSource={list}
        renderItem={(item, i) => (
          <List.Item actions={[<Button danger onClick={() => remove(i)}>Xóa</Button>]}>
            {item.name} - {item.price} - ⭐{item.rating}
          </List.Item>
        )}
      />
    </>
  );
};

export default Admin;
import React, { useState } from 'react';
import { Card, Select } from 'antd';

const data = [
  { name: 'Đà Nẵng', type: 'biển', price: 200, rating: 4 },
  { name: 'Sapa', type: 'núi', price: 150, rating: 5 },
];

const Home: React.FC = () => {
  const [list, setList] = useState(data);

  const filterType = (t: string) => {
    setList(data.filter(d => !t || d.type === t));
  };

  const sortPrice = () => {
    setList([...list].sort((a, b) => a.price - b.price));
  };

  const sortRating = () => {
    setList([...list].sort((a, b) => b.rating - a.rating));
  };

  return (
    <>
      <Select onChange={filterType} placeholder="Loại">
        <Select.Option value="">All</Select.Option>
        <Select.Option value="biển">Biển</Select.Option>
        <Select.Option value="núi">Núi</Select.Option>
      </Select>

      <Select onChange={sortPrice} placeholder="Sort giá" />
      <Select onChange={sortRating} placeholder="Sort rating" />

      <div className="grid">
        {list.map((d, i) => (
          <Card key={i} title={d.name}>
            Giá: {d.price} - ⭐ {d.rating}
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
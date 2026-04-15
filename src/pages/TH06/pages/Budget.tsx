import React, { useState } from "react";
import { InputNumber } from "antd";
import BudgetChart from "../components/BudgetChart"; // import đúng path

const Budget: React.FC = () => {
  const [food, setFood] = useState(0);
  const [hotel, setHotel] = useState(0);
  const [transport, setTransport] = useState(0);

  const data = [
    { type: "Ăn uống", value: food },
    { type: "Khách sạn", value: hotel },
    { type: "Di chuyển", value: transport },
  ];

  return (
    <div>
      <h2>Quản lý ngân sách</h2>

      Ăn uống: <InputNumber onChange={(v) => setFood(Number(v))} /><br />
      Khách sạn: <InputNumber onChange={(v) => setHotel(Number(v))} /><br />
      Di chuyển: <InputNumber onChange={(v) => setTransport(Number(v))} /><br />

      <h3>Tổng: {food + hotel + transport}</h3>

      {/* truyền data xuống chart */}
      <BudgetChart data={data} />
    </div>
  );
};

export default Budget;
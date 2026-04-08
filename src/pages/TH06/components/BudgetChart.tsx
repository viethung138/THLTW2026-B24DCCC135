import React from "react";
import ReactECharts from "echarts-for-react";

// kiểu dữ liệu chuẩn
interface BudgetItem {
  type: string;
  value: number;
}

interface Props {
  data: BudgetItem[];
}

const BudgetChart: React.FC<Props> = ({ data }) => {
  const option = {
    tooltip: {},
    series: [
      {
        type: "pie",
        data: data.map((item) => ({
          value: item.value,
          name: item.type,
        })),
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default BudgetChart;
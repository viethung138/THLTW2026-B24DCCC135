import { Tabs, Typography } from "antd";
import Club from "./components/Club";
import Application from "./components/Application";
import Dashboard from "./components/Dashboard";

const { Title } = Typography;

function TH06Page() {
  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Travel Planner</Title>
      <Tabs defaultActiveKey="1" type="line">
        <Tabs.TabPane tab="Khám phá" key="1">
          <Club />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lập kế hoạch" key="2">
          <Application />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Quản trị" key="3">
          <Dashboard />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default TH06Page;
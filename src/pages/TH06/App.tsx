import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Planner from './pages/Planner';
import Budget from './pages/Budget';
import Admin from './pages/Admin';

import 'antd/dist/antd.css';
import './style.less';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'planner': return <Planner />;
      case 'budget': return <Budget />;
      case 'admin': return <Admin />;
      default: return <Home />;
    }
  };

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          onClick={(e) => setPage(e.key)}
        >
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="planner">Planner</Menu.Item>
          <Menu.Item key="budget">Budget</Menu.Item>
          <Menu.Item key="admin">Admin</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: 20 }}>
        {renderPage()}
      </Content>
    </Layout>
  );
};

export default App;
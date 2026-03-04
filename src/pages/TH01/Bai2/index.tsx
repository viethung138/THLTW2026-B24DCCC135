import React from 'react';
import { Card } from 'antd';
import SubjectManager from './components/SubjectManager';
import StudyManager from './components/StudyManager';
import GoalManager from './components/GoalManager';
import './style.less';

const Bai2: React.FC = () => {
    return (
        <div className="container">
        <h1>Quản lý tiến độ học tập</h1>

        <Card title="Quản lý môn học" style={{ marginBottom: 20 }}>
            <SubjectManager />
        </Card>

        <Card title="Quản lý lịch học" style={{ marginBottom: 20 }}>
            <StudyManager />
        </Card>

        <Card title="Mục tiêu học tập tháng">
            <GoalManager />
        </Card>
        </div>
    );
};

export default Bai2;
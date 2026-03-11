import { useState } from 'react';
import { Button, InputNumber, Space, Table } from 'antd';

const ExamManager = () => {

    const [easy, setEasy] = useState(0);
    const [medium, setMedium] = useState(0);
    const [hard, setHard] = useState(0);

    const [exam, setExam] = useState<any[]>([]);

    const generateExam = () => {

        const list = [];

        for (let i = 0; i < easy; i++) {
        list.push({
            key: list.length + 1,
            content: 'Câu dễ ' + (i + 1),
            difficulty: 'Dễ'
        });
        }

        for (let i = 0; i < medium; i++) {
        list.push({
            key: list.length + 1,
            content: 'Câu trung bình ' + (i + 1),
            difficulty: 'Trung bình'
        });
        }

        for (let i = 0; i < hard; i++) {
        list.push({
            key: list.length + 1,
            content: 'Câu khó ' + (i + 1),
            difficulty: 'Khó'
        });
        }

        setExam(list);
    };

    const columns = [
        { title: 'Nội dung', dataIndex: 'content' },
        { title: 'Độ khó', dataIndex: 'difficulty' }
    ];

    return (

        <div>

        <Space>

            <span>Câu dễ</span>
            <InputNumber
            value={easy}
            onChange={(v) => setEasy(v || 0)}
            />

            <span>Trung bình</span>
            <InputNumber
            value={medium}
            onChange={(v) => setMedium(v || 0)}
            />

            <span>Khó</span>
            <InputNumber
            value={hard}
            onChange={(v) => setHard(v || 0)}
            />

            <Button
            type="primary"
            onClick={generateExam}
            >
            Tạo đề
            </Button>

        </Space>

        <Table
            style={{ marginTop: 20 }}
            dataSource={exam}
            columns={columns}
            pagination={false}
        />

        </div>
    );
};

export default ExamManager;
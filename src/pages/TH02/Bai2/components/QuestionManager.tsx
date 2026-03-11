import { useState } from 'react';
import { Table, Input, Button, Select, Space } from 'antd';

const { Option } = Select;

const QuestionManager = () => {

    const [questions, setQuestions] = useState<any[]>([]);

    const [content, setContent] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const addQuestion = () => {

        const newQuestion = {
        key: questions.length + 1,
        content,
        difficulty
        };

        setQuestions([...questions, newQuestion]);

        setContent('');
        setDifficulty('');
    };

    const columns = [
        { title: 'Nội dung', dataIndex: 'content' },
        { title: 'Độ khó', dataIndex: 'difficulty' }
    ];

    return (

        <div>

        <Space>

            <Input
            placeholder="Nội dung câu hỏi"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />

            <Select
            placeholder="Độ khó"
            style={{ width: 150 }}
            value={difficulty}
            onChange={(value) => setDifficulty(value)}
            >
            <Option value="Dễ">Dễ</Option>
            <Option value="Trung bình">Trung bình</Option>
            <Option value="Khó">Khó</Option>
            <Option value="Rất khó">Rất khó</Option>
            </Select>

            <Button
            type="primary"
            onClick={addQuestion}
            >
            Thêm
            </Button>

        </Space>

        <Table
            style={{ marginTop: 20 }}
            dataSource={questions}
            columns={columns}
            pagination={false}
        />

        </div>
    );
};

export default QuestionManager;
import { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';

const KnowledgeManager = () => {

    const [list, setList] = useState<any[]>([]);
    const [name, setName] = useState('');

    const addKnowledge = () => {

        const newItem = {
        key: list.length + 1,
        name
        };

        setList([...list, newItem]);
        setName('');
    };

    const columns = [
        {
        title: 'Tên khối kiến thức',
        dataIndex: 'name'
        }
    ];

    return (

        <div>

        <Space>

            <Input
            placeholder="Tên khối kiến thức"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <Button
            type="primary"
            onClick={addKnowledge}
            >
            Thêm
            </Button>

        </Space>

        <Table
            style={{ marginTop: 20 }}
            dataSource={list}
            columns={columns}
            pagination={false}
        />

        </div>
    );
};

export default KnowledgeManager;
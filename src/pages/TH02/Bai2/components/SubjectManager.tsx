import { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';

const SubjectManager = () => {

    const [subjects, setSubjects] = useState<any[]>([]);

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [credit, setCredit] = useState('');

    const addSubject = () => {

        const newSubject = {
        key: subjects.length + 1,
        code,
        name,
        credit
        };

        setSubjects([...subjects, newSubject]);

        setCode('');
        setName('');
        setCredit('');
    };

    const columns = [
        { title: 'Mã môn', dataIndex: 'code' },
        { title: 'Tên môn', dataIndex: 'name' },
        { title: 'Tín chỉ', dataIndex: 'credit' }
    ];

    return (

        <div>

        <Space>

            <Input
            placeholder="Mã môn"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />

            <Input
            placeholder="Tên môn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <Input
            placeholder="Số tín chỉ"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            />

            <Button
            type="primary"
            onClick={addSubject}
            >
            Thêm
            </Button>

        </Space>

        <Table
            style={{ marginTop: 20 }}
            dataSource={subjects}
            columns={columns}
            pagination={false}
        />

        </div>
    );
};

export default SubjectManager;
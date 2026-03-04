import React, { useState, useEffect } from 'react';
import { Input, Button, List } from 'antd';
import { Subject } from '../model';
import { loadData, saveData } from '../utils';

const SubjectManager: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        setSubjects(loadData('subjects'));
    }, []);

    const addSubject = () => {
        if (!name) return;

        const newSubject: Subject = {
        id: Date.now(),
        name,
        };

        const updated = [...subjects, newSubject];
        setSubjects(updated);
        saveData('subjects', updated);
        setName('');
    };

    const deleteSubject = (id: number) => {
        const updated = subjects.filter(s => s.id !== id);
        setSubjects(updated);
        saveData('subjects', updated);
    };

    return (
        <>
        <Input
            placeholder="Nhập tên môn học"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: 300, marginRight: 10 }}
        />
        <Button type="primary" onClick={addSubject}>
            Thêm
        </Button>

        <List
            style={{ marginTop: 20 }}
            bordered
            dataSource={subjects}
            renderItem={item => (
            <List.Item
                actions={[
                <Button danger onClick={() => deleteSubject(item.id)}>
                    Xóa
                </Button>,
                ]}
            >
                {item.name}
            </List.Item>
            )}
        />
        </>
    );
};

export default SubjectManager;
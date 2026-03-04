import React, { useState, useEffect } from 'react';
import { Select, Input, Button } from 'antd';
import { Subject } from '../model';
import { loadData, saveData } from '../utils';

const GoalManager: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [goals, setGoals] = useState<Record<string, number>>({});
    const [subjectId, setSubjectId] = useState<string | number>('all');
    const [hours, setHours] = useState<number>(0);

    useEffect(() => {
        setSubjects(loadData('subjects'));
        setGoals(loadData('goals') || {});
    }, []);

    const setGoal = () => {
        if (hours <= 0) {
        alert('Số giờ mục tiêu phải lớn hơn 0');
        return;
        }

        const updated = { ...goals, [subjectId]: hours };
        setGoals(updated);
        saveData('goals', updated);
    };

    const calculateTotalHours = () => {
        const studies = loadData('studies') || [];
        const now = new Date();
        let total = 0;

        studies.forEach((s: any) => {
        const date = new Date(s.time);

        const sameMonth =
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        const correctSubject =
            subjectId === 'all' || s.subjectId === subjectId;

        if (sameMonth && correctSubject) {
            total += Number(s.duration);
        }
        });

        return total;
    };

    const total = calculateTotalHours();
    const goalValue = goals[subjectId];

    return (
        <>
        <Select
            value={subjectId}
            style={{ width: 200, marginRight: 10 }}
            onChange={value => setSubjectId(value)}
            options={[
            { label: 'Tất cả môn', value: 'all' },
            ...subjects.map(s => ({
                label: s.name,
                value: s.id,
            })),
            ]}
        />

        <Input
            type="number"
            placeholder="Số giờ mục tiêu"
            style={{ width: 150, marginRight: 10 }}
            value={hours}
            onChange={e => setHours(Number(e.target.value))}
        />

        <Button type="primary" onClick={setGoal}>
            Đặt mục tiêu
        </Button>

        <div style={{ marginTop: 15 }}>
            {goalValue !== undefined && (
            <>
                <p>
                Đã học: <b>{total}</b> / {goalValue} giờ
                </p>

                <p>
                {total >= goalValue
                    ? 'Đã đạt mục tiêu'
                    : 'Chưa đạt mục tiêu'}
                </p>
            </>
            )}
        </div>
        </>
    );
};

export default GoalManager;
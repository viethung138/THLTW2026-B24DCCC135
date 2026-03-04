import React, { useState, useEffect } from 'react';
import { Input, Button, Select, List, DatePicker } from 'antd';
import moment from 'moment';
import { Study, Subject } from '../model';
import { loadData, saveData } from '../utils';

const { TextArea } = Input;

const StudyManager: React.FC = () => {

    const [studies, setStudies] = useState<Study[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [form, setForm] = useState<any>({});
    const [editingId, setEditingId] = useState<number | null>(null); 


    useEffect(() => {
        setStudies(loadData('studies') || []);
        setSubjects(loadData('subjects') || []);
    }, []);

    const handleSubmit = () => {

        if (!form.subjectId || !form.time || !form.duration) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (form.duration <= 0) {
            alert('Thời lượng phải lớn hơn 0');
            return;
        }

        if (editingId !== null) {

            const updated = studies.map(s =>
                s.id === editingId
                    ? { ...s, ...form }
                    : s
            );

            setStudies(updated);
            saveData('studies', updated);
            setEditingId(null);

        } else {
            const newStudy: Study = {
                id: Date.now(),
                subjectId: form.subjectId,
                time: form.time,
                duration: form.duration,
                content: form.content,
                note: form.note || '',
            };

            const updated = [...studies, newStudy];
            setStudies(updated);
            saveData('studies', updated);
        }

        setForm({});
    };

    const deleteStudy = (id: number) => {
        const updated = studies.filter(s => s.id !== id);
        setStudies(updated);
        saveData('studies', updated);
    };

    const editStudy = (study: Study) => {
        setForm(study);  
        setEditingId(study.id); 
    };

    return (
        <>

            <Select
                placeholder="Chọn môn"
                value={form.subjectId}
                style={{ width: 200, marginRight: 10 }}
                onChange={value => setForm({ ...form, subjectId: value })}
                options={subjects.map(s => ({
                    label: s.name,
                    value: s.id,
                }))}
            />

           <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                value={form.time ? moment(form.time, "YYYY-MM-DD HH:mm") : null}
                style={{ width: 220, marginRight: 10 }}
                onChange={(value) =>
                    setForm({
                        ...form,
                        time: value ? value.format("YYYY-MM-DD HH:mm") : "",
                    })
                }
            />

            <Input
                placeholder="Số giờ"
                type="number"
                value={form.duration}
                style={{ width: 120, marginRight: 10 }}
                onChange={e =>
                    setForm({ ...form, duration: Number(e.target.value) })
                }
            />

            <br /><br />

            <TextArea
                rows={2}
                placeholder="Nội dung đã học"
                value={form.content}
                style={{ width: 400, marginBottom: 10 }}
                onChange={e =>
                    setForm({ ...form, content: e.target.value })
                }
            />

            <TextArea
                rows={2}
                placeholder="Ghi chú"
                value={form.note}
                style={{ width: 400, marginBottom: 10 }}
                onChange={e =>
                    setForm({ ...form, note: e.target.value })
                }
            />

            <br />

            <Button type="primary" onClick={handleSubmit}>
                {editingId !== null ? "Cập nhật" : "Thêm lịch học"}
            </Button>

            {editingId !== null && (
                <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                        setForm({});
                        setEditingId(null);
                    }}
                >
                    Hủy sửa
                </Button>
            )}

            <List
                style={{ marginTop: 20 }}
                bordered
                dataSource={studies}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button onClick={() => editStudy(item)}>
                                Sửa
                            </Button>,
                            <Button danger onClick={() => deleteStudy(item.id)}>
                                Xóa
                            </Button>,
                        ]}
                    >
                        <div>
                            <b>
                                {subjects.find(s => s.id === item.subjectId)?.name}
                            </b>
                            <br />
                            Thời gian: {item.time}
                            <br />
                            Thời lượng: {item.duration} giờ
                            <br />
                            Nội dung: {item.content}
                            <br />
                            Ghi chú: {item.note}
                        </div>
                    </List.Item>
                )}
            />

        </>
    );
};

export default StudyManager;
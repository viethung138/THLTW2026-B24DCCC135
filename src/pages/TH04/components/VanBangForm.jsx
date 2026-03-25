// components/VanBangForm.jsx

import React, { useState } from 'react';
import { addVB } from '../services/vanBangService';
import { getFields } from '../services/fieldService';
import { getAllQD } from '../services/quyetDinhService';

export default function VanBangForm() {

    const fields = getFields();
    const qdList = getAllQD();

    const [form, setForm] = useState({
        extraFields: {}
    });

    const submit = () => {
        addVB(form);
        alert("OK");
    };

    return (
        <div>
            <h2>Văn bằng</h2>

            <input placeholder="Số hiệu"
                onChange={e => setForm({...form, soHieu: e.target.value})}/>

            <input placeholder="MSV"
                onChange={e => setForm({...form, msv: e.target.value})}/>

            <input placeholder="Họ tên"
                onChange={e => setForm({...form, hoTen: e.target.value})}/>

            <input type="date"
                onChange={e => setForm({...form, ngaySinh: e.target.value})}/>

            {/* chọn quyết định */}
            <select onChange={e => setForm({...form, qdId: Number(e.target.value)})}>
                <option>Chọn QĐ</option>
                {qdList.map(q => (
                    <option key={q.id} value={q.id}>{q.soQD}</option>
                ))}
            </select>

            {/* field động */}
            {fields.map(f => (
                <input
                    key={f.id}
                    placeholder={f.name}
                    type={
                        f.type === 'date' ? 'date' :
                        f.type === 'number' ? 'number' : 'text'
                    }
                    onChange={e =>
                        setForm({
                            ...form,
                            extraFields: {
                                ...form.extraFields,
                                [f.name]: e.target.value
                            }
                        })
                    }
                />
            ))}

            <button onClick={submit}>Lưu</button>
        </div>
    );
}
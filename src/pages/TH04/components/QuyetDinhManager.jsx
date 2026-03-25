// components/QuyetDinhManager.jsx

import React, { useState } from 'react';
import { addQD, getAllQD } from '../services/quyetDinhService';
import { getAllSo } from '../services/soService';

export default function QuyetDinhManager() {

    const soList = getAllSo();

    const [form, setForm] = useState({});
    const [list, setList] = useState(getAllQD());

    const add = () => {
        addQD(form);
        setList(getAllQD());
    };

    return (
        <div>
            <h2>Quyết định</h2>

            <input placeholder="Số QĐ"
                onChange={e => setForm({...form, soQD: e.target.value})}/>

            <input type="date"
                onChange={e => setForm({...form, ngayBanHanh: e.target.value})}/>

            <input placeholder="Trích yếu"
                onChange={e => setForm({...form, trichYeu: e.target.value})}/>

            {/* chọn sổ */}
            <select onChange={e => setForm({...form, soId: Number(e.target.value)})}>
                <option>Chọn sổ</option>
                {soList.map(s => (
                    <option key={s.id} value={s.id}>{s.year}</option>
                ))}
            </select>

            <button onClick={add}>Thêm</button>

            {list.map(q => (
                <div key={q.id}>
                    {q.soQD} | Lượt tra cứu: {q.searchCount}
                </div>
            ))}
        </div>
    );
}
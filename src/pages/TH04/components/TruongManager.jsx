// pages/TruongManager.jsx

import React, { useState } from 'react';
import { addField, getFields } from '../services/fieldService';

export default function TruongManager() {

    const [form, setForm] = useState({});
    const [list, setList] = useState(getFields());

    const add = () => {
        addField(form);
        setList(getFields());
    };

    return (
        <div>
            <h2>Trường động</h2>

            <input placeholder="Tên"
                onChange={e => setForm({...form, name: e.target.value})}/>

            <select onChange={e => setForm({...form, type: e.target.value})}>
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
            </select>

            <button onClick={add}>Thêm</button>

            {list.map(f => (
                <div key={f.id}>{f.name} - {f.type}</div>
            ))}
        </div>
    );
}
// pages/SoManager.jsx

import React, { useState } from 'react';
import { addSo, getAllSo } from '../services/soService';

export default function SoManager() {

    const [year, setYear] = useState("");
    const [list, setList] = useState(getAllSo());

    const add = () => {
        addSo(year);
        setList(getAllSo());
    };

    return (
        <div>
            <h2>Sổ</h2>

            <input onChange={e => setYear(e.target.value)} placeholder="Năm"/>
            <button onClick={add}>Thêm</button>

            {list.map(s => (
                <div key={s.id}>
                    {s.year} - {s.currentNumber}
                </div>
            ))}
        </div>
    );
}
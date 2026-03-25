// components/Search.jsx

import React, { useState } from 'react';
import { searchVB } from '../services/searchService';

export default function Search() {

    const [params, setParams] = useState({});
    const [list, setList] = useState([]);

    const search = () => {
        setList(searchVB(params));
    };

    return (
        <div>
            <h2>Tra cứu</h2>

            <input placeholder="Số hiệu"
                onChange={e => setParams({...params, soHieu: e.target.value})}/>

            <input placeholder="Số vào sổ"
                onChange={e => setParams({...params, soVaoSo: e.target.value})}/>

            <input placeholder="MSV"
                onChange={e => setParams({...params, msv: e.target.value})}/>

            <input placeholder="Họ tên"
                onChange={e => setParams({...params, hoTen: e.target.value})}/>

            <input type="date"
                onChange={e => setParams({...params, ngaySinh: e.target.value})}/>

            <button onClick={search}>Tìm</button>

            {list.map(v => (
                <div key={v.id}>
                    {v.hoTen} - {v.soHieu} - Sổ: {v.soVaoSo}
                </div>
            ))}
        </div>
    );
}
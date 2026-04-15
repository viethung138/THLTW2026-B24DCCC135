import { useEffect, useState } from "react";
import { YearBook } from "../types";
import { load, save } from "../utils/storage";

export default function YearBookPage() {
const [data, setData] = useState<YearBook[]>([]);
const [year, setYear] = useState("");
const [editId, setEditId] = useState<string | null>(null);
const [editYear, setEditYear] = useState("");

useEffect(() => {
    setData(load("yearbooks"));
}, []);

const add = () => {
    if (!year) return alert("Nhập năm");
    
    const newItem: YearBook = {
    id: Date.now().toString(),
    year: Number(year),
    currentNumber: 0,
    };

    const newData = [...data, newItem];
    setData(newData);
    save("yearbooks", newData);
    setYear("");
};

const edit = (item: YearBook) => {
    setEditId(item.id);
    setEditYear(String(item.year));
};

const saveEdit = () => {
    const newData = data.map(i => i.id === editId ? {...i, year: Number(editYear)} : i);
    setData(newData);
    save("yearbooks", newData);
    setEditId(null);
    setEditYear("");
};

const delete_ = (id: string) => {
    if (window.confirm("Chắc chắn xóa?")) {
    const newData = data.filter(i => i.id !== id);
    setData(newData);
    save("yearbooks", newData);
    }
};

return (
    <div className="th04-section">
        <h2>Quản lý sổ văn bằng</h2>
        
        <div className="th04-form">
            <input 
                type="number"
                placeholder="Năm" 
                value={year} 
                onChange={e => setYear(e.target.value)} 
            />
            <button onClick={add}>Thêm sổ mới</button>
        </div>

        <table className="th04-table">
            <thead>
                <tr>
                    <th>Năm</th>
                    <th>Số vào sổ hiện tại</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>
                            {editId === item.id ? (
                                <input 
                                    type="number"
                                    value={editYear} 
                                    onChange={e => setEditYear(e.target.value)}
                                />
                            ) : (
                                item.year
                            )}
                        </td>
                        <td>{item.currentNumber}</td>
                        <td>
                            {editId === item.id ? (
                                <>
                                    <button className="btn-save" onClick={saveEdit}>Lưu</button>
                                    <button className="btn-cancel" onClick={() => setEditId(null)}>Hủy</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn-edit" onClick={() => edit(item)}>Sửa</button>
                                    <button className="btn-delete" onClick={() => delete_(item.id)}>Xóa</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}
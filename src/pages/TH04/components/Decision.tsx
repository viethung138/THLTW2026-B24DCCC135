import { useEffect, useState } from "react";
import { Decision, YearBook } from "../types";
import { load, save } from "../utils/storage";

export default function DecisionPage() {
    const [data, setData] = useState<Decision[]>([]);
    const [books, setBooks] = useState<YearBook[]>([]);
    const [form, setForm] = useState<any>({});
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
    setData(load("decisions"));
    setBooks(load("yearbooks"));
    }, []);

    const add = () => {
        if (!form.soQuyetDinh || !form.ngayBanHanh || !form.yearBookId) {
            return alert("Điền đầy đủ thông tin");
        }
        
        const newItem: Decision = {
            ...form,
            id: Date.now().toString(),
            searchCount: 0,
        };

        const newData = [...data, newItem];
        setData(newData);
        save("decisions", newData);
        setForm({});
    };

    const edit = (item: Decision) => {
        setEditId(item.id);
        setForm(item);
    };

    const saveEdit = () => {
        const newData = data.map(i => i.id === editId ? form : i);
        setData(newData);
        save("decisions", newData);
        setEditId(null);
        setForm({});
    };

    const delete_ = (id: string) => {
        if (window.confirm("Chắc chắn xóa?")) {
            const newData = data.filter(i => i.id !== id);
            setData(newData);
            save("decisions", newData);
        }
    };

    const getYearBookYear = (id: string) => {
        return books.find(b => b.id === id)?.year || "";
    };

    return (
        <div className="th04-section">
            <h2>Quyết định tốt nghiệp</h2>
            
            {editId ? (
                <div className="th04-form">
                    <input 
                        placeholder="Số QĐ" 
                        value={form.soQuyetDinh || ""} 
                        onChange={e => setForm({...form, soQuyetDinh: e.target.value})}
                    />
                    <input 
                        type="date" 
                        value={form.ngayBanHanh || ""} 
                        onChange={e => setForm({...form, ngayBanHanh: e.target.value})}
                    />
                    <input 
                        placeholder="Trích yếu" 
                        value={form.trichYeu || ""} 
                        onChange={e => setForm({...form, trichYeu: e.target.value})}
                    />
                    <select value={form.yearBookId || ""} onChange={e => setForm({...form, yearBookId: e.target.value})}>
                        <option>Chọn sổ</option>
                        {books.map(b => (
                            <option key={b.id} value={b.id}>{b.year}</option>
                        ))}
                    </select>
                    <button className="btn-save" onClick={saveEdit}>Lưu</button>
                    <button className="btn-cancel" onClick={() => {setEditId(null); setForm({});}}>Hủy</button>
                </div>
            ) : (
                <div className="th04-form">
                    <input 
                        placeholder="Số QĐ" 
                        value={form.soQuyetDinh || ""} 
                        onChange={e => setForm({...form, soQuyetDinh: e.target.value})}
                    />
                    <input 
                        type="date" 
                        value={form.ngayBanHanh || ""} 
                        onChange={e => setForm({...form, ngayBanHanh: e.target.value})}
                    />
                    <input 
                        placeholder="Trích yếu" 
                        value={form.trichYeu || ""} 
                        onChange={e => setForm({...form, trichYeu: e.target.value})}
                    />
                    <select value={form.yearBookId || ""} onChange={e => setForm({...form, yearBookId: e.target.value})}>
                        <option>Chọn sổ</option>
                        {books.map(b => (
                            <option key={b.id} value={b.id}>{b.year}</option>
                        ))}
                    </select>
                    <button onClick={add}>Thêm quyết định</button>
                </div>
            )}

            <table className="th04-table">
                <thead>
                    <tr>
                        <th>Số QĐ</th>
                        <th>Ngày ban hành</th>
                        <th>Trích yếu</th>
                        <th>Sổ năm</th>
                        <th>Lượt tra cứu</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.soQuyetDinh}</td>
                            <td>{item.ngayBanHanh}</td>
                            <td>{item.trichYeu}</td>
                            <td>{getYearBookYear(item.yearBookId)}</td>
                            <td>{item.searchCount}</td>
                            <td>
                                <button className="btn-edit" onClick={() => edit(item)}>Sửa</button>
                                <button className="btn-delete" onClick={() => delete_(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
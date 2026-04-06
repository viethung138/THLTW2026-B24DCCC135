import { useEffect, useState } from "react";
import { Diploma, Decision, FieldConfig, YearBook } from "../types";
import { load, save } from "../utils/storage";

export default function DiplomaPage() {
const [data, setData] = useState<Diploma[]>([]);
const [decisions, setDecisions] = useState<Decision[]>([]);
const [fields, setFields] = useState<FieldConfig[]>([]);
const [books, setBooks] = useState<YearBook[]>([]);
const [form, setForm] = useState<any>({});
const [extra, setExtra] = useState<any>({});

useEffect(() => {
    setData(load("diplomas"));
    setDecisions(load("decisions"));
    setFields(load("fields"));
    setBooks(load("yearbooks"));
}, []);

const add = () => {
    if (!form.soHieu || !form.msv || !form.hoTen || !form.ngaySinh || !form.decisionId) {
        return alert("Điền đầy đủ thông tin bắt buộc");
    }
    
    const decision = decisions.find(d => d.id === form.decisionId);
    const book = books.find(b => b.id === decision?.yearBookId);

    if (!book) return alert("Không tìm thấy sổ");

    book.currentNumber += 1;

    const newItem: Diploma = {
    id: Date.now().toString(),
    soVaoSo: book.currentNumber,
    ...form,
    extraData: extra,
    };

    const newData = [...data, newItem];

    setData(newData);
    save("diplomas", newData);
    save("yearbooks", books);
    setForm({});
    setExtra({});
};

const delete_ = (id: string) => {
    if (window.confirm("Chắc chắn xóa?")) {
        const newData = data.filter(i => i.id !== id);
        setData(newData);
        save("diplomas", newData);
    }
};

const getDecisionInfo = (id: string) => {
    return decisions.find(d => d.id === id)?.soQuyetDinh || "";
};

return (
    <div className="th04-section">
        <h2>Quản lý văn bằng</h2>

        <div className="th04-form">
            <input 
                placeholder="Số hiệu" 
                value={form.soHieu || ""} 
                onChange={e => setForm({...form, soHieu: e.target.value})}
            />
            <input 
                placeholder="MSV" 
                value={form.msv || ""} 
                onChange={e => setForm({...form, msv: e.target.value})}
            />
            <input 
                placeholder="Họ tên" 
                value={form.hoTen || ""} 
                onChange={e => setForm({...form, hoTen: e.target.value})}
            />
            <input 
                type="date" 
                value={form.ngaySinh || ""} 
                onChange={e => setForm({...form, ngaySinh: e.target.value})}
            />
            <select value={form.decisionId || ""} onChange={e => setForm({...form, decisionId: e.target.value})}>
                <option>Chọn quyết định</option>
                {decisions.map(d => (
                    <option key={d.id} value={d.id}>{d.soQuyetDinh}</option>
                ))}
            </select>
        </div>

        {fields.length > 0 && (
            <div className="th04-extra-fields">
                <h3>Thông tin thêm</h3>
                {fields.map(f => (
                    <div key={f.id} className="field-group">
                        <label>{f.name}</label>
                        {f.type === "string" && (
                            <input 
                                onChange={e => setExtra({...extra, [f.id]: e.target.value})}
                                placeholder={f.name}
                            />
                        )}
                        {f.type === "number" && (
                            <input 
                                type="number" 
                                onChange={e => setExtra({...extra, [f.id]: +e.target.value})}
                                placeholder={f.name}
                            />
                        )}
                        {f.type === "date" && (
                            <input 
                                type="date" 
                                onChange={e => setExtra({...extra, [f.id]: e.target.value})}
                            />
                        )}
                    </div>
                ))}
            </div>
        )}

        <button className="btn-primary" onClick={add}>Thêm văn bằng</button>

        <table className="th04-table">
            <thead>
                <tr>
                    <th>Số vào sổ</th>
                    <th>Số hiệu</th>
                    <th>MSV</th>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Quyết định</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.soVaoSo}</td>
                        <td>{item.soHieu}</td>
                        <td>{item.msv}</td>
                        <td>{item.hoTen}</td>
                        <td>{item.ngaySinh}</td>
                        <td>{getDecisionInfo(item.decisionId)}</td>
                        <td>
                            <button className="btn-delete" onClick={() => delete_(item.id)}>Xóa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}
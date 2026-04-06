import { useState } from "react";
import { FieldConfig, FieldType } from "../types";
import { load, save } from "../utils/storage";

export default function FieldConfigPage() {
    const [fields, setFields] = useState<FieldConfig[]>(load("fields") || []);

    const [name, setName] = useState("");
    const [label, setLabel] = useState("");
    const [type, setType] = useState<FieldType>("string");

    const addField = () => {
        if (!name || !label) {
            alert("Nhập đầy đủ name và label");
            return;
        }

        const newField: FieldConfig = {
            id: Date.now().toString(),
            name,
            label,
            type
        };

        const updated = [...fields, newField];
        setFields(updated);
        save("fields", updated);

        setName("");
        setLabel("");
        setType("string");
    };

    const removeField = (id: string) => {
        const updated = fields.filter(f => f.id !== id);
        setFields(updated);
        save("fields", updated);
    };

    return (
        <div className="th04-section">
            <h2>Cấu hình trường dữ liệu</h2>

            <div className="form">
                <input
                    placeholder="Tên field (vd: queQuan)"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    placeholder="Nhãn hiển thị (vd: Quê quán)"
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                />

                <select
                    value={type}
                    onChange={e => setType(e.target.value as FieldType)}
                >
                    <option value="string">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                </select>

                <button onClick={addField}>Thêm</button>
            </div>

            <table className="th04-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Label</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {fields.map(f => (
                        <tr key={f.id}>
                            <td>{f.name}</td>
                            <td>{f.label}</td>
                            <td>{f.type}</td>
                            <td>
                                <button onClick={() => removeField(f.id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
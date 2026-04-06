// SearchPage.tsx

import { useEffect, useState } from "react";
import { Diploma, Decision, FieldConfig } from "../types";
import { load, save } from "../utils/storage";

export default function SearchPage() {
    // ================= STATE =================
    const [fullData, setFullData] = useState<Diploma[]>([]);
    const [result, setResult] = useState<Diploma[]>([]);
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const [fields, setFields] = useState<FieldConfig[]>([]);
    const [filters, setFilters] = useState<any>({});
    const [searchCount, setSearchCount] = useState(0);

    // ================= LOAD DATA =================
    useEffect(() => {
        // load dữ liệu từ localStorage
        setFullData(load("diplomas"));
        setDecisions(load("decisions"));
        setFields(load("fields")); // dùng fields để render form
    }, []);

    // ================= SEARCH =================
    const search = () => {
        // đếm số field đã nhập
        const filled = Object.values(filters).filter(v => v).length;

        if (filled < 2) {
            alert("Điền ít nhất 2 trường tìm kiếm");
            return;
        }

        // lọc dữ liệu động theo tất cả field
        const filtered = fullData.filter(d =>
            Object.keys(filters).every(key => {
                const value = filters[key];
                if (!value) return true;

                const fieldValue = (d as any)[key];

                return fieldValue
                    ?.toString()
                    .toLowerCase()
                    .includes(value.toLowerCase());
            })
        );

        setResult(filtered);
        setSearchCount(filtered.length);

        // cập nhật số lượt tra cứu theo quyết định
        if (filtered.length > 0) {
            const decisionIds = new Set(filtered.map(d => d.decisionId));

            const updatedDecisions = decisions.map(d =>
                decisionIds.has(d.id)
                    ? { ...d, searchCount: d.searchCount + 1 }
                    : d
            );

            setDecisions(updatedDecisions);
            save("decisions", updatedDecisions);
        }
    };

    // ================= HELPER =================
    const getDecisionInfo = (id: string) => {
        return decisions.find(d => d.id === id);
    };

    // ================= UI =================
    return (
        <div className="th04-section">
            <h2>Tra cứu văn bằng</h2>

            {/* ===== FORM DYNAMIC ===== */}
            <div className="th04-search-form">
                {fields.map(f => (
                    <div className="search-field" key={f.name}>
                        <label>{f.label}</label>

                        <input
                            type={f.type || "text"}
                            placeholder={`Nhập ${f.label}`}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    [f.name]: e.target.value
                                })
                            }
                        />
                    </div>
                ))}

                <button className="btn-primary" onClick={search}>
                    Tra cứu
                </button>
            </div>

            {/* ===== SUMMARY ===== */}
            {searchCount > 0 && (
                <div className="search-summary">
                    Tìm thấy <strong>{searchCount}</strong> kết quả
                </div>
            )}

            {/* ===== TABLE RESULT ===== */}
            {result.length > 0 && (
                <table className="th04-table">
                    <thead>
                        <tr>
                            <th>Số vào sổ</th>
                            <th>Số hiệu</th>
                            <th>MSV</th>
                            <th>Họ tên</th>
                            <th>Ngày sinh</th>
                            <th>Quyết định</th>
                            <th>Trích yếu</th>
                        </tr>
                    </thead>

                    <tbody>
                        {result.map(item => {
                            const decision = getDecisionInfo(item.decisionId);

                            return (
                                <tr key={item.id}>
                                    <td>{item.soVaoSo}</td>
                                    <td>{item.soHieu}</td>
                                    <td>{item.msv}</td>
                                    <td>{item.hoTen}</td>
                                    <td>{item.ngaySinh}</td>
                                    <td>{decision?.soQuyetDinh}</td>
                                    <td>{decision?.trichYeu}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {/* ===== NO RESULT ===== */}
            {result.length === 0 && searchCount > 0 && (
                <div className="no-result">
                    Không tìm thấy kết quả phù hợp
                </div>
            )}
        </div>
    );
}
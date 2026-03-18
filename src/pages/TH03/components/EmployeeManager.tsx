import React, { useState } from "react";
import { Table, Input, Button, Space, Select } from "antd";
import { Employee } from "../types";

interface Props {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const EmployeeManager: React.FC<Props> = ({ employees, setEmployees }) => {

    const [name, setName] = useState("");
    const [max, setMax] = useState(5);
    const [day, setDay] = useState<number>(1);

    const addEmployee = () => {
        const newEmp: Employee = {
            id: Date.now().toString(),
            name,
            maxCustomersPerDay: max,
            workingHours: [{ day, start: "09:00", end: "17:00" }]
        };
        setEmployees([...employees, newEmp]);
    };

    const updateName = (id: string, name: string) => {
        setEmployees(employees.map(e => e.id === id ? { ...e, name } : e));
    };

    return (
        <>
            <Space>
                <Input onChange={(e) => setName(e.target.value)} placeholder="Tên"/>
                <Input type="number" onChange={(e) => setMax(Number(e.target.value))}/>
                <Select onChange={setDay} placeholder="Thứ">
                    {[0,1,2,3,4,5,6].map(d => (
                        <Select.Option key={d} value={d}>Thứ {d}</Select.Option>
                    ))}
                </Select>
                <Button onClick={addEmployee}>Thêm</Button>
            </Space>

            <Table
                rowKey="id"
                columns={[
                    {
                        title: "Tên",
                        render: (_: any, r: Employee) => (
                            <Input value={r.name} onChange={(e) => updateName(r.id, e.target.value)}/>
                        )
                    },
                    { title: "Max", dataIndex: "maxCustomersPerDay" },
                    {
                        title: "Lịch",
                        render: (_: any, r: Employee) =>
                            r.workingHours.map(w => `Thứ ${w.day} ${w.start}-${w.end}`).join(", ")
                    }
                ]}
                dataSource={employees}
            />
        </>
    );
};

export default EmployeeManager;
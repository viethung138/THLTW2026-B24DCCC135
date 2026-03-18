import React, { useState } from "react";
import { Table, Button, Select, DatePicker, TimePicker, message } from "antd";
import moment, { Moment } from "moment";
import { Appointment, Employee, Service, Status } from "../types";

interface Props {
    employees: Employee[];
    services: Service[];
    appointments: Appointment[];
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

const AppointmentManager: React.FC<Props> = ({ employees, services, appointments, setAppointments }) => {

    const [employeeId, setEmployeeId] = useState<string | undefined>(undefined);
    const [serviceId, setServiceId] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Moment | null>(null);
    const [time, setTime] = useState<Moment | null>(null);

    const isOverlap = (s1: string, e1: string, s2: string, e2: string): boolean =>
        s1 < e2 && s2 < e1;

    const isWorking = (emp: Employee, d: string, start: string, end: string): boolean => {
        const day = new Date(d).getDay();
        const w = emp.workingHours.find(x => x.day === day);
        if (!w) return false;
        return start >= w.start && end <= w.end;
    };

    const checkMax = (emp: Employee, d: string): boolean =>
        appointments.filter(a => a.employeeId === emp.id && a.date === d).length < emp.maxCustomersPerDay;

    const updateStatus = (id: string, status: Status): void => {
        setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    };

    const add = (): void => {

        if (!employeeId || !serviceId || !date || !time) {
            message.warning("Thiếu thông tin");
            return;
        }

        const s = services.find(x => x.id === serviceId);
        const e = employees.find(x => x.id === employeeId);

        if (!s || !e) {
            message.error("Dữ liệu không hợp lệ");
            return;
        }

        const start = time.format("HH:mm");
        const end = moment(time).add(s.duration, "minutes").format("HH:mm");
        const d = date.format("YYYY-MM-DD");

        if (!isWorking(e, d, start, end)) {
            message.error("Ngoài giờ làm");
            return;
        }

        if (!checkMax(e, d)) {
            message.error("Đã đủ khách");
            return;
        }

        const conflict = appointments.some(a =>
            a.employeeId === employeeId &&
            a.date === d &&
            isOverlap(a.startTime, a.endTime, start, end)
        );

        if (conflict) {
            message.error("Trùng lịch");
            return;
        }

        setAppointments([
            ...appointments,
            {
                id: Date.now().toString(),
                employeeId,
                serviceId,
                date: d,
                startTime: start,
                endTime: end,
                status: "pending"
            }
        ]);

        message.success("Đặt lịch thành công");
    };

    return (
        <>
            <Select style={{ width: 120 }} onChange={setEmployeeId}>
                {employees.map(e => (
                    <Select.Option key={e.id} value={e.id}>{e.name}</Select.Option>
                ))}
            </Select>

            <Select style={{ width: 120 }} onChange={setServiceId}>
                {services.map(s => (
                    <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>
                ))}
            </Select>

            <DatePicker onChange={(value) => setDate(value)} />
            <TimePicker format="HH:mm" onChange={(value) => setTime(value)} />

            <Button onClick={add}>Đặt</Button>

            <Table
                rowKey="id"
                dataSource={appointments}
                columns={[
                    { title: "Ngày", dataIndex: "date" },
                    {
                        title: "Giờ",
                        render: (_: any, r: Appointment) => `${r.startTime}-${r.endTime}`
                    },
                    { title: "Trạng thái", dataIndex: "status" },
                    {
                        title: "Action",
                        render: (_: any, r: Appointment) => (
                            <>
                                <Button onClick={() => updateStatus(r.id, "confirmed")}>Xác nhận</Button>
                                <Button onClick={() => updateStatus(r.id, "done")}>Xong</Button>
                            </>
                        )
                    }
                ]}
            />
        </>
    );
};

export default AppointmentManager;
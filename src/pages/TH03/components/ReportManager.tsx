import React from "react";
import { Appointment, Service, Employee } from "../types";

interface Props {
    appointments: Appointment[];
    services: Service[];
    employees: Employee[];
}

const ReportManager: React.FC<Props> = ({ appointments, services, employees }) => {

    const byMonth = appointments.reduce((acc:any,a)=>{
        const m=a.date.slice(0,7);
        acc[m]=(acc[m]||0)+1;
        return acc;
    },{});

    const revenueEmp = appointments.reduce((acc:any,a)=>{
        const s=services.find(x=>x.id===a.serviceId);
        const e=employees.find(x=>x.id===a.employeeId);
        if(!s||!e) return acc;
        acc[e.name]=(acc[e.name]||0)+s.price;
        return acc;
    },{});

    return (
        <>
            <h3>Tháng</h3>
            {Object.entries(byMonth).map(([k,v])=><div key={k}>{k}:{v}</div>)}

            <h3>Doanh thu NV</h3>
            {Object.entries(revenueEmp).map(([k,v])=><div key={k}>{k}:{v}</div>)}
        </>
    );
};

export default ReportManager;
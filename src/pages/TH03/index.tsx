import React, { useState } from "react";
import { Tabs } from "antd";

import EmployeeManager from "./components/EmployeeManager";
import ServiceManager from "./components/ServiceManager";
import AppointmentManager from "./components/AppointmentManager";
import ReviewManager from "./components/ReviewManager";
import ReportManager from "./components/ReportManager";

import { Employee, Service, Appointment, Review } from "./types";

const { TabPane } = Tabs;

const TH03: React.FC = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);

    return (
        <Tabs defaultActiveKey="1">

        <TabPane tab="Nhân viên" key="1">
            <EmployeeManager
            employees={employees}
            setEmployees={setEmployees}
            />
        </TabPane>

        <TabPane tab="Dịch vụ" key="2">
            <ServiceManager
            services={services}
            setServices={setServices}
            />
        </TabPane>

        <TabPane tab="Lịch hẹn" key="3">
            <AppointmentManager
                employees={employees}
                services={services}
                appointments={appointments}
                setAppointments={setAppointments}
            />
        </TabPane>

        <TabPane tab="Đánh giá" key="4">
            <ReviewManager
                appointments={appointments}
                reviews={reviews}
                setReviews={setReviews}
            />
        </TabPane>

        <TabPane tab="Thống kê" key="5">
            <ReportManager
                appointments={appointments}
                services={services}
                employees={employees}
            />
        </TabPane>

        </Tabs>
    );
};

export default TH03;
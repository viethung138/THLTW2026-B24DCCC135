import React, { useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { Service } from "../types";

interface Props {
    services: Service[];
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const ServiceManager: React.FC<Props> = ({ services, setServices }) => {

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [duration, setDuration] = useState<number>(30);

    const addService = () => {
        if (!name) return;

        const newService: Service = {
            id: Date.now().toString(),
            name,
            price,
            duration
        };

        setServices([...services, newService]);
    };

    const columns = [
        { title: "Tên", dataIndex: "name" },
        { title: "Giá", dataIndex: "price" },
        { title: "Phút", dataIndex: "duration" },
        {
        title: "Xóa",
        render: (_: any, record: Service) => (
            <Button danger onClick={() => {
                setServices(services.filter(s => s.id !== record.id));
            }}>
                Xóa
            </Button>
        )
        }
    ];

    return (
        <>
            <Space>
                <Input onChange={(e) => setName(e.target.value)} placeholder="Tên dịch vụ"/>
                <Input type="number" onChange={(e) => setPrice(Number(e.target.value))} placeholder="Giá"/>
                <Input type="number" onChange={(e) => setDuration(Number(e.target.value))} placeholder="Phút"/>
                <Button onClick={addService}>Thêm</Button>
            </Space>

            <Table rowKey="id" columns={columns} dataSource={services}/>
        </>
    );
};

export default ServiceManager;
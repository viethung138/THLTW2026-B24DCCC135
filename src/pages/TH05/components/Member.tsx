import { useState, useEffect } from "react";
import { Table, Button, Select, Modal, message } from "antd";
import { Application, Club } from "../types";
import { load, save } from "../utils/storage";

const { Option } = Select;

export default function MemberPage() {
    const [apps, setApps] = useState<Application[]>(load("apps"));
    const [clubs] = useState<Club[]>(load("clubs"));
    const [selectedClubId, setSelectedClubId] = useState<string>("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [targetClubId, setTargetClubId] = useState<string>("");

    useEffect(() => save("apps", apps), [apps]);

    const members = apps.filter(a => a.status === "Approved" && (!selectedClubId || a.clubId === selectedClubId));

    const handleTransfer = () => {
        if (!targetClubId) return;
        setApps(apps.map(a =>
        selectedRowKeys.includes(a.id)
            ? { ...a, clubId: targetClubId }
            : a
        ));
        message.success(`Đã chuyển ${selectedRowKeys.length} thành viên`);
        setIsModalVisible(false);
        setSelectedRowKeys([]);
    };

    const columns = [
        {
            title: "Họ tên",
            dataIndex: "fullName",
            sorter: (a: Application, b: Application) => a.fullName.localeCompare(b.fullName)
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "SĐT",
            dataIndex: "phone"
        },
        {
            title: "Giới tính",
            dataIndex: "gender"
        },
        {
            title: "Địa chỉ",
            dataIndex: "address"
        },
        {
            title: "Sở trường",
            dataIndex: "specialty"
        },
        {
            title: "CLB",
            dataIndex: "clubId",
            render: (clubId: string) => clubs.find(c => c.id === clubId)?.name || "N/A"
        },
        {
            title: "Lý do đăng ký",
            dataIndex: "reason"
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: any[], selectedRows: Application[], info: any) => setSelectedRowKeys(selectedRowKeys as string[])
    };

    return (
        <div>
            <h2>Quản lý thành viên CLB</h2>
            <Select
                placeholder="Chọn CLB"
                style={{ width: 200, marginBottom: 16 }}
                onChange={setSelectedClubId}
                allowClear
            >
                {clubs.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
            </Select>
            {selectedRowKeys.length > 0 && (
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    Chuyển {selectedRowKeys.length} thành viên sang CLB khác
                </Button>
            )}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={members}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title={`Chuyển ${selectedRowKeys.length} thành viên`}
                visible={isModalVisible}
                onOk={handleTransfer}
                onCancel={() => setIsModalVisible(false)}
            >
                <p>Chọn CLB đích:</p>
                <Select
                style={{ width: "100%" }}
                onChange={setTargetClubId}
                placeholder="Chọn CLB"
                >
                    {clubs.filter(c => c.id !== selectedClubId).map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                </Select>
            </Modal>
        </div>
    );
}
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Popconfirm } from "antd";
import { Application, History, Club } from "../types";
import { load, save } from "../utils/storage";

const { Option } = Select;

export default function ApplicationPage() {
    const [apps, setApps] = useState<Application[]>(load("apps"));
    const [history, setHistory] = useState<History[]>(load("history"));
    const [clubs] = useState<Club[]>(load("clubs"));
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingApp, setEditingApp] = useState<Application | null>(null);
    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
    const [currentHistory, setCurrentHistory] = useState<History[]>([]);
    const [form] = Form.useForm();

    useEffect(() => save("apps", apps), [apps]);
    useEffect(() => save("history", history), [history]);

    const showModal = (app?: Application) => {
        setEditingApp(app || null);
        if (app) {
            form.setFieldsValue(app);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
        const newApp: Application = {
            id: editingApp?.id || Date.now().toString(),
            ...values
        };
        if (editingApp) {
            setApps(apps.map(a => a.id === editingApp.id ? newApp : a));
        } else {
            setApps([...apps, newApp]);
        }
        setIsModalVisible(false);
        });
    };

    const handleDelete = (id: string) => {
        setApps(apps.filter(a => a.id !== id));
    };

    const approveSelected = () => {
        setApps(apps.map(a =>
            selectedRowKeys.includes(a.id) ? { ...a, status: "Approved" } : a
        ));
        addHistory("Approved");
        setSelectedRowKeys([]);
    };

    const rejectSelected = () => {
        const reason = prompt("Lý do từ chối") || "";
        if (!reason) return;
        setApps(apps.map(a =>
            selectedRowKeys.includes(a.id)
                ? { ...a, status: "Rejected", note: reason }
                : a
        ));
        addHistory("Rejected", reason);
        setSelectedRowKeys([]);
    };

    const addHistory = (action: string, note?: string) => {
        const newH = selectedRowKeys.map(id => ({
            id: Date.now() + id,
            applicationId: id,
            action,
            time: new Date().toLocaleString(),
            note
        }));
        setHistory([...history, ...newH]);
    };

    const showHistory = (appId: string) => {
        setCurrentHistory(history.filter(h => h.applicationId === appId));
        setIsHistoryModalVisible(true);
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
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            filters: [
                { text: "Pending", value: "Pending" },
                { text: "Approved", value: "Approved" },
                { text: "Rejected", value: "Rejected" }
            ],
            onFilter: (value: any, record: Application) => record.status === value
        },
        {
            title: "Ghi chú",
            dataIndex: "note"
        },
        {
            title: "Thao tác",
        render: (record: Application) => (
            <>
            <Button onClick={() => showModal(record)}>Xem chi tiết/Chỉnh sửa</Button>
            <Popconfirm title="Xóa đơn này?" onConfirm={() => handleDelete(record.id)}>
                <Button>Xóa</Button>
            </Popconfirm>
            <Button onClick={() => showHistory(record.id)}>Xem lịch sử</Button>
            </>
        )
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: any[], selectedRows: Application[], info: any) => setSelectedRowKeys(selectedRowKeys as string[])
    };

    const historyColumns = [
        { title: "Thao tác", dataIndex: "action" },
        { title: "Thời gian", dataIndex: "time" },
        { title: "Ghi chú", dataIndex: "note" }
    ];

    return (
        <div>
            <h2>Quản lý đơn đăng ký thành viên</h2>
            <Button type="primary" onClick={() => showModal()}>Thêm mới</Button>
            {selectedRowKeys.length > 0 && (
                <>
                <Button onClick={approveSelected}>Duyệt {selectedRowKeys.length} đơn</Button>
                <Button onClick={rejectSelected}>Từ chối {selectedRowKeys.length} đơn</Button>
                </>
            )}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={apps}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title={editingApp ? "Chỉnh sửa đơn" : "Thêm mới đơn"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                <Form.Item name="fullName" label="Họ tên" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{required: true, type: "email"}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="SĐT" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="Giới tính" rules={[{required: true}]}>
                    <Select>
                    <Option value="Nam">Nam</Option>
                    <Option value="Nữ">Nữ</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="specialty" label="Sở trường" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="clubId" label="CLB" rules={[{required: true}]}>
                    <Select>
                    {clubs.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="reason" label="Lý do đăng ký" rules={[{required: true}]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái">
                    <Select>
                    <Option value="Pending">Pending</Option>
                    <Option value="Approved">Approved</Option>
                    <Option value="Rejected">Rejected</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="note" label="Ghi chú">
                    <Input.TextArea />
                </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Lịch sử thao tác"
                visible={isHistoryModalVisible}
                onCancel={() => setIsHistoryModalVisible(false)}
                footer={null}
            >
                <Table
                columns={historyColumns}
                dataSource={currentHistory}
                rowKey="id"
                pagination={false}
                />
            </Modal>
        </div>
    );
}
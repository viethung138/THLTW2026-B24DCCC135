import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Switch, Upload } from "antd";
import { Club, Application } from "../types";
import { load, save } from "../utils/storage";
import dayjs from "dayjs";

export default function ClubPage() {
    const [clubs, setClubs] = useState<Club[]>(load("clubs"));
    const [apps] = useState<Application[]>(load("apps"));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingClub, setEditingClub] = useState<Club | null>(null);
    const [isMembersModalVisible, setIsMembersModalVisible] = useState(false);
    const [currentMembers, setCurrentMembers] = useState<Application[]>([]);
    const [form] = Form.useForm();

    useEffect(() => save("clubs", clubs), [clubs]);

    const showModal = (club?: Club) => {
        setEditingClub(club || null);
        if (club) {
            form.setFieldsValue({
                ...club,
                foundedDate: dayjs(club.foundedDate)
            });
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
        const newClub: Club = {
            id: editingClub?.id || Date.now().toString(),
            ...values,
            foundedDate: values.foundedDate.format("YYYY-MM-DD"),
            avatar: values.avatar?.file?.thumbUrl || editingClub?.avatar
        };
        if (editingClub) {
            setClubs(clubs.map(c => c.id === editingClub.id ? newClub : c));
        } else {
            setClubs([...clubs, newClub]);
        }
        setIsModalVisible(false);
        });
    };

    const handleDelete = (id: string) => {
        setClubs(clubs.filter(c => c.id !== id));
    };

    const showMembers = (clubId: string) => {
        setCurrentMembers(apps.filter(a => a.clubId === clubId && a.status === "Approved"));
        setIsMembersModalVisible(true);
    };

    const columns = [
        {
            title: "Ảnh đại diện",
            dataIndex: "avatar",
            render: (avatar: string) => avatar ? <img src={avatar} alt="avatar" style={{width: 50}} /> : "N/A"
        },
        {
            title: "Tên CLB",
            dataIndex: "name",
            sorter: (a: Club, b: Club) => a.name.localeCompare(b.name)
        },
        {
            title: "Ngày thành lập",
            dataIndex: "foundedDate",
            sorter: (a: Club, b: Club) => new Date(a.foundedDate).getTime() - new Date(b.foundedDate).getTime()
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (desc: string) => <div dangerouslySetInnerHTML={{__html: desc}} />
        },
        {
            title: "Chủ nhiệm CLB",
            dataIndex: "leader"
        },
        {
            title: "Hoạt động",
            dataIndex: "isActive",
            render: (active: boolean) => active ? "Có" : "Không",
            filters: [
                { text: "Có", value: true },
                { text: "Không", value: false }
            ],
            onFilter: (value: any, record: Club) => record.isActive === value
        },
        {
            title: "Thao tác",
        render: (record: Club) => (
            <>
                <Button onClick={() => showModal(record)}>Chỉnh sửa</Button>
                <Button onClick={() => handleDelete(record.id)}>Xóa</Button>
                <Button onClick={() => showMembers(record.id)}>Xem thành viên</Button>
            </>
        )
        }
    ];

    const memberColumns = [
        { title: "Họ tên", dataIndex: "fullName" },
        { title: "Email", dataIndex: "email" },
        { title: "SĐT", dataIndex: "phone" },
        { title: "Giới tính", dataIndex: "gender" },
        { title: "Địa chỉ", dataIndex: "address" },
        { title: "Sở trường", dataIndex: "specialty" }
    ];

    return (
        <div>
            <h2>Danh sách câu lạc bộ</h2>
            <Button type="primary" onClick={() => showModal()}>Thêm mới CLB</Button>
            <Table
                columns={columns}
                dataSource={clubs}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title={editingClub ? "Chỉnh sửa CLB" : "Thêm mới CLB"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                <Form.Item name="name" label="Tên CLB" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="avatar" label="Ảnh đại diện">
                    <Upload listType="picture-card" maxCount={1}>
                    <Button>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="foundedDate" label="Ngày thành lập" rules={[{required: true}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="description" label="Mô tả" rules={[{required: true}]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="leader" label="Chủ nhiệm CLB" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="isActive" label="Hoạt động" valuePropName="checked">
                    <Switch />
                </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Danh sách thành viên"
                visible={isMembersModalVisible}
                onCancel={() => setIsMembersModalVisible(false)}
                footer={null}
                width={800}
            >
                <Table
                columns={memberColumns}
                dataSource={currentMembers}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                />
            </Modal>
        </div>
    );
}
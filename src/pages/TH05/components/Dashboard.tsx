
import { load } from "../utils/storage";
import { Application, Club } from "../types";
import { Table, Card, Statistic } from "antd";

export default function Dashboard() {
    const apps: Application[] = load("apps");
    const clubs: Club[] = load("clubs");

    const pending = apps.filter(a => a.status === "Pending").length;
    const approved = apps.filter(a => a.status === "Approved").length;
    const rejected = apps.filter(a => a.status === "Rejected").length;

    const chartData = clubs.map(club => {
        const clubApps = apps.filter(a => a.clubId === club.id);
        return {
            club: club.name,
            pending: clubApps.filter(a => a.status === "Pending").length,
            approved: clubApps.filter(a => a.status === "Approved").length,
            rejected: clubApps.filter(a => a.status === "Rejected").length
        };
    });

    const columns = [
        { title: "CLB", dataIndex: "club" },
        { title: "Pending", dataIndex: "pending" },
        { title: "Approved", dataIndex: "approved" },
        { title: "Rejected", dataIndex: "rejected" }
    ];

    return (
        <div>
            <h2>Báo cáo và thống kê</h2>
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <Card>
                    <Statistic title="Số CLB" value={clubs.length} />
                </Card>
                <Card>
                    <Statistic title="Đơn Pending" value={pending} />
                </Card>
                <Card>
                    <Statistic title="Đơn Approved" value={approved} />
                </Card>
                <Card>
                    <Statistic title="Đơn Rejected" value={rejected} />
                </Card>
            </div>
            <h3>Số đơn đăng ký theo CLB</h3>
            <Table
                columns={columns}
                dataSource={chartData}
                rowKey="club"
                pagination={false}
            />
            <div style={{ marginTop: 16 }}>
                {chartData.map(item => (
                    <div key={item.club} style={{ marginBottom: 8 }}>
                        <strong>{item.club}:</strong>
                        <div style={{ display: "flex", gap: 4 }}>
                        <div style={{ background: "yellow", width: item.pending * 20, height: 20 }}>P: {item.pending}</div>
                        <div style={{ background: "green", width: item.approved * 20, height: 20 }}>A: {item.approved}</div>
                        <div style={{ background: "red", width: item.rejected * 20, height: 20 }}>R: {item.rejected}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
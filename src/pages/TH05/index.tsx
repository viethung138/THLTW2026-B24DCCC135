import { useState } from "react";
import Club from "./components/Club";
import Application from "./components/Application";
import Member from "./components/Member";
import Dashboard from "./components/Dashboard";

export default function App() {
    const [page, setPage] = useState("club");

    return (
    <div>
        <button onClick={() => setPage("club")}>CLB</button>
        <button onClick={() => setPage("app")}>Đơn</button>
        <button onClick={() => setPage("member")}>Thành viên</button>
        <button onClick={() => setPage("dashboard")}>Thống kê</button>

        <hr />

        {page === "club" && <Club />}
        {page === "app" && <Application />}
        {page === "member" && <Member />}
        {page === "dashboard" && <Dashboard />}
    </div>
    );
}
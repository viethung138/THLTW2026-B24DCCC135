import { useState } from "react";
import "./style.less";
import YearBookPage from "./components/YearBookPage";
import DecisionPage from "./components/Decision";
import FieldConfigPage from "./components/FieldConfigPage";
import DiplomaPage from "./components/DiplomaPage";
import SearchPage from "./components/SearchPage";

export default function App() {
  const [tab, setTab] = useState("year");

return (
    <div className="th04-page">
      <h1 className="th04-title">Quản lý văn bằng</h1>

      <div className="th04-tabs">
        <button className={tab === "year" ? "active" : ""} onClick={() => setTab("year")}>Sổ</button>
        <button className={tab === "decision" ? "active" : ""} onClick={() => setTab("decision")}>Quyết định</button>
        <button className={tab === "field" ? "active" : ""} onClick={() => setTab("field")}>Biểu mẫu</button>
        <button className={tab === "diploma" ? "active" : ""} onClick={() => setTab("diploma")}>Văn bằng</button>
        <button className={tab === "search" ? "active" : ""} onClick={() => setTab("search")}>Tra cứu</button>
      </div>

      <div className="th04-content">
        {tab === "year" && <YearBookPage />}
        {tab === "decision" && <DecisionPage />}
        {tab === "field" && <FieldConfigPage />}
        {tab === "diploma" && <DiplomaPage />}
        {tab === "search" && <SearchPage />}
      </div>
    </div>
);
}
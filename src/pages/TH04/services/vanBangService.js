// services/vanBangService.js

import { getData, setData } from '../utils/storage';
import { increaseNumber } from './soService';
import { getAllQD } from './quyetDinhService';

const KEY = "vb";

export const getAllVB = () => getData(KEY);

export const addVB = (data) => {
    const list = getAllVB();
    const qdList = getAllQD();

    // tìm quyết định
    const qd = qdList.find(q => q.id == data.qdId);

    if (!qd) {
        alert("Chưa chọn quyết định");
        return;
    }

    // lấy soId từ quyết định → tăng số vào sổ
    const soVaoSo = increaseNumber(qd.soId);

    if (soVaoSo === null) {
        alert("Không tìm thấy sổ");
        return;
    }

    list.push({
        id: Date.now(),

        soVaoSo, // auto
        soHieu: data.soHieu,
        msv: data.msv,
        hoTen: data.hoTen,
        ngaySinh: data.ngaySinh,

        qdId: data.qdId,

        // field động
        extraFields: data.extraFields || {}
    });

    setData(KEY, list);
};
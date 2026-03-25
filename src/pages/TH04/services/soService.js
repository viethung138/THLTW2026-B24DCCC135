// services/soService.js

import { getData, setData } from '../utils/storage';

const KEY = "so";

export const getAllSo = () => getData(KEY);

export const addSo = (year) => {
    const list = getAllSo();

    // mỗi năm chỉ 1 sổ
    if (list.find(s => s.year == year)) {
        alert("Năm đã tồn tại");
        return;
    }

    list.push({
        id: Date.now(),
        year,
        currentNumber: 0
    });

    setData(KEY, list);
};

export const increaseNumber = (soId) => {
    const list = getAllSo();
    const so = list.find(s => s.id == soId);

    if (!so) return null;

    so.currentNumber++;
    setData(KEY, list);

    return so.currentNumber;
};
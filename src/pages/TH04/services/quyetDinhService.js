// services/quyetDinhService.js

import { getData, setData } from '../utils/storage';

const KEY = "qd";

export const getAllQD = () => getData(KEY);

export const addQD = (data) => {
    const list = getAllQD();

    list.push({
        id: Date.now(),
        ...data, // soQD, ngayBanHanh, trichYeu, soId
        searchCount: 0
    });

    setData(KEY, list);
};

export const increaseSearchCount = (qdId) => {
    const list = getAllQD();

    const qd = list.find(q => q.id == qdId);
    if (qd) qd.searchCount++;

    setData(KEY, list);
};
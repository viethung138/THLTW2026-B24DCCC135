// services/searchService.js

import { getAllVB } from './vanBangService';
import { increaseSearchCount } from './quyetDinhService';

export const searchVB = (params) => {
    const data = getAllVB();

    // kiểm tra >= 2 điều kiện
    const filled = Object.values(params).filter(v => v);
    if (filled.length < 2) {
        alert("Nhập >= 2 điều kiện");
        return [];
    }

    const result = data.filter(v =>
        (!params.soHieu || v.soHieu.includes(params.soHieu)) &&
        (!params.soVaoSo || v.soVaoSo == params.soVaoSo) &&
        (!params.msv || v.msv.includes(params.msv)) &&
        (!params.hoTen || v.hoTen.includes(params.hoTen)) &&
        (!params.ngaySinh || v.ngaySinh == params.ngaySinh)
    );

    // tăng lượt tra cứu theo quyết định
    result.forEach(r => increaseSearchCount(r.qdId));

    return result;
};
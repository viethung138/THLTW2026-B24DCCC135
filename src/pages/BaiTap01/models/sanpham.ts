import { useState } from 'react';
export interface SanPham {
	id: number;
	ten: string;
	gia: number;
	soLuong: number;
}

export default () => {
	const [danhSachSanPham, setDanhSachSanPham] = useState<SanPham[]>([
		{ id: 1, ten: 'Laptop Dell XPS 13', gia: 25000000, soLuong: 10 },
		{ id: 2, ten: 'iPhone 15 Pro Max', gia: 30000000, soLuong: 15 },
		{ id: 3, ten: 'Samsung Galaxy S24', gia: 22000000, soLuong: 20 },
		{ id: 4, ten: 'iPad Air M2', gia: 18000000, soLuong: 12 },
		{ id: 5, ten: 'MacBook Air M3', gia: 28000000, soLuong: 8 },
	]);

	const themSanPham = (sanPhamMoi: SanPham) => {
		setDanhSachSanPham((ds) => [...ds, sanPhamMoi]);
	};

	const xoaSanPham = (id: number) => {
		setDanhSachSanPham((ds) => ds.filter((sp) => sp.id !== id));
	};

	return {
		danhSachSanPham,
		themSanPham,
		xoaSanPham,
	};
};
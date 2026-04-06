export type FieldType = "string" | "number" | "date";

export interface YearBook {
id: string;
year: number;
currentNumber: number;
}

export interface Decision {
id: string;
soQuyetDinh: string;
ngayBanHanh: string;
trichYeu: string;
yearBookId: string;
searchCount: number;
}

export interface FieldConfig {
id: string;
name: string;
type: FieldType;
label: string;
}

export interface Diploma {
id: string;
soVaoSo: number;
soHieu: string;
msv: string;
hoTen: string;
ngaySinh: string;
decisionId: string;
extraData: Record<string, any>;
}
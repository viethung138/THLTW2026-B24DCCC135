export const save = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const load = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || "[]");
};
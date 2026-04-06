export const save = (key: string, data: any) => {
localStorage.setItem(key, JSON.stringify(data));
};

export const load = (key: string) => {
const data = localStorage.getItem(key);
return data ? JSON.parse(data) : [];
};
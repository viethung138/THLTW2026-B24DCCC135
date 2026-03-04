export interface Subject {
    id: number;
    name: string;
}

export interface Study {
    id: number;
    subjectId: number;
    time: string;
    duration: string;
    content: string;
    note: string;
}

export interface Goal {
    subjectId: number | 'all';
    hours: number;
}
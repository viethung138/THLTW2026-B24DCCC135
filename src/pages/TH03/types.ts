export interface WorkingDay {
    day: number; 
    start: string;
    end: string;
}

export interface Employee {
    id: string;
    name: string;
    maxCustomersPerDay: number;
    workingHours: WorkingDay[];
}

export interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
}

export type Status = "pending" | "confirmed" | "done" | "cancel";

export interface Appointment {
    id: string;
    employeeId: string;
    serviceId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: Status;
}

export interface Review {
    id: string;
    appointmentId: string;
    rating: number;
    comment: string;
    reply?: string;
}
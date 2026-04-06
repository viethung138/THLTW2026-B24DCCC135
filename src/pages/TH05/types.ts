export type Status = "Pending" | "Approved" | "Rejected";

export interface Club {
    id: string;
    name: string;
    avatar?: string;
    foundedDate: string;
    description: string; 
    leader: string;
    isActive: boolean;
}

export interface Application {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    specialty: string;
    clubId: string;
    reason: string;
    status: Status;
    note?: string;
}

export interface History {
    id: string;
    applicationId: string;
    action: string;
    time: string;
    note?: string;
}
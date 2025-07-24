export interface Task {
    id?: number;
    title?: string;
    due_date?: Date | string;
    is_completed?: boolean | string;
    error?: string;
}
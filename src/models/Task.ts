import { ColumnEnum } from ".";

export type Task = { 
    id: string;
    title: string;
    description: string;
    duration: number;
    completed: boolean;
    createdAt: Date;
    status: ColumnEnum
}
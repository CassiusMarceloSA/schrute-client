import { ColumnEnum } from ".";

export type Task = {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdAt: string;
  updatedAt?: string;
  status: ColumnEnum;
};

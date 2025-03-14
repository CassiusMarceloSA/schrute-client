import { Column, ColumnEnum } from ".";

export type Board = { 
    columns: Record<ColumnEnum, Column>;
}
